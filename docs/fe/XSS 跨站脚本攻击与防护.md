
# XSS 跨站脚本攻击与防护

XSS攻击全称是Cross-Site Scripting（跨站脚本攻击），主要只黑客在HTML文件中或者是DOM中注入恶意脚本，从而在用户浏览页面时利用恶意脚本进行攻击。

几种常见的攻击形式为：**反射型XSS**、**存储型XSS**、**DOM型XSS**

## 反射型XSS
攻击者通过构造恶意的URL，将恶意脚本作为参数的形式包含在其中，当页面中将该恶意脚本插入到html中时，造成攻击

**场景：**

有一个搜索页面`search.php`，接收用户搜索的关键词并将其显示在页面

```php
<?php
  $keyword = $_GET['keyword'];
  echo "<h2>您搜索的关键词是：".$keyword."</h2>";
?>
```

**攻击表现：**

攻击者构造了一个恶意的URL，例如`https://example.com/search.php?keyword=<script>alert('XSS Attack!')</script>`，当用户点击该链接时，浏览器将`script`标签作为html内容进行渲染和解析，导致页面弹出“XSS Attack!”的警告框


## 存储型XSS
恶意脚本被存储在服务器端（数据库或者是文件系统中），当用户访问了包含了恶意脚本的页面，脚本就会执行。常见于论坛或者用户评论等输入内容被永久保存并展示给其他用户。

**场景：**

在论坛网站，用户发表帖子和评论，服务端代码在处理用户输入时，未进行充分的转义和过滤，直接将恶意脚本存储到数据库中

```javascript
<script>alert('XSS Attack!'); // 还可以包含更复杂的恶意操作，如窃取用户信息等</script>
```

**攻击表现:**

当其他用户访问包含该评论的页面时，浏览器会执行嵌入在评论中的恶意脚本，从而受到攻击。


## DOM型XSS

通过修改页面DOM结构触发恶意攻击脚本

```html
<!DOCTYPE html>
<html>

<body>

  <script>
    function getParameterValue(param) {
      var urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    }

    var name = getParameterValue('name');

    // 重点在于innerHTML的设置，是以html形式插入到浏览器中，会被解析、执行
    document.getElementById('output').innerHTML = 'Hello,'+ name + '!';
  </script>

  <div id="output"></div>

</body>

</html>
```

## XSS攻击防御

其实不管是`反射型XSS`、`存储型XSS`还是`DOM型XSS`攻击，引发XSS攻击的本质还是黑客的恶意脚本被当做html的形式插入到页面中，浏览器进一步解析、执行，造成危害。

所以对XSS攻击的防御策略也很明确，即对输入内容进行**htm转义**或者是**标签过滤**

### 1. 转义html标签 - 将html标签转为实体字符

```typescript
/**
 * @description html转实体字符
 * 
*/
function convertHtmlToEntities(str: string): string {
  // 构建映射Map
  const map: {[key: string]: string} = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }

  // 进行全局替换
  return str.replace(/[&<>"']/g, m => map[m])
}

let html = "<script>alert('XSS Attack!')</script>";
console.log(convertHtmlToEntities(html)); // &lt;script&gt;alert(&#039;XSS Attack!&#039;)&lt;/script&gt;
```

### 2. 过滤html标签

```typescript
/**
 * @description 过滤html标签
 * 
*/
function filterHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '')
}

console.log(filterHtml(html)) // alert('XSS Attack!')
```



## Vue和React框架中的html渲染

在Vue和React框架中都支持渲染html，如`Vue`的`v-html`和`React`的`dangerouslySetInnerHTML`。如果使用时不注意，都有可能造成XSS攻击。





