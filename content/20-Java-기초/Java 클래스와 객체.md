---
title: Java 클래스와 객체
aliases: []
tags:
  - java
  - 객체지향
status: seed
difficulty: beginner
created: 2026-08-21
updated: 2026-08-21
publish: true
---

# Java 클래스와 객체

> [!summary]
> 클래스는 상태와 동작을 정의하는 설계이고, 객체는 그 클래스를 바탕으로 생성된 실제 인스턴스다.

## 최소 실행 예제

```java
class Student {
    String name;
    int score;

    void printInfo() {
        System.out.println(name + ": " + score);
    }
}

public class Main {
    public static void main(String[] args) {
        Student student = new Student();
        student.name = "민수";
        student.score = 90;
        student.printInfo();
    }
}
```

예상 출력:

```text
민수: 90
```

## 핵심 개념

- `Student` 클래스는 `name`, `score`, `printInfo`를 정의한다.
- `new Student()`는 새 객체를 생성한다.
- `student` 변수는 생성된 객체를 참조한다.
- 다음 단계에서는 생성자와 접근 제어를 사용해 객체가 올바른 상태를 유지하게 만든다.

## 관련 노트

- [[Java 변수와 자료형]]
- [[Java 기초 인덱스]]

