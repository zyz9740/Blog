# 我的Blog搭建之旅

[TOC]

## ===  2019.1.29  ===

### 配置

#### < python环境配置 >

1、conda create -n Blog python=3.6 创建一个新的环境

2、source activate Blog 激活虚拟环境

3、conda install Django 安装Django

4、进入PyCharm  =>  Preferences  =>  Project Interpreter  =>  右边的设置键 Add...  =>  conda  Environment  =>  选择/Anaconda3/envs/Blogs/bin/python3

- 一般在conda中创建的虚拟环境都在envs文件夹下



## ===  2019.1.30  ===

### 连接上MySQL

#### < 数据库基本操作 >

- 创建数据库以及数据库基本操作

  - 打开mysql以root登陆：mysql -u root -p
  - 创建数据库：create database Blog；
  - ls：show databases；
  - cd：use Blog；
  - ls：show tables；
  - 进去表内就是mysql语句了
  - 刷新设置：flush privilege;
  - 查看本用户权限：show grants;
  - 查看当前用户：show user（）；（记住必须加括号）

  剩下的操作就是看你Mysql学的啥样了，反正这里我先创建了一个数据库添了个数据进去，在使用命令行的过程中有两点需要注意：

  1. 别忘加分号；
  2. 所有的大写字母只是为了区分mysql命令和用户的具体数据（如数据库名称，列名称），在命令上不区分大小写，但是其他具体的名称是区分的。

- 创建用户并授权

  -  CREATE USER 'zyz9740'@'localhost' IDENTIFIED BY 'zyz22222';  试了许多就这条成功了，必须注意引号的使用
  - grant select, insert, update, delete on Blog.* to zyz9740@'localhost'; 将Blog数据库的所有权利授权给用户，也要注意引号。
  - 进入zyz9740的账户发现可以访问Blog数据库了

