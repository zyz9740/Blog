## 我的Blog搭建之旅

=====================  2019.1.29  ===================

一、配置

1、conda create -n Blog python=3.6 创建一个新的环境

2、source activate Blog 激活虚拟环境

3、conda install Django 安装Django

4、进入PyCharm  =>  Preferences  =>  Project Interpreter  =>  右边的设置键 Add...  =>  conda  Environment  =>  选择/Anaconda3/envs/Blogs/bin/python3

###### 一般在conda中创建的虚拟环境都在envs文件夹下

二、

1. django-admin startproject Blog 首先开启服务器



=====================  2019.1.30  =====================

三、我们需要连接上本机的MySQL数据库

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

- 连接Django数据库：

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

=====================  下午了！我又来了！ =============================

- 将Blog传到自己的git上去：就按照git的官方指导来走一点问题也没有，我是参考的这个教程 https://blog.csdn.net/css_666/article/details/78105958 

  不过遇到了这个报错：git误区error: failed to push some refs to 'git@github.com:

  其实就是用README.md初始化掉了哈哈哈哈哈，参考这个：https://blog.csdn.net/uotail/article/details/80211897

- 按照教程上添加了两段代码用来创建Blogpost Model，分别是：

  1. 在blogpost目录下的models加入了一个Blogpost类
  2. 在admin文件中注册了这个类
  3. 但是需要注意的是新建一个app之后需要在Blog目录下的setting文件中添加上去才可以





============ 后面觉得这个教程太蠢了，所以换了一个，直接看官方教程了  ==============

https://docs.djangoproject.com/zh-hans/2.1/intro/tutorial01/

- conda uninstall django
- pip install django==2.0.2
- 按照这个方式修改报错：https://blog.csdn.net/qq_35304570/article/details/79674449 即可



### 创建项目

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

### 创建视图

- 修改blogpost/views.py，添加视图，这个的主要功能感觉是response
- 修改blogpost/urls.py，将url关联到view上去
- 然后在urls.py中添加blogpost应用的url
- python3 manage.py runserver ：runserver的服务器只是用来开发的，不是用来应用的哦，他真的是一个服务器

### 连接数据库

- 按照上面的教程修改setting.py中的DATABASES
- 执行 python3 manage.py migrate

```
# migrate是做什么的？

这个 migrate 命令检查 INSTALLED_APPS 设置，为其中的每个应用创建需要的数据表，至于具体会创建什么，这取决于你的 mysite/settings.py 设置文件和每个应用的数据库迁移文件（我们稍后会介绍这个）。这个命令所执行的每个迁移操作都会在终端中显示出来。如果你感兴趣的话，运行你数据库的命令行工具，并输入 \dt (PostgreSQL)， SHOW TABLES; (MySQL)， .schema (SQLite)或者 SELECT TABLE_NAME FROM USER_TABLES; (Oracle) 来看看 Django 到底创建了哪些表。
```

### 创建模型

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

### 管理页面

- 创建管理员账号：python3 manage.py createsuperuser
- 加入blogpost应用：编辑blogpost/admin
- 在这个页面中可以管理和编辑对象，这些页面都是根据你的在models.py中写的对象生成的，非常智能对吧。



别忘了你有些代码还没打

==============  今天到这里了，困了，明天再学  ==================

==================  git push  ==============

```
Django 中的视图的概念是「一类具有相同功能和模板的网页的集合」。
```



