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
  - 127.0.0.1:8000 访问Django后台
  - 127.0.0.1:8000/admin 访问用户后台

有几点需要注意：

1. 我的python是python3，所以所有的python命令都是python3开头的
2. 每次启动的时候需要source activate Blog启动虚拟环境（在终端的时候）

===================== 上午的工作到此结束，吃饭去了  ====================

=====================  下午了！我又来了！ =============================

