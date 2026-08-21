---
title: Quartz 게시 가이드
aliases:
  - Quartz 퍼블리시
  - Quartz 배포
tags:
  - guide
  - quartz
status: growing
difficulty: intermediate
created: 2026-08-21
updated: 2026-08-21
publish: true
---

# Quartz 게시 가이드

Quartz는 Obsidian Markdown 문서를 정적 웹사이트로 변환한다. 이 문서는 **Quartz 5와 GitHub Pages**를 사용해 현재 vault의 공개 노트를 웹에 올리는 절차를 설명한다.

> [!important]
> 현재 vault에는 Quartz 프로그램이 설치되어 있지 않다. 이 vault를 직접 Quartz 저장소로 바꾸기보다 별도의 Quartz 저장소를 만들고 `publish: true`인 노트만 `content/`에 전달하는 방식을 권장한다.

## 전체 구조

권장 구조는 다음과 같다.

```text
Obsidian vault: wiki_code/
├── 02-Raw/              # 항상 비공개
├── 10-C-기초/
├── 20-Java-기초/
└── ...

Quartz 저장소: qz_wiki_code/
├── content/             # 공개 노트만 복사
├── quartz/
├── quartz.config.yaml
├── quartz.layout.yaml
└── package.json
```

게시 흐름은 다음과 같다.

```text
Obsidian에서 작성
→ publish 속성 확인
→ Quartz content/로 공개 노트 복사
→ 로컬 미리보기
→ GitHub에 동기화
→ GitHub Pages 자동 배포
```

## 1. 준비물 확인

Quartz 5는 Node.js 22 이상이 필요하다. 터미널에서 설치 상태를 확인한다.

```bash
git --version
node -v
npm -v
```

Node.js 버전이 22보다 낮으면 먼저 Node.js를 업그레이드한다.

필요한 계정과 프로그램은 다음과 같다.

- Git
- Node.js 22 이상
- npm
- GitHub 계정
- Obsidian
- 터미널

## 2. GitHub에서 Quartz 저장소 만들기

Quartz 공식 GitHub 저장소에서 **Use this template → Create a new repository**를 선택한다.

저장소 이름 예시:

```text
qz_wiki_code
```

처음 설정할 때 공개 범위를 선택한다.

- 공개 저장소: 설정이 단순하지만 저장소의 모든 파일을 누구나 볼 수 있다.
- 비공개 저장소: GitHub Pages 사용 가능 여부가 계정과 플랜에 따라 달라질 수 있다.

> [!warning]
> 공개 저장소에는 `02-Raw/`, 개인정보, API 키, 학교 내부 자료를 절대 push하지 않는다. Quartz 필터는 웹페이지 생성을 막을 뿐 GitHub 저장소의 원본 파일까지 숨겨 주지는 않는다.

## 3. Quartz 저장소 복제

터미널에서 원하는 상위 폴더로 이동한 뒤 자신의 저장소를 복제한다.

```bash
cd ~/Documents
git clone https://github.com/YOUR_GITHUB_ID/qz_wiki_code.git
cd qz_wiki_code
```

`YOUR_GITHUB_ID`는 실제 GitHub 사용자 이름으로 바꾼다.

## 4. 의존성 설치

처음 설치할 때 다음 명령을 실행한다.

```bash
npm i
```

이미 설정된 Quartz 저장소를 다른 컴퓨터에서 다시 받은 경우에는 다음 명령을 권장한다.

```bash
npm ci
```

## 5. Quartz 초기화

대화형 설정을 시작한다.

```bash
npx quartz create
```

이 vault에 권장하는 선택은 다음과 같다.

| 질문 | 권장 선택 |
|---|---|
| Template | `obsidian` |
| Content strategy | 처음에는 `new` 또는 `copy` |
| Base URL | `YOUR_GITHUB_ID.github.io/qz_wiki_code` |
| Link strategy | Obsidian 템플릿의 기본 설정 사용 |

### content strategy 선택

- `new`: 빈 `content/`에서 시작한다. 공개 파일을 직접 관리하기 가장 안전하다.
- `copy`: 기존 vault 파일을 복사한다. 비공개 파일이 함께 들어가지 않도록 주의한다.
- `symlink`: 기존 vault를 직접 연결한다. 편리하지만 `02-Raw/`나 `publish: false` 자료의 노출 위험을 충분히 이해한 뒤 사용한다.

이 vault에는 비공개 Raw 영역이 있으므로 **처음에는 `new`를 권장**한다.

## 6. Quartz 플러그인 설치

초기 템플릿이 요구하는 플러그인을 설치한다.

```bash
npx quartz plugin install --from-config
```

플러그인 빌드 오류가 발생하고 공식 안내에 따라 최신 버전 갱신이 필요할 때는 다음 명령을 검토한다.

```bash
npx quartz plugin install --latest
```

버전 변화가 생길 수 있으므로 무조건 최신 버전으로 바꾸지 말고 변경 내용을 확인한다.

## 7. 공개 노트 준비

