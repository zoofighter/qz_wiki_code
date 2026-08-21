import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const quartzRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const defaultVault = path.resolve(quartzRoot, "../wiki_code")
const vaultRoot = path.resolve(process.env.VAULT_PATH || defaultVault)
const contentRoot = path.join(quartzRoot, "content")
const excludedDirectories = new Set([".git", ".obsidian", ".trash", "02-Raw", "90-템플릿"])

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (entry.name.startsWith(".") || excludedDirectories.has(entry.name)) continue

    const absolutePath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(absolutePath)))
    } else {
      files.push(absolutePath)
    }
  }

  return files
}

function hasPublishFlag(markdown) {
  const frontmatter = markdown.match(/^---\s*\n([\s\S]*?)\n---(?:\s*\n|$)/)
  return frontmatter ? /^publish:\s*true\s*$/m.test(frontmatter[1]) : false
}

function noteName(filePath) {
  return path.basename(filePath, path.extname(filePath))
}

await rm(contentRoot, { recursive: true, force: true })
await mkdir(contentRoot, { recursive: true })

const vaultFiles = await collectFiles(vaultRoot)
const publishedNotes = []
const publishedNames = new Set()

for (const sourcePath of vaultFiles.filter((filePath) => filePath.endsWith(".md"))) {
  const markdown = await readFile(sourcePath, "utf8")
  if (!hasPublishFlag(markdown)) continue

  const relativePath = path.relative(vaultRoot, sourcePath)
  const destinationRelativePath = relativePath === "홈.md" ? "index.md" : relativePath
  const destinationPath = path.join(contentRoot, destinationRelativePath)
  await mkdir(path.dirname(destinationPath), { recursive: true })
  await writeFile(destinationPath, markdown)
  publishedNotes.push({ sourcePath, destinationPath, markdown })
  publishedNames.add(noteName(sourcePath))
}

const copiedAttachments = new Set()
for (const note of publishedNotes) {
  for (const match of note.markdown.matchAll(
    /!?\[\[([^\]|#]+\.[A-Za-z0-9]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g,
  )) {
    const attachmentName = path.basename(match[1])
    const sourcePath = path.join(vaultRoot, "99-첨부파일", attachmentName)
    const destinationPath = path.join(contentRoot, "99-첨부파일", attachmentName)

    try {
      await mkdir(path.dirname(destinationPath), { recursive: true })
      await cp(sourcePath, destinationPath)
      copiedAttachments.add(attachmentName)
    } catch {
      console.warn(`Missing attachment: ${attachmentName}`)
    }
  }
}

const missingLinks = new Set()
for (const note of publishedNotes) {
  const withoutCode = note.markdown.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "")
  for (const match of withoutCode.matchAll(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g)) {
    const target = match[1].trim()
    if (!target.includes(".") && !publishedNames.has(target)) {
      missingLinks.add(`${path.relative(vaultRoot, note.sourcePath)} -> [[${target}]]`)
    }
  }
}

console.log(`Vault: ${vaultRoot}`)
console.log(`Published Markdown notes: ${publishedNotes.length}`)
console.log(`Copied attachments: ${copiedAttachments.size}`)

if (missingLinks.size > 0) {
  console.warn("Links to unpublished or missing notes:")
  for (const link of [...missingLinks].sort()) console.warn(`- ${link}`)
}
