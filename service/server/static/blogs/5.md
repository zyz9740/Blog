# **我的**Blog搭建之旅5——HTML与CSS

[TOC]

## HTML组件

html概念：

- 浏览器的容错性：数据传输中的遗漏，所以 tag 的封闭性是可以打破的。所以类似于\<p>的东西可以是不封闭的。（像 \<br />, \<hr /> 之类的就是系统推荐的写法 ）
- 两个id其实是可以的，但是浏览器就不知道用什么方法getElementId的了，这取决于是什么前序还是后序之类的。



### < input >

用于与用户交互，获取用户的输入信息，支持多种类型

http://www.runoob.com/tags/tag-input.html

- 通过给input附上id，然后使用如下语句获取用户输入的数据。用value获取输入框用户输入的内容

```react
let account = document.getElementById("account").value;
```

###< 表格 >

| 标签        | 描述                 |
| ----------- | -------------------- |
| \<table>    | 定义表格             |
| \<th>       | 定义表格的表头       |
| \<tr>       | 定义表格的行         |
| \<td>       | 定义表格单元         |
| \<caption>  | 定义表格标题         |
| \<colgroup> | 定义表格列的组       |
| \<col>      | 定义用于表格列的属性 |
| \<thead>    | 定义表格的页眉       |
| \<tbody>    | 定义表格的主体       |
| \<tfoot>    | 定义表格的页脚       |

```html
<table border="1">
    <tr>
        <th>Header 1</th>
        <th>Header 2</th>
    </tr>
    <tr>
        <td>row 1, cell 1</td>
        <td>row 1, cell 2</td>
    </tr>
    <tr>
        <td>row 2, cell 1</td>
        <td>row 2, cell 2</td>
    </tr>
</table>

```

<thead> 元素应该与 \<tbody> 和 \<tfoot> 元素结合起来使用，用来规定表格的各个部分（表头、主体、页脚）。

通过使用这些元素，使浏览器有能力支持独立于表格表头和表格页脚的表格主体滚动。当包含多个页面的长的表格被打印时，表格的表头和页脚可被打印在包含表格数据的每张页面上。

普通的表格只需要使用 \<th> \<tr> \<td>即可

### < meta >

- META元素通常用于指定网页的描述，关键词，文件的最后修改时间，作者及其他元数据。元数据可以被使用浏览器（如何显示内容或重新加载页面），搜索引擎（关键词），或其他 Web 服务调用。

- \<meta> 标签通常位于 \<head> 区域内。

