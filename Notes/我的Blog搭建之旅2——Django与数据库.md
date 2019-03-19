# 我的Blog搭建之旅2——Django与数据库

[TOC]

## === 2019.2.1 ===

写完一点代码回来再看

###  MVC & MTV

- MVC：Models、Views and Controler

  - Models负责与数据库交流，将必要的信息保存到数据库中
  - Views负责网页前端的展示
  - Controler负责根据用户的操作访问“模型”，然后返回相应的“视图”给用户，是联系Views和Models的纽带 

  

  ![2012032011584641](https://ws3.sinaimg.cn/large/006tNc79gy1fzqnthwb9rj30hs06pweu.jpg)

  

  

- MTV：Django的模式 ，Models，Views & Templates

  - Models跟上面的功能相同，用来与数据库交流
  - Templates储存模版，就是前端的html文件
  - Views负责接收用户的请求，访问Models，并填充Templates返回给用户

- 两者的不同：

  - 感觉上像是Django将MVC中的视图进一步分解为 Django视图 和 Django模板两个部分，分别决定 “展现哪些数据” 和 “如何展现”，使得Django的模板可以根据需要随时替换，而不仅仅限制于内置的模板。
  - 至于MVC控制器部分，由Django框架的URLconf来实现

### 模型 （Models）

- 众所周知，在app/models.py下修改
- 模型定义了之后需要在setting.py下的INSTALLED_APP中注册
- 以下内容参考：https://docs.djangoproject.com/zh-hans/2.1/topics/db/models/

#### < 模型与数据库 >

- 每一个模型都映射一个数据库表，保存在数据库中；同时每一个模型都是一个python的类，继承自django.db.models.Model。所以，每一个**类**都作为一个**table**保存在数据库中，每一个**类的成员**都作为**属性** 保存在table中。

  我的一个model的定义：

  ```python
  class Question(models.Model):
      # CharField 需要一个 max_length 参数。这个参数的用处不止于用来定义数据库结构，也用于验证数据
      question_text = models.CharField(max_length=200)
  
      pub_date = models.DateTimeField('date published')
  
      # __str__ 方法的作用是美化打印出来的结果，就是print的时候不会返回一个类似于"<__main__.Test object at 0x1387B8>"的东西
      def __str__(self):
          return self.question_text
  
      def was_published_recently(self):
          # 如果问题创建的时间在现在的时间减去一天之后，就算最近创建（有bug）
          # return self.pub_date >= timezone.now() - datetime.timedelta(days=1)
          # 问题创建的时间需要满足（一天之前，现在）
          now = timezone.now()
          return now - datetime.timedelta(days=1) <= self.pub_date <= now
  ```

  运行migrate的时候会按照如下语法创建一个表：

  ```mysql
  CREATE TABLE blogpost_question (
      "id" serial NOT NULL PRIMARY KEY,
      "question_text" varchar(200) NOT NULL,
      "pub_data" datetime NOT NULL
  );
  # 表的名字一般是“应用名”_“类名”
  ```

  同时我有这个类的一个实例，所以，在数据库中：

  ```mysql
  mysql> select * from blogpost_question; # 这就是放这个model的一个table的名字
  +----+---------------+----------------------------+
  | id | question_text | pub_date                   |
  +----+---------------+----------------------------+
  |  1 | What's up?    | 2019-01-30 13:05:38.320765 |
  +----+---------------+----------------------------+
  1 row in set (0.03 sec)
  
  ```

  在后台管理页面中：

  ![image-20190201095941815](https://ws2.sinaimg.cn/large/006tNc79gy1fzqoxyxuk1j30hn03c3yh.jpg)

#### < makemigration & migrate >

- 先提纲挈领的说，makemigration是将models.py中的改动记录到migrations.py中，但是不更新数据库；migrate是*迁移*，将Model的改动保存到数据库中。所以我们修改Model的时候需要先makemigration保存修改，然后再migrate执行修改。

#### < 字段 > 

- 字段指每个类的成员的“类型”，对应于数据库中的属性的类型，常用的字段有如下几种：

  - **CharField**：字符串字段，有一个额外的必需参数： maxlength ，它是字段的最大长度（字符数）
  - **DateField**、**DateTimeField**：日期字段、日期时间字段
  - **FloatField** ：浮点数，必须参数 
    - max_digits ：数字中允许的最大的数字位数
    - decimal_places ：数字的小数位数
  - **IntegerField**： 整数
  - **TextField** ：不限长度的文字长度
  - **BinaryField**：bool类型
  - **EmailField**：邮件类型，需要添加max_length
  - **ImageField**：图片类型

- 也可以自定义字段类型，更详细的字段参考 https://docs.djangoproject.com/en/2.1/ref/models/fields/

- 用于所有字段的可选选项

  - null：默认值设置为NULL，默认为False

  - blank：是否允许为空，默认False

  - choices：可选的值，使用方法如下：

    ```python
    class Person(models.Model):
        SHIRT_SIZES = (
            ('S', 'Small'),
            ('M', 'Medium'),
            ('L', 'Large'),
        )
        name = models.CharField(max_length=60)
        shirt_size = models.CharField(max_length=1, choices=SHIRT_SIZES)
    ```

    每个二元组的第一个值会储存在数据库中，而第二个值将只会用于显示作用。对于一个模型实例，要获取该字段二元组中相对应的第二个值，使用 [`get_FOO_display()`](https://docs.djangoproject.com/zh-hans/2.1/ref/models/instances/#django.db.models.Model.get_FOO_display) 方法。

  - default：默认值

  - primary_key：是否为主键，如果没有的话会自动设置主键id

  - unique：数据库类似功能

  - help_txt：声称文档的时候有用

- ……后面的暂时没看

#### < 模型的方法 >

- 就是给自己的模型定义一个函数吧。。。因为没有学过python的类所以不是特别的理解
- \_\_str\_\_( )方法就是在需要显示为纯字符的时候使用的情况，前面在显示后台字段的时候使用过。

#### < 关联关系 >

- Many-to-many：多对多

  - eg：一个学生可以选很多节课，一门课也可以有很多学生来选。
  - 字段为models.ManyToManyField

- Many-to-one：就是普通的Foreign Key约束

  - eg：比如 学生所在的班级 ==> 班级的序号，多个学生可以在一个班级，班级的序号就是学生的一个外键。

  - 字段就设置为models.ForeignKey类，比如之前的例子就是这样子的：

    ```python
    class Choice(models.Model):
    	question = models.ForeignKey(
            Question, 
            on_delete=models.CASCADE
        )
    ```

    

- One-to-one：一对一

  - 字段为OneToOneField

#### < Meta >

在使用framework的时候突然看到的有Meta类，这个类内的Meta类表示 **元信息**，就是表示这个所属类的一些特征。比如下面这个例子

```python
class Snippet(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    code = models.TextField()
   
    class Meta:
        ordering = ('created',)
```

这个的意思就是Snippet类返回的时候将会以created的升序返回，更多的可以参考：https://docs.djangoproject.com/zh-hans/2.1/ref/models/options/

### 模型的API

我们使用的示例模型如下：

```python
class BabyInfo(models.Model):
    name = models.CharField(max_length=30)
    sex = models.BinaryField()
    age = models.IntegerField()

    def __str__(self):
        return self.name
```

#### < 基本操作>

感觉好像所有的过程都是在shell中进行的诶。。

- 查：

```python
#这里取出来了babyinfo表中的所有列，数据类型为QuerySet，更详细的讲解见下
babys = models.BabyInfo.iobjects.all()
# select操作使用get与filter
baby1 = babys.get(pk=1)
# 投影操作使用values
babynames = babys.values('name')
```

- 填：

  ```python
  #调用创建函数
  models.BabyInfo.objects.create(name='zyz',sex=0,age=21)
  #或者直接实例话
  models.BabyInfo(name='zyz',sex=0,age=21)
  #如果太长的话可以这样子
  baby1 = {'name':'zyz','sex':0,'age':12}
  model.BabyInfo.objects.create(**baby1)
  #当你创建完之后必须save才可以执行插入操作 INSERT INTO
  baby1.save()
  ```

- 删：

  ```python
  # 使用delete()方法删除
  >>> babyzyz = babys.filter(name='zyz')
  >>> babyzyz
  <QuerySet [<BabyInfo: zyz man 12>, <BabyInfo: zyz 男 12>]>
  >>> babyzyz.delete()
  (2, {'server.BabyInfo': 2})
  >>> babyzyz
  <QuerySet []>
  # 需要注意的是，即使你在提取出来的对象上删除，也会直接进行数据库上的操作，删除需谨慎！！
  # 如果你要删除全部的话，必须使用QuerySet而不是Manager，这是为了防止误删
  >>> BabyInfo.objects.delete()
  Traceback (most recent call last):
    File "<console>", line 1, in <module>
  AttributeError: 'Manager' object has no attribute 'delete'
  >>> BabyInfo.objects.all().delete()
  (6, {'server.BabyInfo': 6})
  ```

- 改：

  ```python
  # 使用update方法
  >>> babys
  <QuerySet [<BabyInfo: zyz 男 12>]>
  # 直接赋值是没有用的
  >>> babys[0].age = 21
  >>> babys
  <QuerySet [<BabyInfo: zyz 男 12>]>
  # 必须对QuerySet对象进行操作而不是BabyInfo对象
  >>> babys[0].update(age = 21)
  Traceback (most recent call last):
    File "<console>", line 1, in <module>
  AttributeError: 'BabyInfo' object has no attribute 'update'
  # get返回的是实际对象而不是QuerySet
  >>> babys.get(pk=1).update(age = 21)
  Traceback (most recent call last):
    File "<console>", line 1, in <module>
  AttributeError: 'BabyInfo' object has no attribute 'update'
  # filter返回QuerySet
  >>> babys.filter(pk=1).update(age = 21)
  1
  >>> babys
  <QuerySet [<BabyInfo: zyz 男 21>]>
  # 赋值对一个实际对象是有用的，要记得save
  >>> baby1 = babys.get(pk=1)
  >>> baby1.age = 12
  >>> baby1.save()
  >>> babys
  <QuerySet [<BabyInfo: zyz 男 12>]>
  
  ```

  



=============  下班啦，下午不来上班了有空就接着写吧  ==============

#### < 模型流程 >

1. 在models.py中创建一个model（就是一个类）
2. 在admin.py中注册方便后台管理页面管理，这样可以在admin/界面查看
3. 执行makemigrations和migrate同步数据库
4. 

#### < 中文支持问题 >

在增加数据的时候遇到了这样一个问题：

```
django.db.utils.OperationalError: (1366, "Incorrect string value: '\\xE9\\x9A\\xBE' for column 'sex' at row 1")
```

这个表明数据的编码不是utf-8，我们需要进入数据库加入这么一句就可以解决了

```mysql
alter table Blog.server_babyinfo convert to character set utf8
```

可是每次创建表格都要修改的话十分麻烦，目前还没有找到创建数据库的时候就修改编码方式的办法

### 数据库查询

#### < QuerySet & Manager >

- 基本方法
  - filter，exclude
  - 连续过滤
  - get方法
  - 索引与切片（毕竟是python）

```python
# 首先我们获取一个QuerySet
>>> from server.models import BabyInfo
>>> babys = BabyInfo.objects.all()
# select操作
>>> babys.filter(age=12)
<QuerySet [<BabyInfo: zyz man 12>, <BabyInfo: zyz 男 12>, <BabyInfo: 张云哲 男 12>, <BabyInw 男 12>, <BabyInfo: 12 男 12>]>
# 反选
>>> babys.exclude(age=12)
<QuerySet [<BabyInfo: 张云哲 男 21>, <BabyInfo: 啦啦 男 1>, <BabyInfo: www 男 23>]>
# 可以连续过滤，因为filter总是返回一个QuerySet对象;如果不存在就返回空对象
>>> babys.exclude(age=12).filter(name='张云哲')
<QuerySet [<BabyInfo: 张云哲 男 21>]>
>>> babys.exclude(age=12).filter(name='zyz')
<QuerySet []>
# 如果你只想找一个对象而不是一个QuerySet，那你直接使用get方法就可以了
>>> baby1 = babys.get(pk=1)
>>> baby1
<BabyInfo: zyz man 12>
>>> type(baby1)
<class 'server.models.BabyInfo'>
# 但有0个或多个对象符合条件，就会直接报错；所以尽量用主键查找
>>> babys.get(name='baibai')
Traceback (most recent call last):
  File "<console>", line 1, in <module>
  File "/anaconda3/envs/Blog/lib/python3.6/site-packages/django/db/models/query.py", line 403, in get
    self.model._meta.object_name
server.models.DoesNotExist: BabyInfo matching query does not exist.
>>> babys.get(name='zyz')
Traceback (most recent call last):
  File "<console>", line 1, in <module>
  File "/anaconda3/envs/Blog/lib/python3.6/site-packages/django/db/models/query.py", line 407, in get
    (self.model._meta.object_name, num)
server.models.MultipleObjectsReturned: get() returned more than one BabyInfo -- it returned 2!
# QuerySet对象支持索引和切片
>>> babys[0]
<BabyInfo: zyz man 12>
>>> babys[:3]
<QuerySet [<BabyInfo: zyz man 12>, <BabyInfo: 张云哲 男 21>, <BabyInfo: zyz 男 12>]>
>>> babys[1:5:2]
[<BabyInfo: 张云哲 男 21>, <BabyInfo: 张云哲 男 12>]
```

#### < 字段查找 >

- filter、get的参数当然不仅限于相等，我们可以使用python的函数机制来进行类似于Mysql中的WHERE运算，基本查找关键字参数采用格式`field__lookuptype=value`，注意这里是下划线

```
Python能够定义接受任意名称 - 值参数的函数，这些参数的名称和值在运行时进行计算。有关更多信息，请参阅官方Python教程中的关键字参数。
```

- 常用的lookuptype：

  | 名称                     | 作用                        | 注释                                                         |
  | ------------------------ | --------------------------- | ------------------------------------------------------------ |
  | exact                    | 准确的等于，等价于 =        | 等价于SQL语句：SELECT ... WHERE filed = ...<br />更准确的来说，普通的=语句就暗示了使用exact |
  | iexact                   | 不区分大小写的等于          | 以后所有的type加上前缀i都是不区分大小写，不再区分            |
  | contains                 | 包含关系                    | 等价于SQL：SELECT ... WHERE filed LIKE '%...%';              |
  | startwith,<br />endwiths | 以……开头/结尾               |                                                              |
  | gt/lt/gte/lte            | 大于/小于/大于等于/小于等于 | gt：greater than<br />lt：less than<br />e：equa             |
  | date/year/month          | 针对Date格式                |                                                              |
  | isnull                   | 为空                        |                                                              |
  | regex                    | 正则表达式                  | 使用例子：<br />Entry.objects.get(title__regex=r'^(An?       |

  

## == 2019.2.18 ==

### Rest-Framework

- RestFramework是做什么的？

  RestFramework是一个能快速为我们提供API接口，方便我们编程的框架。API是后端编程人员写的，为了让前端拿数据的一个接口，通常就是以url的形式存

#### < REST >

这个博客写的很有意思：https://zhuanlan.zhihu.com/p/30396391?group_id=937244108725641216

简单来说，REST就是将你本来看完可能不太知道是干啥的url转换为你一下就能看清楚的url：**“URL定位资源，用HTTP动词（GET,POST,DELETE,DETC）描述操作。”**

```
混乱的url										REST风格
GET /rest/api/getDogs 				--> 	GET /rest/api/dogs 获取所有小狗狗 
GET /rest/api/addDogs 				--> 	POST /rest/api/dogs 添加一个小狗狗 
GET /rest/api/editDogs/:dog_id 		--> 	PUT /rest/api/dogs/:dog_id 修改一个小狗狗 
GET /rest/api/deleteDogs/:dog_id 	--> 	DELETE /rest/api/dogs/:dog_id 删除一个小狗狗
```

#### < 特点 >

- 只通过http协议的请求类型进行请求
- 面向资源
- 数据通信通过json或者xml

## REST框架学习

首先进行基础的项目构建，建立模型

### 序列化

####  < Serializer类 >

- 首先创建模型对应的Serializer类，一个基本的Serializer类的结构如下，它包括序列化的成员（与Model对应），create方法用来执行save的创建工作和update方法用来执行save的更新操作。

  ```python
  from rest_framework import serializers
  from .models import Snippet
  
  # 继承serializers.Serializer类
  class SnippetSerializer(serializers.Serializer):
      """
      类的成员，与model相对应
      """
  	id = serializers.IntegerField(read_only=True)
      title = serializers.CharField(required=False, allow_blank=True, max_length=100)
      code = serializers.CharField(style={'base_template': 'textarea.html'})
      linenos = serializers.BooleanField(required=False)
      language = serializers.ChoiceField(choices=LANGUAGE_CHOICES, default='python')
      style = serializers.ChoiceField(choices=STYLE_CHOICES, default='friendly')
  
      def create(self, validated_data):
          """
          Create and return a new `Snippet` instance, given the validated data.
          """
          return Snippet.objects.create(**validated_data)
  
      def update(self, instance, validated_data):
          """
          Update and return an existing `Snippet` instance, given the validated data.
          """
          instance.title = validated_data.get('title', instance.title)
          instance.code = validated_data.get('code', instance.code)
          instance.linenos = validated_data.get('linenos', instance.linenos)
          instance.language = validated_data.get('language', instance.language)
          instance.style = validated_data.get('style', instance.style)
          instance.save()
          return instance
  ```

- 我们也可以利用ModelSerializer类来减少冗余代码

```python
class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = ('id', 'title', 'code', 'linenos', 'language', 'style'
```

- 重要的是要记住`ModelSerializer`类没有做任何特别神奇的事情，它们只是创建序列化器类的快捷方式：
  - 自动确定的字段集。
  - `create()`和`update()`方法的简单默认实现。

#### < 序列化与反序列化 >

- JSONReander.render(serializer.data)：由对象构造JSON
- JSONParser().parse(stream)：由比特流解析对象

```python
#创建一个Model
snippet = Snippet(code='print "hello, world"\n')
snippet.save()

#序列化这个model，产生一个序列化的结果，这里是一个字典
serializer = SnippetSerializer(snippet)
serializer.data
# >> {'id': 2, 'title': u'', 'code': u'print "hello, world"\n', 'linenos': False, 'language': u'python', 'style': u'friendly'}

#将这个model序列化产生的字典变为JSON格式
content = JSONRenderer().render(serializer.data)
content
# '{"id": 2, "title": "", "code": "print \\"hello, world\\"\\n", "linenos": false, "language": "python", "style": "friendly"}'

#将JSON变为数据流后，解析JSON为python的字典
import io
stream = io.BytesIO(content)
data = JSONParser().parse(stream)

#将字典重新转换为Serializer类，直接保存即可
serializer = SnippetSerializer(data=data)
serializer.is_valid()
# True
serializer.validated_data
# OrderedDict([('title', ''), ('code', 'print "hello, world"\n'), ('linenos', False), ('language', 'python'), ('style', 'friendly')])
serializer.save()
# <Snippet: Snippet object>
```

#### < 使用Serializer类编写views.py >

- 使用选择分支区分request方法来进行不同的操作：查填删改分别为**GET POST DELETE PUT**
- 通过serializer来包装model然后返回JSONResponse

```python
@csrf_exempt
def snippet_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        snippet = Snippet.objects.get(pk=pk)
    except Snippet.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = SnippetSerializer(snippet)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = SnippetSerializer(snippet, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        snippet.delete()
        return HttpResponse(status=204)
```

### Request & Response

这里的内容是views（视图）里面会学到的，在这里补充一下：

- 视图的作用是什么呢？

  Django会传递给每一个view一个HttpRequest类型的request请求，视图的结果是返回一个HttpResponse类型的response响应。我们需要的就是解析request，构造response。

- 构造views.py的方法：

  - 基于class的方法：继承APIView，将get、post等方法写作函数作为类的方法。在urlpattern中调用as_view方法来索引到这个class上
  - 基于函数的方法：利用 **@api_view(['GET','POST']）** 装饰器来修饰这个函数，在函数中使用选择分支来区分Http请求类型

  这两种方法都会使后端页面变为Drf的API界面

#### < HttpRequest >

常用的属性：

- request.method：request使用的Http方法，返回一个字符串
- request.POST：request使用的POST方法中包含的数据，返回一个QueryDict类型的字典包含数据
  - QueryDict的使用

#### < HttpResponse >

我们要学会的是如何构造一个Response，通常我们构造responese的方法有很多种

比如：

- 利用generic通用模板返回一个html网页

- 利用render渲染一个模板中的网页
- 直接使用HttpResponse构造

这些方法会在后来补充，下面只补充一些直接使用Http构造的方法：

- 使用HttpResponse的构造函数：比如上面的使用，并返回响应码
- 使用HttpResponse的子类：
- 使用JSONResponse：直接使用第一个参数来构造一个JSON返回值，其余可以在后面附加属性

所有的参考来自于：https://docs.djangoproject.com/zh-hans/2.1/ref/request-response/#django.http.HttpRequest 慢慢看

### 对视图的改进

最初始的视图应该是使用 @api_view修饰器的一个个函数，像这样：

```python
@api_view(['GET', 'POST'])
def snippet_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        snippets = Snippet.objects.all()
        serializer = SnippetSerializer(snippets, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SnippetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```



Drf提出了三种方法来简化代码，或者说使代码更有条理性：

#### < 继承APIView类 >

- 基于class的方法：用class继承APIView，将Http方法写为函数：

```python
class SnippetList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        snippets = Snippet.objects.all()
        serializer = SnippetSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = SnippetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
urlpatterns = [
    path('snippets/', views.SnippetList.as_view()),
]
```

#### < 使用minix >

- 使用mixns：这个就是为了不让我们写重复代码而封装好的类，我们需要做的事情就只剩下了两件：

  - 指定这个视图与哪个model绑定，用什么serializer
  - 将类的方法与Http的方法对应

  ```python
  from rest_framework import mixins
  from rest_framework import generics
  
  class SnippetList(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    generics.GenericAPIView):
      # 指定这个视图与哪个model绑定，用什么serializer
      queryset = Snippet.objects.all()
      serializer_class = SnippetSerializer
  
      # 将类的方法(list,create)与Http的方法(get,post)对应	
      def get(self, request, *args, **kwargs):
          return self.list(request, *args, **kwargs)
  
      def post(self, request, *args, **kwargs):
          return self.create(request, *args, **kwargs)
  ```

  #### < 混合式的通用视图 >

- 通用视图：所谓的通用视图，就是再给你省略一步。不需要你绑定方法，只需要你告诉是什么model和serializer就行了

  ```python
  from rest_framework import generics
  
  # 这里用的就是ListCreateAPIView
  class SnippetList(generics.ListCreateAPIView):
      queryset = Snippet.objects.all()
      serializer_class = SnippetSerializer
  
  ```

  我们可以看到源代码是这样的：

  ```python
  class ListCreateAPIView(mixins.ListModelMixin,
                          mixins.CreateModelMixin,
                          GenericAPIView):
      """
      Concrete view for listing a queryset or creating a model instance.
      """
      def get(self, request, *args, **kwargs):
          return self.list(request, *args, **kwargs)
  
      def post(self, request, *args, **kwargs):
          return self.create(request, *args, **kwargs)
  ```

这样下来就非常干净了

### 用户权限

#### 

- reverse：在urls.py中加入名字，reverse可以通过名字反向查找url

#### < 配置分页 >

#### < 配置api根目录 >

#### < viewSet和Router >

#### <>

#### <>

