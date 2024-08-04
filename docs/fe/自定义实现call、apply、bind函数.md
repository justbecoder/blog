# 自定义实现call、apply、bind函数


## 自定义实现call方法

`Function.prototype.call`方法的特点：
1. 第一个参数绑定this，如果参数值为null，默认this指向全局对象（浏览器为Window，Node环境为GlobalThis）
2. call方法在调用时，参数传递为依次传递

```javascript
/**
 * @description 自定义实现call
 * 
*/

Function.prototype.myCall = function (context, ...args) {
  // 如果第一个参数为null或者是undefined，将其设置为全局对象（浏览器为Window，Node环境为GlobalThis）
  if (context === null || context === undefined) {
    context = typeof window !== 'undefined' ? window : globalThis
  }

  // 设置唯一key，避免与context本身属性冲突
  const symbol = Symbol()

  // 指向函数本身
  context[symbol] = this

  // 调用函数，依次传递参数
  const result = context[symbol](...args)

  // 删除key
  delete context[symbol]

  // 返回结果
  return result
}

function person (age) {
  console.log(this.name, age)
}

person.myCall({name: '张三'}, 10) // 张三 10
```

## 自定义实现apply方法

`Function.prototype.call`方法的特点：
1. 第一个参数绑定this，如果参数值为null，默认this指向全局对象（浏览器为Window，Node环境为GlobalThis）
2. call方法在调用时，参数传递为数组形式


```javascript
/**
 * @description 自定义实现apply
 * 
*/

Function.prototype.myApply = function (context, args) {
  // 如果第一个参数为null或者是undefined，将其设置为全局对象（浏览器为Window，Node环境为GlobalThis）
  if (context === null || context === undefined) {
    context = typeof window !== 'undefined' ? window : globalThis
  }

  // 设置唯一key，避免与context本身属性冲突
  const symbol = Symbol()

  // 指向函数本身
  context[symbol] = this

  // 调用函数，以数组形式传递参数
  const result = context[symbol](...args)

  // 删除key
  delete context[symbol]

  // 返回结果
  return result
}

function person(age) {
  console.log(this.name, age)
}

person.myApply({ name: '李四' }, [10]) // 张三 10
```

## 自定义实现bind方法

`Function.prototype.bind`方法的特点：
1. 第一个参数绑定this，如果参数值为null，默认this指向全局对象（浏览器为Window，Node环境为GlobalThis）
2. bind方法在调用时，并不会立即调用原函数，而是返回一个新函数，同时支持传递参数到原函数中
3. 调用返回的新函数时，传递的新参数与bind调用时传递的参数会进行组合


```javascript
/**
 * @description 自定义实现bind
 * 
*/
Function.prototype.myBind = function (context, ...initArgs) {
  // 如果第一个参数为null或者是undefined，将其设置为全局对象（浏览器为Window，Node环境为GlobalThis）
  if (context === null || context === undefined) {
    context = typeof window !== 'undefined' ? window : globalThis
  }

  // 设置唯一key，避免与context本身属性冲突
  const symbol = Symbol()

  // 指向函数本身
  context[symbol] = this

  // 指向函数本身
  return function (...args) {
    // 合并参数
    const newArgs = [
      ...initArgs,
      ...args
    ]

    // 调用函数，传入参数
    const result = context[symbol](...newArgs)

    // 删除key
    delete context[symbol]
  }
}

function person (age, sex) {
  console.log(this.name, age, sex)
}

person.myBind({ name: '张三' }, 10)('男') // 张三 10 男
```