- 属性列表：

  |                             属性                             |                              值                              | 描述                                                         |
  | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------- |
  | [charset](http://www.runoob.com/tags/att-meta-charset.html)  |                  *character_set*（字符集）                   | 定义文档的字符编码。<br />\<meta charset="utf-8">            |
  | [content](http://www.runoob.com/tags/att-meta-content.html)  |                            *text*                            | 定义与 http-equiv 或 name 属性相关的元信息。<br />其实说白了就是name和http-equiv属性的内容。 |
  | [http-equiv](http://www.runoob.com/tags/att-meta-http-equiv.html) |        content-type <br />default-style<br /> refresh        | 把 content 属性关联到 HTTP 头部。                            |
  |    [name](http://www.runoob.com/tags/att-meta-name.html)     | application-name<br />author <br />description <br />generatorkeywords<br />viewport | 把 content 属性关联到一个名称。<br />viewport:一个新的功能，为了移动开发而设计的，细节可参考http://www.runoob.com/w3cnote/viewport-deep-understanding.html |

### < link >

| 属性                                                         | 值                                                           | 描述                                             |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------ |
| [href](http://www.runoob.com/tags/att-link-href.html)        | *URL*                                                        | 定义被链接文档的位置。                           |
| [hreflang](http://www.runoob.com/tags/att-link-hreflang.html) | *language_code*                                              | 定义被链接文档中文本的语言。                     |
| [media](http://www.runoob.com/tags/att-link-media.html)      | *media_query*                                                | 规定被链接文档将显示在什么设备上。               |
| [rel](http://www.runoob.com/tags/att-link-rel.html)          | alternate <br />archives <br />author <br />bookmark <br />external <br />first <br />help ：帮助文档<br />icon:导入表示该文档的图标。 <br />last <br />license <br />next <br />nofollow <br />noreferrer<br />pingback <br />prefetch <br />prev <br />search <br />sidebar <br />stylesheet:要导入的样式表的 URL。 <br />tag <br />up | 必需。定义当前文档与被链接文档之间的关系。       |
| [sizes](http://www.runoob.com/tags/att-link-sizes.html)      | *Height*x*Width*any                                          | 定义了链接属性大小，只对属性 rel="icon" 起作用。 |
| [type](http://www.runoob.com/tags/att-link-type.html)        | *MIME_type*                                                  | 规定被链接文档的 MIME 类型。                     |

## CSS样式

- 总所周知的是CSS表示层叠样式表 (**C**ascading **S**tyle **S**heets)，用于定义如何显示html组件。本来的html组件太单调了，我们使用CSS来改变他们的外观。

### 语法 

![img](https://ws4.sinaimg.cn/large/006tKfTcgy1g0al0xuyxxj30fu03c3yl.jpg)

- 由 选择器+ 声明 + 值 组成，用{ }括起来声明，用；分割，最简单的例子如下：

```css
p
{
color:red;
text-align:center;
}
```

- 注释使用/* */
- ⚠️：**与shell一样，属性和值之间不要留有空格！！**

#### < 选择器 >

- id选择器：使用#后接id来表示id选择器，与html中的id对应。每个id是特定的。只能用于一个组件。

```css
<head>
<style>
#para1
{
	text-align:center;
	color:red;
} 
</style>
</head>

<body>
<p id="para1">Hello World!</p>
<p>这个段落不受该样式的影响。</p>
</body>
```

- class选择器：使用.后接class的名称来跟html中的class对应。class可以在多个组件中使用。同时可以在.之前使用组件名称来使特定组件的某个类产生变化

```css
/*只有p的center类受影响*/
<head>
<style>
p.center
{
	text-align:center;
}
</style>
</head>

<body>
<h1 class="center">这个标题不受影响</h1>
<p class="center">这个段落居中对齐。</p> 
</body>
```

```css
/*全部center类都受影响*/
<head>
<style>
.center
{
	text-align:center;
}
</style>
</head>

<body>
<h1 class="center">标题居中</h1>
<p class="center">段落居中。</p> 
</body>
```

- 分组选择器：就是一样的声明的选择器可以写到一起，用，分隔
- 嵌套选择器：
  - **.marked p{ }**: 为所有 **class="marked"** 元素内的 **p** 元素指定一个样式。
  - **p.marked{ }**: 为所有 **class="marked"** 的 **p** 元素指定一个样式。
- 在 CSS3 中包含了四种组合方式:
  - 后代选择器(以空格分隔)
  - 子元素选择器(以大于号分隔）(子元素与后代的区别就是他是直接的后代）
  - 相邻兄弟选择器（以加号分隔）
  - 普通兄弟选择器（以破折号分隔）

#### < CSS语句的位置 >

- 外部的引用：

```css
<head>
<link rel="stylesheet" type="text/css" href="mystyle.css">
</head>
```

- 内部的声明：

```css
<style>
hr {color:sienna;}
p {margin-left:20px;}
body {background-image:url("images/back40.gif");}
</style>
```

- 内联方式：

```css
<p style="color:sienna;margin-left:20px">这是一个段落。</p>
```

- 优先级：**内联样式）Inline style > （内部样式）Internal style sheet >（外部样式）External style sheet > 浏览器默认样式**

### CSS属性 

#### < 背景 >

| Property                                                     | 描述                                         | 说明                                                         |
| ------------------------------------------------------------ | -------------------------------------------- | ------------------------------------------------------------ |
| [background](http://www.runoob.com/cssref/css3-pr-background.html) | 简写属性，作用是将背景属性设置在一个声明中。 | 把下面的都写到一起比较方便                                   |
| [background-attachment](http://www.runoob.com/cssref/pr-background-attachment.html) | 背景图像是否固定或者随着页面的其余部分滚动。 | - scroll:随页面的其余部分滚动，这是默认选项<br />- fixed：固定的<br />- inherit：从父元素继承 |
| [background-color](http://www.runoob.com/cssref/pr-background-color.html) | 设置元素的背景颜色。                         | 默认为transparent，透明的                                    |
| [background-image](http://www.runoob.com/cssref/pr-background-image.html) | 把图像设置为背景。                           | url('路径名');<br />可以使用多个背景图片：http://www.runoob.com/try/try.php?filename=trycss3_background_multiple |
| [background-position](http://www.runoob.com/cssref/pr-background-position.html) | 设置背景图像的起始位置。                     | - left/right/center top/center.bottom：位置<br />- x% y% 使用百分比<br />- xpos ypos 使用像素值 |
| [background-repeat](http://www.runoob.com/cssref/pr-background-repeat.html) | 设置背景图像是否及如何重复。                 | repeat/repeat-x/repeat-y                                     |

- 关于颜色：CSS的颜色支持三种描述
  - 十六进制 - 如："#ff0000"
  - RGB - 如："rgb(255,0,0)"
  - 颜色名称 - 如："red"

#### < 文字 >

| 属性                                                         | 描述                 | 说明                                                         |
| ------------------------------------------------------------ | -------------------- | ------------------------------------------------------------ |
| [color](http://www.runoob.com/cssref/pr-text-color.html)     | 设置文本颜色         |                                                              |
| [direction](http://www.runoob.com/cssref/pr-text-direction.html) | 设置文本方向。       | ltr/rtl                                                      |
| [letter-spacing](http://www.runoob.com/cssref/pr-text-letter-spacing.html) | 设置字符间距         | 3px/-2px 默认为0                                             |
| [line-height](http://www.runoob.com/cssref/pr-dim-line-height.html) | 设置行高             | 倍数/百分比/像素值                                           |
| [text-align](http://www.runoob.com/cssref/pr-text-text-align.html) | 对齐元素中的文本     | left/right/center/justify<br />justify的意思是随着窗口的变化而变换每一行的字数 |
| [text-decoration](http://www.runoob.com/cssref/pr-text-text-decoration.html) | 向文本添加修饰       | underline/overline/line-through/blink                        |
| [text-indent](http://www.runoob.com/cssref/pr-text-text-indent.html) | 缩进元素中文本的首行 | 像素值/百分比                                                |
| [text-shadow](http://www.runoob.com/cssref/css3-pr-text-shadow.html) | 设置文本阴影         |                                                              |
| [text-transform](http://www.runoob.com/cssref/pr-text-text-transform.html) | 控制元素中的字母     |                                                              |

- 太多了不抄了。。。。以后只记我看不懂的吧
- 字体：
  - font-family 属性应该设置几个字体名称作为一种"后备"机制，如果浏览器不支持第一种字体，他将尝试下一种字体。如果字体系列的名称超过一个字，它必须用引号，如Font Family："宋体"。
  - font-style：正常字体/斜体
- 链接：可以设计不同的点击或者移动到连接上时的变化，还有高级变化：http://www.runoob.com/try/try.php?filename=trycss_link_advanced
- 表格：设置table,td,th,caption之类的，http://www.runoob.com/try/try.php?filename=trycss_table_fancy
- overflow：visible/hidden/auto/acroll

- 边框，轮廓
- 外边距，内边距：一到四个值都行，像素或者百分比都可以
- visibility：可见性；display：none/inline/block——块级元素与内敛元素
- 使用":"表示他使用了“伪类”或者“伪元素”

### 组件的摆放

之所以单独领出来写是因为上次就没搞懂这个位置是如何确定的，就比较懵。这次认真的看一下原理。

####<  Position >

- **static**：无特殊定位，表示正常。就按照正常的block和inline形式摆放，也就是默认值。
- **relative**：表示相对于static 的定位，通常使用像素值表示偏移

```css
h2.pos_right
{
	position:relative;
	left:20px;
}
```

- **fixed**：

  - 表示相对于浏览器窗口固定的位置，就算窗口滑动他也不动。
  - 不占据组件的空间，可以重叠。

- **absolute**：

  - 绝对定位的元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于\<html>。他是相对于某个组件的，窗口滑动的话他会动的。
  - 但是也不占据组件的空间，会重叠。

- **sticky**：粘性定位，神奇的定位。

  - 粘性定位的元素是依赖于用户的滚动，在 **position:relative** 与 **position:fixed** 定位之间切换。

  - 它的行为就像 **position:relative;** 而当页面滚动超出目标区域时，它的表现就像 **position:fixed;**，它会固定在目标位置。

上面有说到 **重叠** ，重叠的顺序当然也是可以指定的

```css
img
{
    position:absolute;
    left:0px;
    top:0px;
    z-index:-1; /* 数字越大越是在上面 */
}
```

#### < Dimension >

- **height**，**width**：不仅可以控制图片，而且可以控制文本。
- **max-height**，**max-width**：设置元素的最大高度和宽度，可以与overflow属性配合使用，或者使用背景颜色就可以看出来。
- **min-height,min-width**：设置元素的最小高度和宽度，主要可以用来占位吧。

#### < 盒子模型 >

- **div**：盒子模型是由**外边距、边框、内边距、内容**组成的，前三者默认都是没有的。

  ![CSS box-model](https://ws1.sinaimg.cn/large/006tKfTcgy1g0anunjlg3g30ew081dfo.gif)

  最终元素的总宽度计算公式是这样的：

  总元素的宽度=宽度+左填充+右填充+左边框+右边框+左边距+右边距

  元素的总高度最终计算公式是这样的：

  总元素的高度=高度+顶部填充+底部填充+上边框+下边框+上边距+下边距

- **简写属性**：margin和padding可以有1～4个值：

  1. 全部边距
  2. 先上下，后左右
  3. 上、左右、下
  4. 上、右、下、左（顺时针记录）

  同时也可以使用 margin/padding **-** top/right/bottom/left之类的属性

#### < dispaly:flex >

看项目代码的时候突然看到一句

```
display:flex;
```

记得display里面没有这个选项啊，后来知道是一种布局的写法，详细语法参考这个吧：http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool

### CSS优先级规则

- id大于class
- 后面的class大于前面的class（不知道为什么我这个不行诶）
- 后引入的stylesheet优先于先引入的，所以自己的css一定要放在最后

http://www.runoob.com/w3cnote/css-style-priority.html



### CSS实例

- 一个感觉挺不错的导航栏布局：http://www.runoob.com/try/try.php?filename=trycss_float6

## BootStrap4——套模板大法好

### 安装与使用

不管是啥反正都可能用上，加上去吧

```html
<!-- 新 Bootstrap4 核心 CSS 文件 -->
<link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/4.1.0/css/bootstrap.min.css">
 
<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="https://cdn.staticfile.org/jquery/3.2.1/jquery.min.js"></script>
 
<!-- popper.min.js 用于弹窗、提示、下拉菜单 -->
<script src="https://cdn.staticfile.org/popper.js/1.12.5/umd/popper.min.js"></script>
 
<!-- 最新的 Bootstrap4 核心 JavaScript 文件 -->
<script src="https://cdn.staticfile.org/twitter-bootstrap/4.1.0/js/bootstrap.min.js"></script>

<!-- 为了让 Bootstrap 开发的网站对移动设备友好，确保适当的绘制和触屏缩放，需要在网页的 head 之中添加 viewport meta 标签 -->
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
```

### Bootstrap的规范布局

- 响应式的网格系统：

  ![image-20190219110601789](https://ws1.sinaimg.cn/large/006tKfTcgy1g0bk0d80dfj30iu050aa0.jpg)

- 规则：
  - 网格每一行需要放在设置了 `.container` (固定宽度) 或 `.container-fluid` (全屏宽度) 类的容器中，这样就可以自动设置一些外边距与内边距。
  - 使用行来创建水平的列组。
  - 内容需要放置在列中，并且只有列可以是行的直接子节点。
  - 预定义的类如 **.row** 和 **.col-sm-4** 可用于快速制作网格布局。
  - 列通过填充创建列内容之间的间隙。 这个间隙是通过 **.rows** 类上的负边距设置第一行和最后一列的偏移。
  - **网格列是通过跨越指定的 12 个列来创建**。 例如，设置三个相等的列，需要使用用三个**.col-sm-4** 来设置。
  - Bootstrap 3 和 Bootstrap 4 最大的区别在于 Bootstrap 4 现在使用 flexbox（弹性盒子） 而不是浮动。 Flexbox 的一大优势是，没有指定宽度的网格列将自动设置为**等宽与等高列** 。 

- 针对不同屏幕大小的响应式设计：Bootstrap的网格布局是“**响应式**”的，之所以是响应式，就是针对不同的屏幕宽度的变化，可以设计不同的布局效果。这样子就可以很好的适应手机、平板、电脑设备。

  ```css
  /*默认的话就是等比例排列*/
  <div class="row">
    <div class="col">.col</div>
    <div class="col">.col</div>
    <div class="col">.col</div>
  </div>
  /* 格式为"col-*-*",第一个星号 (*) 表示响应的设备: sm, md, lg 或 xl, 第二个星号 (*) 表示一个数字, 同一行的数字相加为 12。在移动设备上（屏幕宽最小）就是堆叠排列 */
  <div class="row">
    <div class="col">.col</div>
    <div class="col">.col</div>
    <div class="col">.col</div>
  </div>
  /* 也可以使用 “offset-*-*” 的格式来确定偏移量 */
  ```

### Bootstrap的功能

首先我们需要知道的事，Bootstrap是一个模板，他已经为许多class写好了不错的CSS格式，所以我们需要做的就是按照他提供的格式，在需要的地方加入类的定义即可。

- 文字格式
- 链接格式
- 对表格也做了美化
- 对图片的操作
- 提示框感觉很fasion
- 一堆还不错的按钮
- 大家好我是只是为了漂亮用的“徽章”
- 可以做进度条
- 可以分页
- 一堆列表项
- 各种卡片
- 下拉菜单也有单独的类
- 可以折叠
- 导航栏也很方便，还可以折叠
- 各种输入框也有很好的样式
- 轮播
- 可以控制弹出框的形状
- 滚动监听

bootstrap的东西很多，我们需要根据应用积累，文档列举在下面了：

https://getbootstrap.com/docs/4.0/getting-started/introduction/

- **折叠导航栏**：要创建折叠导航栏，可以在按钮上添加 **class="navbar-toggler", data-toggle="collapse"** 与 **data-target="#thetarget"** 类。然后在设置了 **class="collapse navbar-collapse"** 类的 div 上包裹导航内容（链接）, div 元素上的 id 匹配按钮 data-target 的上指定的 id:

```html
<nav class="navbar navbar-expand-md bg-dark navbar-dark">
  <!-- 这是折叠的声明 -->
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <!-- 这是那个图标吧 -->
    <span class="navbar-toggler-icon"></span>
  </button>
 
  <!-- 导航栏的id要与data-target对应上 -->
  <div class="collapse navbar-collapse" id="collapsibleNavbar">
   <!-- 导航栏的内容 -->
</div> 
</nav>
```

## Font Awesome

本来以为是个什么特别厉害的东西，最后发现其实。。是一个图标的库，所以这里的除了链接什么也没有

http://www.runoob.com/font-awesome/fontawesome-tutorial.html