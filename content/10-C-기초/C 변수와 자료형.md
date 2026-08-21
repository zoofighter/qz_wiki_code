---
title: C 변수와 자료형
aliases: []
tags:
  - c
  - 기초
status: seed
difficulty: beginner
created: 2026-08-21
updated: 2026-08-21
publish: true
---

# C 변수와 자료형

> [!summary]
> 변수는 값을 저장하는 이름 있는 메모리 공간이며, 자료형은 값의 표현 방식과 가능한 연산을 정한다.

## 최소 실행 예제

```c
#include <stdio.h>

int main(void) {
    int studentCount = 30;
    double averageScore = 87.5;

    printf("학생 수: %d\n", studentCount);
    printf("평균 점수: %.1f\n", averageScore);
    return 0;
}
```

```bash
cc -std=c17 -Wall -Wextra -Wpedantic variables.c -o variables
./variables
```

예상 출력:

```text
학생 수: 30
평균 점수: 87.5
```

## 핵심 확인 사항

- `int`는 정수를 저장한다.
- `double`은 소수 부분이 있는 실수를 저장한다.
- `printf`의 형식 지정자는 전달하는 자료형과 일치해야 한다.
- 자료형의 실제 크기는 구현에 따라 달라질 수 있으므로 `sizeof`로 확인할 수 있다.

## 관련 노트

- [[C 시작하기]]
- [[C 포인터 기초]]
- [[Java 변수와 자료형]]

