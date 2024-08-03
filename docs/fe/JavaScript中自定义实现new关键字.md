---
layout: doc
title: JavaScript中自定义实现new关键字
---

# JavaScript中自定义实现new关键字


## new关键字的使用

在JavaScript中，new关键字用于实例化构造函数，创建对象

```typescript
// 构造函数
function Person (name: string, age: number) {
  this.name = name
  this.age = age
}

Person.prototype.hello = function () {
  console.log(`hi, my name is ${this.name}, i am ${this.age} years old`)
}

const hanmeimei = new Person('韩梅梅', 10)

hanmeimei.hello()

```

## new关键字的原理

new关键字主要进行了以下几步操作
1. 创建一个新的空对象`obj`
2. 将空对象的原型[[__proto__]]指向构造函数`constructor`的`prototype`属性
3. 执行构造函数`constructor`，绑定`this`，获取函数执行结果`result`
4. 如果`result`是对象类型并且是非`null`，则直接返回`result`，否则返回创建的`obj`


## 自定义实现new关键字

```typescript
function customNew(constructor, ...args) {
  // 将obj的原型指向构造函数constructor的prototype
  const obj = Object.create(constructor.prototype)

  // 执行构造函数，绑定this指向
  const result = constructor.apply(obj, args)

  // 判断result的类型和值
  return typeof result === 'object' && result !== null ? result : obj
}
```