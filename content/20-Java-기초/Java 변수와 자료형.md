---
title: Java 변수와 자료형
aliases: []
tags:
  - java
  - 기초
status: seed
difficulty: beginner
created: 2026-08-21
updated: 2026-08-21
publish: true
---

# Java 변수와 자료형

> [!summary]
> Java 변수는 선언된 자료형에 맞는 값을 저장하며, 기본형과 참조형으로 나눌 수 있다.

## 최소 실행 예제

```java
public class Main {
    public static void main(String[] args) {
        int studentCount = 30;
        double averageScore = 87.5;
        String courseName = "Programming";

        System.out.println(courseName);
        System.out.println(studentCount);
        System.out.println(averageScore);
    }
}
```

## 핵심 확인 사항

- `int`와 `double`은 기본형이다.
- `String`은 객체를 가리키는 참조형이다.
- 지역 변수는 사용하기 전에 반드시 초기화해야 한다.
- 대입하려는 값이 자료형의 범위와 형태에 맞아야 한다.

## 관련 노트

- [[Java 시작하기]]
- [[Java 클래스와 객체]]
- [[C 변수와 자료형]]

