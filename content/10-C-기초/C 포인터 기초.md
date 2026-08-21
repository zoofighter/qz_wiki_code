---
title: C 포인터 기초
aliases: []
tags:
  - c
  - 포인터
status: seed
difficulty: beginner
created: 2026-08-21
updated: 2026-08-21
publish: true
---

# C 포인터 기초

> [!summary]
> 포인터는 다른 객체의 메모리 주소를 저장하는 변수다.

## 최소 실행 예제

```c
#include <stdio.h>

int main(void) {
    int score = 90;
    int *scorePointer = &score;

    printf("값: %d\n", *scorePointer);
    printf("주소: %p\n", (void *)scorePointer);
    return 0;
}
```

## 핵심 개념

- `&score`는 `score`의 주소를 얻는다.
- `scorePointer`는 그 주소를 저장한다.
- `*scorePointer`는 저장된 주소에 있는 값을 읽는다.
- 초기화되지 않은 포인터나 이미 유효하지 않은 주소를 역참조하면 안 된다.

## 관련 노트

- [[C 변수와 자료형]]
- [[C 기초 인덱스]]

