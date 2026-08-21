---
title: Java 시작하기
aliases: []
tags:
  - java
  - 기초
status: growing
difficulty: beginner
created: 2026-08-21
updated: 2026-08-21
publish: true
---

# Java 시작하기

> [!summary]
> Java 소스 코드는 바이트코드로 컴파일되고 JVM에서 실행된다.

## 왜 배우는가

Java를 배우면 자료형과 제어문 같은 기초 문법뿐 아니라 클래스, 객체, 예외 처리, 컬렉션을 사용해 큰 프로그램을 구조화하는 방법을 익힐 수 있다.

## 첫 프로그램

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
```

## 컴파일과 실행

클래스 이름과 같은 `Main.java`로 저장한다.

```bash
javac Main.java
java Main
```

예상 출력:

```text
Hello, Java!
```

## 코드 흐름

1. `Main` 클래스가 프로그램 코드를 감싼다.
2. JVM은 `main` 메서드를 프로그램의 시작점으로 사용한다.
3. `System.out.println`이 문자열을 출력하고 줄을 바꾼다.

## 흔한 실수

> [!warning]
> `public class Main`을 사용하면 파일 이름도 `Main.java`여야 한다. 대소문자까지 일치해야 한다.

## 연습 문제

1. 이름과 전공을 두 줄로 출력한다.
2. `println`을 `print`로 바꾸고 결과를 비교한다.
3. 파일명을 다르게 저장하여 컴파일 오류를 확인한다.

## 관련 노트

- [[Java 기초 인덱스]]
- [[C 시작하기]]
- [[학습 로드맵]]