### 공개 속성

웹에 올릴 노트에는 다음 속성이 있어야 한다.

```yaml
---
publish: true
---
```

비공개 노트는 다음과 같이 유지한다.

```yaml
---
publish: false
---
```

`02-Raw/`의 모든 노트는 항상 `publish: false`여야 한다. 자세한 처리 원칙은 vault 내부의 비공개 Raw 운영 문서를 참고한다.

### 공개 시작 문서

Quartz의 첫 화면으로 사용할 문서는 `content/index.md`가 가장 명확하다. 현재 [[홈]]의 내용을 공개 시작점으로 사용하려면 Quartz 저장소에서 다음 구조로 둔다.

```text
content/index.md
```

복사할 때 파일 이름을 `홈.md`에서 `index.md`로 바꾸거나, 별도의 공개용 `index.md`를 만들어 [[C 기초 인덱스]]와 [[Java 기초 인덱스]]로 연결할 수 있다.

### 첨부파일

공개 노트가 사용하는 이미지만 `content/` 아래에 함께 복사한다. PDF, 음성, 이미지 같은 비 Markdown 파일은 필터와 무관하게 최종 빌드에 포함될 수 있으므로 비공개 첨부파일을 복사하면 안 된다.

## 8. `publish: true`만 게시하도록 설정

Quartz의 기본 비공개 방식은 `draft: true`를 제외하는 방식이다. 이 vault는 반대로 `publish: true`가 있는 노트만 공개하므로 **ExplicitPublish 필터**를 사용하는 것이 안전하다.

설치된 Quartz 5의 `quartz.config.yaml`에서 필터 플러그인 구성을 확인하고 `ExplicitPublish`를 사용하도록 설정한다. 정확한 플러그인 이름과 YAML 구조는 설치된 버전의 기본 설정 및 공식 문서를 기준으로 한다.

> [!warning]
> 필터 설정만 믿고 비공개 노트를 공개 GitHub 저장소에 넣지 않는다. 가장 안전한 방법은 처음부터 공개할 파일만 `content/`에 복사하는 것이다.

## 9. Raw와 비공개 경로 제외

`quartz.config.yaml`의 `configuration.ignorePatterns`를 사용하면 특정 경로를 파싱 대상에서 제외할 수 있다.

설정 예시는 다음과 같은 의미로 구성한다.

```yaml
configuration:
  ignorePatterns:
    - "02-Raw"
    - "90-템플릿"
    - ".obsidian"
```

다만 별도 Quartz 저장소의 `content/`에 이 폴더들을 복사하지 않았다면 해당 패턴은 추가 방어선이다.

## 10. 사이트 기본 설정

Quartz 5는 주로 `quartz.config.yaml`에서 사이트를 설정한다.

확인할 항목은 다음과 같다.

```yaml
configuration:
  pageTitle: "C·Java 기초 학습 위키"
  locale: ko-KR
  baseUrl: "YOUR_GITHUB_ID.github.io/qz_wiki_code"
```

`baseUrl` 작성 규칙:

- `https://`를 넣지 않는다.
- 앞뒤에 `/`를 넣지 않는다.
- GitHub Pages 프로젝트 사이트라면 저장소 이름까지 포함한다.
- 예: `student.github.io/qz_wiki_code`

`baseUrl`이 잘못되면 RSS, sitemap, canonical URL 등이 잘못 생성될 수 있다.

## 11. 로컬 미리보기

Quartz 저장소에서 다음 명령을 실행한다.

```bash
npx quartz build --serve
```

브라우저에서 다음 주소를 연다.

```text
http://localhost:8080
```

개발 서버는 파일 변경을 감시하고 자동으로 다시 빌드한다.

### 로컬 확인 항목

- [[홈]]에 해당하는 첫 화면이 열리는가?
- wikilink가 정상적으로 이동하는가?
- backlink와 그래프가 표시되는가?
- callout이 정상적으로 보이는가?
- `$...$`와 `$$...$$` 수식이 표시되는가?
- Markdown 표가 표로 표시되는가?
- C와 Java 코드 블록에 구문 강조가 적용되는가?
- 한글 파일명과 제목이 깨지지 않는가?
- 공개하지 않을 노트가 검색과 그래프에 나타나지 않는가?

서버를 종료할 때는 터미널에서 `Ctrl+C`를 누른다.

## 12. GitHub에 처음 올리기

GitHub 템플릿에서 만든 저장소라면 원격 저장소가 이미 연결되어 있다. 확인하려면 다음 명령을 사용한다.

```bash
git remote -v
```

첫 push는 다음 명령으로 수행한다.

```bash
npx quartz sync --no-pull
```

이후 업데이트는 다음 명령을 사용한다.

```bash
npx quartz sync
```

`npx quartz sync`는 변경 내용을 Git에 기록하고 원격 저장소와 동기화한다. 실행 전에 공개 파일만 포함되어 있는지 반드시 확인한다.

## 13. GitHub Pages 설정

GitHub 저장소에서 다음 메뉴로 이동한다.