- 修改用户密码：

  - 首先需要知道的一个知识点是：我们的用户信息是在 mysql 数据库下的 user 表，这个表的属性有： User（注意大写），authentication_string（原来是password，据说是5.7之后改为这个了），还有一些其他的属性。

    ![image-20190130084242292](https://ws4.sinaimg.cn/large/006tNc79gy1fzobh7dk2bj30zb025glz.jpg)

  - 所以修改密码其实就是修改这个表里面的属性：update user set authentication_string=password("123456") where User = "testuser";

#### < 连接Django数据库 >

- 首先需要修改数据库连接的设置，我使用的mysql的数据库所以就这么用：

  ```python
  DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.mysql',
          'NAME':     'Blog',		#你所用的数据库，必须已经给了这个用户这个数据库的权限才行	
          'USER':     '*******',  #填你的用户名
          'PASSWORD': '********',	#填你的密码
          'HOST':     '127.0.0.1',#本机
          'PORT':     '3306',		#mysql数据库的通用端口
      }
  }
  ```

  为了保密你的密码和账户可以这样做：https://blog.csdn.net/lemontan123/article/details/81870430

  ```shell
  sudo vim ~/.bashrc
  # 在这个文件中添加环境变量并export
  export BLOG_PSWD=********* #注意等号前后不要有空格
  export BLOG_USER=zyz9740
  
  echo $BLOG_USER
  zyz9740
  ```

  

- 然后简单的conda install pymysql，需要安装这个

- 然后报错提示没有安装MySQL-python，所以需要安装这个，但是conda install里面没有，改这个用了一上午，我的报错跟他的一样所以我的解决方法参考这个了:https://blog.csdn.net/gaogaorimu/article/details/80903112

  报错：

  ```shell
  pip3 install mysqlclient
  Collecting mysqlclient
    Using cached https://files.pythonhosted.org/packages/ec/fd/83329b9d3e14f7344d1cb31f128e6dbba70c5975c9e57896815dbb1988ad/mysqlclient-1.3.13.tar.gz
      Complete output from command python setup.py egg_info:
      Traceback (most recent call last):
        File "<string>", line 1, in <module>
        File "/private/var/folders/w6/l9krf1yd1bb_0t3m5bhw_w500000gn/T/pip-build-5ytzox4k/mysqlclient/setup.py", line 18, in <module>
          metadata, options = get_config()
        File "/private/var/folders/w6/l9krf1yd1bb_0t3m5bhw_w500000gn/T/pip-build-5ytzox4k/mysqlclient/setup_posix.py", line 60, in get_config
          libraries = [dequote(i[2:]) for i in libs if i.startswith('-l')]
        File "/private/var/folders/w6/l9krf1yd1bb_0t3m5bhw_w500000gn/T/pip-build-5ytzox4k/mysqlclient/setup_posix.py", line 60, in <listcomp>
          libraries = [dequote(i[2:]) for i in libs if i.startswith('-l')]
        File "/private/var/folders/w6/l9krf1yd1bb_0t3m5bhw_w500000gn/T/pip-build-5ytzox4k/mysqlclient/setup_posix.py", line 13, in dequote
          raise Exception("Wrong MySQL configuration: maybe https://bugs.mysql.com/bug.php?id=86971 ?")
      Exception: Wrong MySQL configuration: maybe https://bugs.mysql.com/bug.php?id=86971 ?
   
      ----------------------------------------
  Command "python setup.py egg_info" failed with error code 1 in /private/var/folders/w6/l9krf1yd1bb_0t3m5bhw_w500000gn/T/pip-build-5ytzox4k/mysqlclient/
  
  ```

  解决方法：

  ```shell
  brew install mysql-connector-c
  
  # 修改前先备份 
  cp  mysql_config mysql_config_backup
  # 修改编辑权限
  chmod 777 mysql_config
  vi mysql_config
  # 修改114行
  > # Create options 
  > libs="-L$pkglibdir"
  > libs="$libs -l "
  # 修改为
  > # Create options 
  > libs="-L$pkglibdir"
  > libs="$libs -lmysqlclient -lssl -lcrypto"
  
  pip install mysqlclient
  ```

  这样子就将mysqlclient安装到我的虚拟环境Blog中去了（当然有的人可能有疑问就是为什么不安装MySQL-python，这个mysqlclient是给python3用的而且兼容python2.7用的这个MySQL-python）

- 然后又爆了这样一个错：

  ![image-20190130105935369](/Users/listener/Desktop/assets/image-20190130105935369.png)

  这个的原因就是你数据库账户密码搞错了，修改一下就好啦

- 然后还有这样一个错：

  ![image-20190130110127286](https://ws1.sinaimg.cn/large/006tNc79gy1fzofi1qtbbj30ov02odgb.jpg)

  这个是因为pymysql只安装了没有用，需要在setting.py前面添加这两句：

  ```python
  import pymysql
  
  pymysql.install_as_MySQLdb()
  ```

  然后终于migrate成功了！！！

  

- Django后台操作：
  - python3 manage.py runserver：启动服务器
  - python3 manage.py createsuperuser：创建一个用户
  - python3 manage.py migrate：同步数据库
  - 127.0.0.1:8000 访问Django后台
  - 127.0.0.1:8000/admin 访问用户后台

有几点需要注意：

1. 我的python是python3，所以所有的python命令都是python3开头的
2. 每次启动的时候需要source activate Blog启动虚拟环境（在终端的时候）

===================== 上午的工作到此结束，吃饭去了  ====================

EATING......

=====================  下午了！我又来了！ =============================

### 上传Git

- 将Blog传到自己的git上去：就按照git的官方指导来走一点问题也没有，我是参考的这个教程 https://blog.csdn.net/css_666/article/details/78105958 

  不过遇到了这个报错：git误区error: failed to push some refs to 'git@github.com:

  其实就是用README.md初始化掉了哈哈哈哈哈，参考这个：https://blog.csdn.net/uotail/article/details/80211897

### Django基本操作

============ 后面觉得这个教程太蠢了，所以换了一个，直接看官方教程了  ==============

https://docs.djangoproject.com/zh-hans/2.1/intro/tutorial01/

- conda uninstall django
- pip install django==2.0.2
- 按照这个方式修改报错：https://blog.csdn.net/qq_35304570/article/details/79674449 即可

#### < 创建项目 >

- django-admin startproject Blog：这样就新建了一个项目，项目的架构如下
  - 最外层的:file: mysite/ 根目录只是你项目的容器， Django 不关心它的名字，你可以将它重命名为任何你喜欢的名字。
  - `manage.py`: 一个让你用各种方式管理 Django 项目的命令行工具。你可以阅读 [django-admin and manage.py](https://docs.djangoproject.com/zh-hans/2.1/ref/django-admin/) 获取所有 `manage.py` 的细节。
  - 里面一层的 `mysite/` 目录包含你的项目，它是一个纯 Python 包。它的名字就是当你引用它内部任何东西时需要用到的 Python 包名。 (比如 `mysite.urls`).
  - `mysite/__init__.py`：一个空文件，告诉 Python 这个目录应该被认为是一个 Python 包。如果你是 Python 初学者，阅读官方文档中的 [更多关于包的知识](https://docs.python.org/3/tutorial/modules.html#tut-packages)。
  - `mysite/settings.py`：Django 项目的配置文件。如果你想知道这个文件是如何工作的，请查看 [Django settings](https://docs.djangoproject.com/zh-hans/2.1/topics/settings/) 了解细节。
  - `mysite/urls.py`：Django 项目的 URL 声明，就像你网站的“目录”。阅读 [URL调度器](https://docs.djangoproject.com/zh-hans/2.1/topics/http/urls/) 文档来获取更多关于 URL 的内容。
  - `mysite/wsgi.py`：作为你的项目的运行在 WSGI 兼容的Web服务器上的入口。阅读 [如何使用 WSGI 进行部署](https://docs.djangoproject.com/zh-hans/2.1/howto/deployment/wsgi/) 了解更多细节。

- python3 manage.py startapp blogpost：创建一个应用 
- 下面的东西用来记录官方文档中的“语录”来加深理解：

```
- 在 Django 中，每一个应用都是一个 Python 包
- 函数 include() 允许引用其它 URLconfs。每当 Django 遇到 :func：~django.urls.include 时，它会截断与此项匹配的 URL 的部分，并将剩余的字符串发送到 URLconf 以供进一步处理。(没看懂)
- 这个 migrate 命令检查 INSTALLED_APPS 设置，为其中的每个应用创建需要的数据表，至于具体会创建什么，这取决于你的 mysite/settings.py 设置文件和每个应用的数据库迁移文件（我们稍后会介绍这个）
- 关注一下文件头部的 INSTALLED_APPS 设置项。这里包括了会在你项目中启用的所有 Django 应用。应用能在多个项目中使用，你也可以打包并且发布应用，让别人使用它们。
- 通过运行 makemigrations 命令，Django 会检测你对模型文件的修改（在这种情况下，你已经取得了新的），并且把修改的部分储存为一次 迁移。
- 迁移是 Django 对于模型定义（也就是你的数据库结构）的变化的储存形式 - 没那么玄乎，它们其实也只是一些你磁盘上的文件。如果你想的话，你可以阅读一下你模型的迁移数据，它被储存在 polls/migrations/0001_initial.py 里。别担心，你不需要每次都阅读迁移文件，但是它们被设计成人类可读的形式，这是为了便于你手动修改它们。

```

#### < 创建视图 >

- 修改blogpost/views.py，添加视图，这个的主要功能感觉是response，在其中定义一个函数
- 修改blogpost/urls.py，将url关联到view上，添加对应函数的path
- 然后在urls.py中添加blogpost应用的url
- python3 manage.py runserver ：runserver的服务器只是用来开发的，不是用来应用的哦，他真的是一个服务器

#### < 连接数据库 >

- 按照上面的教程修改setting.py中的DATABASES
- 执行 python3 manage.py migrate

```
# migrate是做什么的？

这个 migrate 命令检查 INSTALLED_APPS 设置，为其中的每个应用创建需要的数据表，至于具体会创建什么，这取决于你的 mysite/settings.py 设置文件和每个应用的数据库迁移文件（我们稍后会介绍这个）。这个命令所执行的每个迁移操作都会在终端中显示出来。如果你感兴趣的话，运行你数据库的命令行工具，并输入 \dt (PostgreSQL)， SHOW TABLES; (MySQL)， .schema (SQLite)或者 SELECT TABLE_NAME FROM USER_TABLES; (Oracle) 来看看 Django 到底创建了哪些表。
```

#### < 创建模型 >

- 修改blogpost/model.py 添加类
- 修改setting.py中的INSTALLED_APP，添加新加入的model

- python3 manage.py makemigrations blogpost：为模型的改变生成迁移文件。
- python3 manage.py migrate：实现数据库迁移，也就是将刚才的模型的改变同步到数据库上

```
# 什么是迁移？

通过运行 makemigrations 命令，Django 会检测你对模型文件的修改（在这种情况下，你已经取得了新的），并且把修改的部分储存为一次 迁移。

迁移是 Django 对于模型定义（也就是你的数据库结构）的变化的储存形式 - 没那么玄乎，它们其实也只是一些你磁盘上的文件。如果你想的话，你可以阅读一下你模型的迁移数据，它被储存在 polls/migrations/0001_initial.py 里。别担心，你不需要每次都阅读迁移文件，但是它们被设计成人类可读的形式，这是为了便于你手动修改它们。
```

```
# 构建模型需要几步？
改变模型需要这三步：
1. 编辑 models.py 文件，改变模型。
2. 运行 python manage.py makemigrations 为模型的改变生成迁移文件。
3. 运行 python manage.py migrate 来应用数据库迁移。
数据库迁移被分解成生成和应用两个命令是为了让你能够在代码控制系统上提交迁移数据并使其能在多个应用里使用；这不仅仅会让开发更加简单，也给别的开发者和生产环境中的使用带来方便。
```

####< 管理页面 >

- 创建管理员账号：python3 manage.py createsuperuser
- 加入blogpost应用：编辑blogpost/admin
- 在这个页面中可以管理和编辑对象，这些页面都是根据你的在models.py中写的对象生成的，非常智能对吧。



别忘了你有些代码还没打

==============  今天到这里了，困了，明天再学  ==================

==================  git push  ==============

## ===  2019.1.31  ===

### 模板与视图

```
# 什么是视图
Django 中的视图的概念是「一类具有相同功能和模板的"网页"的集合」。
每个视图必须要做的只有两件事：返回一个包含被请求页面内容的 HttpResponse 对象，或者抛出一个异常，比如 Http404 。至于你还想干些什么，随便你。
你的视图可以从数据库里读取记录，可以使用一个模板引擎（比如 Django 自带的，或者其他第三方的），可以生成一个 PDF 文件，可以输出一个 XML，创建一个 ZIP 文件，你可以做任何你想做的事，使用任何你想用的 Python 库。
Django 只要求返回的是一个 HttpResponse ，或者抛出一个异常。
```

#### < 模板 >

```
你项目的 TEMPLATES 配置项描述了 Django 如何载入和渲染模板。默认的设置文件设置了 DjangoTemplates 后端，并将 APP_DIRS 设置成了 True。这一选项将会让 DjangoTemplates 在每个 INSTALLED_APPS 文件夹中寻找 "templates" 子目录。这就是为什么尽管我们没有像在第二部分中那样修改 DIRS 设置，Django 也能正确找到 polls 的模板位置的原因。
```

- 模板的位置是blogpost/template/blogpost/index.html，在这里写的是html文件的前端代码
- 调用模板的过程是在views.py中写的，创建完上下文context之后，通过render（）函数载入模板，填充上下文，再返回由它生成的 [`HttpResponse`](https://docs.djangoproject.com/zh-hans/2.1/ref/request-response/#django.http.HttpResponse) 对象

```
The render() function takes the request object as its first argument, a template name as its second argument and a dictionary as its optional third argument. It returns an HttpResponse object of the given template rendered with the given context.
```

#### < 404处理 >

- 利用一个快捷函数来处理404问题：

  ```
  The [`get_object_or_404()`] function takes a Django model as its first argument and an arbitrary number of keyword arguments, which it passes to the [`get()`]function of the model's manager. It raises [`Http404`] if the object doesn't exist.
  
  他等价于：
  try:
      question = Question.objects.get(pk=question_id)
  except Question.DoesNotExist:
       raise Http404("Question does not exist lalala")
  ```

  

#### < url的设置 >

- 利用“url” 标示符在html里进行与blogpost/urls中的连接
- 利用app_name进行命名空间的区别

#### < 通用视图 >

```
# 什么是通用视图

Web 开发中的一个常见情况：根据 URL 中的参数从数据库中获取数据、载入模板文件然后返回渲染后的模板。 由于这种情况特别常见，Django 提供一种快捷方式，叫做“通用视图”系统。

通用视图将常见的模式抽象化，可以使你在编写应用时甚至不需要编写Python代码。
```

- 模板：

  默认情况下，通用视图 DetailView使用一个叫做 `<app name>/<model name>_detail.html` 的模板。在我们的例子中，它将使用 `"polls/question_detail.html"` 模板。`template_name` 属性是用来告诉 Django 使用一个指定的模板名字，而不是自动生成的默认名字。 

- 参数

  对于 `DetailView` ， `question` 变量会自动提供—— 因为我们使用 Django 的模型 (Question)， Django 能够为 context 变量决定一个合适的名字。然而对于 ListView， 自动生成的 context 变量是 `question_list`。为了覆盖这个行为，我们提供 `context_object_name` 属性，表示我们想使用 `latest_question_list`。作为一种替换方案，你可以改变你的模板来匹配新的 context 变量 —— 这是一种更便捷的方法，告诉 Django 使用你想使用的变量名。



### Django的运行模式

```
个人对模板、视图、对象的粗略认识：

1. 对象是在models.py中定义的，在Django里通常被叫做“模型（model）”，定义了一些成员的类型，是储存在数据库中的，作为后端的部分。
2. 前端的部分被“模板（template）”所构造，这就是一个放在template文件下的html文件。他接受从“视图”中传递过来的对象并利用对象进行展示。
3. 所谓的“视图（views.py）”的作用就是向“模板”中传递“模型/对象”以及进行错误处理的一个“中间层”
4. urls.py将url与对应的“视图”连接起来，让用户在访问的时候通过url访问“视图”来获取“模板”的response返回值

```

![未命名文件 (https://ws3.sinaimg.cn/large/006tNc79gy1fzpq8yrqlwj30rj0rn77k.jpg)](/Users/listener/Downloads/未命名文件 (2).png)

### 自动化测试

```
真正不同的地方在于，自动化 测试是由某个系统帮你自动完成的。当你创建好了一系列测试，每次修改应用代码后，就可以自动检查出修改后的代码是否还像你曾经预期的那样正常工作。你不需要花费大量时间来进行手动测试。
```

#### < 为什么要写测试 >

- 因为要不然稍微改一改代码就出了问题你也不知道，也不知道出在哪里
- “其他的开发者希望在正式使用你的代码前看到它通过了测试，这是你需要写测试的另一个重要原因。”
- “测试驱动开发”：他们在写代码之前先写测试。这种方法看起来有点反直觉，但事实上，这和大多数人日常的做法是相吻合的。我们会先描述一个问题，然后写代码来解决它。
- 测试就是为了查bug，预防所有可能出现的bug

#### < 如何测试 >

- 我们需要在blogpost/test.py中编写测试代码，测试的代码继承TestCase类
- python3 manage.py test blogpost：进行测试

- 运行的原理：

  - `python manage.py test polls` 将会寻找 `polls` 应用里的测试代码
  - 它找到了 [`django.test.TestCase`](https://docs.djangoproject.com/zh-hans/2.1/topics/testing/tools/#django.test.TestCase) 的一个子类
  - 它创建一个特殊的数据库供测试使用
  - 它在类中寻找测试方法——以 `test` 开头的方法。
  - 在 `test_was_published_recently_with_future_question` 方法中，它创建了一个 `pub_date` 值为 30 天后的 `Question` 实例。
  - 接着使用 `assertls()` 方法，发现 `was_published_recently()` 返回了 `True`，而我们期望它返回 `False`。

  测试系统通知我们哪些测试样例失败了，和造成测试失败的代码所在的行号。

报错如下：

```shell
Creating test database for alias 'default'...
Got an error creating the test database: (1044, "Access denied for user 'zyz9740'@'localhost' to database 'test_blog'")
```

分析发现是因为他不能用这个用户创建数据库，应该是我们之间只给了这个用户Blog数据库的所有权限，但是不能新建，所以我们需要给他创建数据库的权限。但是后来发现其他的权限也需要，所以直接进root把所有的权限都给他吧：

```mysql
mysql> grant all on *.* to zyz9740@localhost;
```

然后就可以正常运行了

#### < 修复bug >

- 一般来说我们就添加if条件判断就好，或者对于model来说我们利用filter方法过滤掉不合适的model即可

#### < 针对视图的测试 >

- 我们前面针对model创建了一个Test类用来测试model的运行情况，我们也需要为每一个“视图”来创建Test类来模拟用户在该视图下的输入情况。client.get就是用来模拟用户的操作的，就是输入网址
- 实际的测试函数可能有很多很多，按照需求慢慢积累吧，反正都是assert开头的

#### < 测试more >

```
当需要测试的时候，测试用例越多越好¶
貌似我们的测试多的快要失去控制了。按照这样发展下去，测试代码就要变得比应用的实际代码还要多了。而且测试代码大多都是重复且不优雅的，特别是在和业务代码比起来的时候，这种感觉更加明显。

但是这没关系！ 就让测试代码继续肆意增长吧。大部分情况下，你写完一个测试之后就可以忘掉它了。在你继续开发的过程中，它会一直默默无闻地为你做贡献的。

但有时测试也需要更新。想象一下如果我们修改了视图，只显示有选项的那些投票，那么只前写的很多测试就都会失败。但这也明确地告诉了我们哪些测试需要被更新，所以测试也会测试自己。

最坏的情况是，当你继续开发的时候，发现之前的一些测试现在看来是多余的。但是这也不是什么问题，多做些测试也 不错。

如果你对测试有个整体规划，那么它们就几乎不会变得混乱。下面有几条好的建议：

对于每个模型和视图都建立单独的 TestClass
每个测试方法只测试一个功能
给每个测试方法起个能描述其功能的名字
```

- 在上述的测试中，我们已经从代码逻辑和视图响应的角度检查了应用的输出，现在你可以从一个更加 "in-browser" 的角度来检查最终渲染出的 HTML 是否符合预期，使用 Selenium 可以很轻松的完成这件事。这个工具不仅可以测试 Django 框架里的代码，还可以检查其他部分，比如说你的 JavaScript。它假装成是一个正在和你站点进行交互的浏览器，就好像有个真人在访问网站一样！Django 它提供了 [`LiveServerTestCase`](https://docs.djangoproject.com/zh-hans/2.1/topics/testing/tools/#django.test.LiveServerTestCase) 来和 Selenium 这样的工具进行交互。
- 在每次提交代码时自动运行测试，也就是我们所说的持续集成[continuous integration](https://en.wikipedia.org/wiki/Continuous_integration) ，这样就能实现质量控制的自动化

### ？

#### < >

- 静态文件：除了服务端生成的 HTML 以外，网络应用通常需要一些额外的文件——比如图片，脚本和样式表——来帮助渲染网络页面。在 Django 中，我们把这些文件统称为“静态文件”。