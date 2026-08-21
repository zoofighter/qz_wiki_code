---
title: C 시작하기
aliases: []
tags:
  - c
  - 기초
status: growing
difficulty: beginner
created: 2026-08-21
updated: 2026-08-21
publish: true
---

# C 시작하기

> [!summary]
> C 프로그램은 소스 코드를 컴파일하여 실행 파일로 만든 뒤 실행한다.

## 왜 배우는가

C를 배우면 변수와 제어문뿐 아니라 메모리, 주소, 컴파일 과정처럼 프로그램이 컴퓨터에서 동작하는 원리를 구체적으로 이해할 수 있다.

## 첫 프로그램

```c
#include <stdio.h>

int main(void) {
    printf("Hello, C!\n");
    return 0;
}
```

## 컴파일과 실행

파일 이름을 `hello.c`로 저장했다고 가정한다.

```bash
cc -std=c17 -Wall -Wextra -Wpedantic hello.c -o hello
./hello
```

예상 출력:

```text
Hello, C!
```

## 코드 흐름

1. `#include <stdio.h>`는 `printf` 선언을 사용할 수 있게 한다.
2. 프로그램은 `main` 함수에서 시작한다.
3. `printf`가 문자열을 표준 출력에 보낸다.
4. `return 0`은 프로그램이 정상 종료되었음을 운영체제에 알린다.

## 흔한 실수

> [!warning]
> 문장 끝의 세미콜론을 빠뜨리거나 문자열의 큰따옴표를 닫지 않으면 컴파일 오류가 발생한다. 오류 메시지의 첫 번째 위치부터 확인한다.

## 연습 문제

1. 이름과 전공을 두 줄로 출력한다.
2. `\n`을 제거했을 때 출력이 어떻게 달라지는지 확인한다.
3. 문자열의 큰따옴표 하나를 제거하고 컴파일 오류를 읽어 본다.

## 관련 노트

- [[C 기초 인덱스]]
- [[Java 시작하기]]
- [[학습 로드맵]]