```text
Settings → Pages → Build and deployment → Source
```

Source를 다음 값으로 지정한다.

```text
GitHub Actions
```

Quartz 5 공식 GitHub Pages workflow는 `v5` 브랜치 push를 기준으로 동작한다. 저장소의 다음 위치에 배포 workflow가 있는지 확인한다.

```text
.github/workflows/deploy.yml
```

GitHub 템플릿을 사용했다면 공식 workflow가 포함되어 있는지 먼저 확인한다. 없다면 현재 Quartz 5 공식 Hosting 문서의 GitHub Pages workflow를 그대로 기준으로 추가한다. 오래된 Quartz 4 workflow와 혼합하지 않는다.

## 14. 배포 확인

`npx quartz sync` 후 GitHub 저장소의 Actions 탭을 확인한다.

```text
GitHub 저장소 → Actions → Deploy Quartz site to GitHub Pages
```

배포가 성공하면 기본 주소는 다음과 같다.

```text
https://YOUR_GITHUB_ID.github.io/qz_wiki_code
```

처음 배포하거나 캐시가 갱신되는 동안 잠시 기다려야 할 수 있다.

## 15. 이후 게시 과정

노트를 수정한 뒤에는 다음 순서로 반복한다.

1. Obsidian에서 노트를 작성하고 저장한다.
2. 공개할 노트만 `publish: true`로 설정한다.
3. 공개 노트와 필요한 첨부파일만 Quartz `content/`로 복사한다.
4. `npx quartz build --serve`로 로컬 확인한다.
5. 비공개 파일과 깨진 링크가 없는지 검사한다.
6. `npx quartz sync`를 실행한다.
7. GitHub Actions 성공 여부와 실제 사이트를 확인한다.

## 16. 자주 발생하는 문제

### 사이트가 갱신되지 않음

- `npx quartz sync`를 실행했는지 확인한다.
- GitHub Actions가 성공했는지 확인한다.
- 브라우저 캐시를 새로고침한다.
- 수정한 파일이 실제 Quartz `content/`에 복사되었는지 확인한다.

### 링크가 깨짐

- 대상 노트가 `content/`에 함께 존재하는지 확인한다.
- 공개 노트가 `publish: false` 또는 Raw 노트를 링크하지 않는지 확인한다.
- 같은 이름의 노트가 여러 폴더에 있는지 확인한다.
- Obsidian 템플릿과 링크 해석 설정을 확인한다.

### 홈페이지가 원하는 문서가 아님

- 공개 시작 문서가 `content/index.md`인지 확인한다.
- [[홈]]을 복사했다면 파일 이름과 내부 링크를 점검한다.

### 비공개 첨부파일이 노출됨

- `content/`에서 해당 파일을 즉시 제거한다.
- GitHub 공개 저장소에도 올라갔다면 Git 기록에 남았을 가능성을 확인한다.
- API 키나 개인정보가 포함되었다면 단순 삭제로 끝내지 말고 해당 비밀값을 폐기하고 재발급한다.

### GitHub Pages가 배포되지 않음

- Settings → Pages의 Source가 GitHub Actions인지 확인한다.
- workflow가 현재 브랜치인 `v5`를 감시하는지 확인한다.
- Actions 로그에서 Node.js, npm, 플러그인 설치, 빌드 오류를 순서대로 확인한다.

## 17. 공개 전 최종 체크리스트

- [ ] `content/`에는 공개할 파일만 있는가?
- [ ] `02-Raw/`가 복사되지 않았는가?
- [ ] `publish: false` 노트가 없는가?
- [ ] 개인정보, API 키, 학번, 이메일, 로컬 절대 경로가 없는가?
- [ ] 공개 노트가 비공개 Raw 노트를 링크하지 않는가?
- [ ] 필요한 이미지만 포함되어 있는가?
- [ ] PDF와 기타 첨부파일도 공개 가능한가?
- [ ] [[홈]]에서 모든 공개 영역으로 이동할 수 있는가?
- [ ] wikilink가 깨지지 않는가?
- [ ] 모든 표 앞에 빈 줄이 있는가?
- [ ] `$...$`와 `$$...$$` 수식이 표시되는가?
- [ ] 코드 블록과 callout이 정상적으로 보이는가?
- [ ] 모바일 화면에서 표와 코드가 읽히는가?
- [ ] `baseUrl`이 실제 GitHub Pages 주소와 일치하는가?
- [ ] 로컬 빌드가 성공했는가?
- [ ] GitHub Actions 배포가 성공했는가?

## 공식 참고 자료

- [Quartz 5 Installation](https://quartz.jzhao.xyz/getting-started/installation)
- [Quartz 5 Hosting](https://quartz.jzhao.xyz/hosting)
- [Quartz 5 Configuration](https://quartz.jzhao.xyz/configuration)
- [Quartz 5 Private Pages](https://quartz.jzhao.xyz/features/private-pages)

## 관련 노트

- [[홈]]
- [[위키 운영 가이드]]
