# 我的Blog搭建之旅6——设计思路



[TOC]

## 数据库设计与model创建

- 在所有的设计之前，我们需要有一个大致的功能设置。我们需要知道我们的设计中包含哪些元素，按照大类分开从而进行数据库和模型的设计。下面将以一个交易页面为例来分析：

  所涉及到的大的分类有：

  - 用户
  - 商品信息
  - 交易记录
  - 用户操作

  在django中，我们不应是当像之前一样的单一的app，因为现在功能的变大。我们需要不同的app来分别表示不同的分类，为此我们建立app如下：

  - users/goods/trade/user_operation

  我们将在每个app中建立其下的model与view，并在setting中注册这些app

### users —— 用户模型

####  < 基本概念 >

我们的用户是继承models.AbstractUser类，他将会继承这个django的抽象用户类的一些信息。

> 一个基本的model应包括如下部分：
>
> - 成员：用来保存数据库中的列的信息，需要注意的是成员的字段类型和属性设计。
> - Meta：元信息，用于表示这个类的一些属性，常用的就是verbose_name和ordering等属性信息。
> - \__str__：创建模型时候的返回字段，在查看这个类的实例的时候便与区分。

#### < 常用成员 >

> Tips：我们在设计的时候经常需要加一个add_time属性，用于表示那时候创建的这个实例，这已经成为了一个惯例

- 姓名、手机号等必须信息，默认设置即可

- 生日等非必须信息，设置

  ```
  //表示可以为空，否则在创建的时候会报错。默认的是不能为空的
  null=true,blank=true
  //或者设置默认值
  default="user"
  ```

- email：EmailField字段
- 性别等选择：使用CharField的choices属性
- 时间信息：使用DateTimeField字段，default设置为datatime.now（注意不要加括号）

> Tips：我们在import的时候，排序的规则是：
>
> - 最前头import  python自带的包
> - 然后import  第三方的包
> - 最后 import 自己项目里的包

#### < 替换与引用 >

- 替换：我们需要在setting中设置 AUTH_USER_MODEL = ‘users.UserInfo’ 来替换原有的User类，这样子才会使这个类生效
- 引用：最简单的引用其实就是 from .model import users 之类的，但是这样的话第三方可能跟我们的路径不同就会出问题
- 引用：我们既然已经替换了，那么就可以直接使用Django的借口直接访问到我们的user。我们使用 django.contrib.auth import get_user_model ， 然后使用users = get_user_model（）获取到用户。从源码可以看出他只是访问了setting中的 AUTH_USER_MODEL

![image-20190304151350257](/Users/listener/Library/Application Support/typora-user-images/image-20190304151350257.png)

### goods —— 商品模型

经过分析我们知道我们需设置三层的商品结构：全部商品分类 ——  大致分类 —— 细分类  ——  不同品种  ——  具体商品，比如：全部商品分类 —— 生鲜食品 —— 海鲜水产 —— 鱼 ——  XXX品牌速冻鱼

#### < 设计思路 >

- 这种层级的模式最常见的设计思路是：使用三个的model，每个表示一层的分类。在每一层中使用外键来关联到所属上一层更大的分类。
- 但这种模式有缺点，他不易于扩展结构，而且如果要使用多层的模式需要再建立一个model；并且对于规模很大的多层结构model的数量很大。

- 我们这里的设计结构是只使用一个model描述分类：我们在每个model中使用**category_type**表示是那一层级的目录，使用**parent_category**表示父目录是什么，并且**指向自己**

  ```python
  CATEGORY_TYPE = (
          (1, "一级类目"),
          (2, "二级类目"),
          (3, "三级类目"),
      )
  category_type = models.IntegerField(choices=CATEGORY_TYPE, verbose_name="类目级别", help_text="类目级别")
  parent_category = models.ForeignKey("self", null=True, blank=True, verbose_name="父类目级别", help_text="父目录",related_name="sub_cat")
  ```

#### < 类的结构 >

- GoodCategory：商品类别，自己的外键
- GoodCategoryBrand：品牌
- Goods：商品，外键连接到商品类别和品牌
- GoodImage：商品图片，外键连接到商品
- Banner：商品的横幅图片，外键连接到商品。当然这个也可以直接作为Goods类的成员。

#### < 常用成员 >

- 商品名称/商品代码/商品描述

- 商品图片：

  ```
  image = models.ImageField(max_length=200, upload_to="brands/")
  ```

- 点击量/收藏量/卖出量/库存/价格/进货价

- 富文本编辑器：UEditorField（第三方库） 

> Tips：类的成员是根据具体的需求而决定的，可以根据后期的要求具体设计。当然也可以直接定义一个类，用外键连接。

### trade —— 交易模型

- 购物车
- 订单 

### user_operation —— 用户操作模型

- 用户收藏：除了一些基本的比如add_time之类的，我们只需要添加指向users和goods的外键即可
- 用户评论：相同，有外键的指向相应的user，剩下的作为成员即可

### 设计总结

1. 设计数据库是一个事先的工作，我们必须先设计数据库然后再进行其他工作，否则后面修改数据库的时候会出现很多问题。
2. 需要掌握的是django常用的字段类型和相应的数据库属性，对一些常用的经典的设计模式需要了解。比如这里涉及到的多层级的设计和外键关联的设计。
3. 有时候还需要权衡是作为数据库的一列还是一个单独的数据库的问题

### migration操作

剩余的已经理解了，需要额外补充的几点是：

- 数据库中的表的名称是以“app名_类名”创建的
- migration的信息是存储在django_migrations的表中，针对每一个表的每一个migration操作都会记录在表中

### 数据导入

#### 数据导入

因为我们网站的运行过程中肯定不会是原本什么数据都没有的，我们需要通过独立出来的model和已经存在的数据，还有一个脚本来填充原本的数据库。

- 实例代码：

```python
# 保存的数据类型
#!/usr/bin/env python
# encoding: utf-8

row_data = [
    {
    	# 第一级分类：生鲜食品
        'sub_categorys': [
            {
            	# 第二级分类：精品肉类
                'sub_categorys': [
                    {
                    	# 第三季分类，无字分类：羊肉
                        'code': 'yr',
                        'name': '羊肉'
                    },
                    ...
                ],
                'code': 'jprl',
                'name': '精品肉类'
            },
            {
                'sub_categorys': [
                    {
                        'code': 'cb',
                        'name': '参鲍'
                    },
                    ...
                ],
                'code': 'hxsc',
                'name': '海鲜水产'
            },
            ...
        ],
        'code': 'sxsp',
        'name': '生鲜食品'
    },
    ...
    
```

```python
# 脚本

import sys
import os

# 获取当前文件的路径
pwd = os.path.dirname(os.path.realpath(__file__))
# 加入到可以搜索的目录中
sys.path.append(pwd+"../")
# 设置django的环境，就是manage.py的第一句
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "MxShop.settings") 

# 启动django，这样子才可以使model单独运行
import django
django.setup()

from goods.models import GoodsCategory

from db_tools.data.category_data import row_data

for lev1_cat in row_data:
    # 首先建立一个对象
    lev1_intance = GoodsCategory()
    # 补充对象的成员
    lev1_intance.code = lev1_cat["code"]
    lev1_intance.name = lev1_cat["name"]
    lev1_intance.category_type = 1
    # 保存
    lev1_intance.save()

    for lev2_cat in lev1_cat["sub_categorys"]:
        lev2_intance = GoodsCategory()
        lev2_intance.code = lev2_cat["code"]
        lev2_intance.name = lev2_cat["name"]
        lev2_intance.category_type = 2
        lev2_intance.parent_category = lev1_intance
        lev2_intance.save()

        for lev3_cat in lev2_cat["sub_categorys"]:
            lev3_intance = GoodsCategory()
            lev3_intance.code = lev3_cat["code"]
            lev3_intance.name = lev3_cat["name"]
            lev3_intance.category_type = 3
            lev3_intance.parent_category = lev2_intance
            lev3_intance.save()
```

> - 获取当前文件路径：cur_path = os.path.dirname(os.path.realpath(\__file__))
>
> https://blog.csdn.net/cyjs1988/article/details/77839238/
>
> - 当我们导入一个模块时：import  xxx，默认情况下python解析器会搜索当前目录、已安装的内置模块和第三方模块，搜索路径存放在**sys模块的path**中。此时sys.path 返回的是一个列表！该路径已经添加到系统的环境变量了，当我们要添加自己的搜索目录时，可以通过列表的append()方法。这样子我们就可以直接import

#### 图片的路径设置

```python
# setting.py media 是存放图片的区域
MEDIR_URL = “/media/"
MEDIR_ROOT = os.path.join(BASE_DIR,"media")

# url.py
from .setting import MEDIR_ROOT
from django.views.static import serve

urlpatterns = [
    ...
    url(r'^media/(?P<path>.*)$',serve,{"document_root":MEDIA_ROOT})
    ...
]
```

### 前后端的基本讨论

#### 前后端分类的优缺点

优点：

- pc、app、pad多端适应，不同的前端
- SPA模式开发：后端只使用api
- 前后端指责不清
- 开发效率问题，需要互相等待

## RESTful规范开发

### views.py的演进过程

#### 第一形态：基础的CVB类型的view，使用json.dump序列化

这应该是最基础的一个django的view模型了，使用函数确定每个http方法执行的函数，用python的json方法序列化

```python
from django.views.generic.base import View


class GoodsListView(View):
    def get(self, request):
        """
        通过django的view实现商品列表页
        :param request:
        :return:
        """
        # 从数据库里一个一个获取json列表
        json_list = []
        goods = Goods.objects.all()[:10]
        for good in goods:
             json_dict = {}
             json_dict["name"] = good.name
             json_dict["category"] = good.category.name
             json_dict["market_price"] = good.market_price
             json_dict["add_time"] = good.add_time
             json_list.append(json_dict)

		# 返回json的数据流
        import json
        from django.http import HttpResponse
        return HttpResponse(json.dumps(json_list),content_text = 'application/json')
```

- 如何理解json：json其实就是一个字符串，但是我们通常构建json的方式是dict。所以我们需要在dict与json之间做转换，我们需要用到以下函数：
  - json.dumps(dict)：dict ==> json
  - json.loads(json): json ==> dict
  - json.dump(dict, file) : 将json保存到文件
  - json.load(file) ： 从文件中读取json
- 缺点：
  - 字段一个一个解析，太慢了
  - datetime类型会报错等问题

#### 第二形态：序列化改进，使用serilizers 序列化为json

前一个是使用dump方式将dict转换为str，这里我们直接使用seriliazers.serialize方法来转换为str。

- 不需要写for循环，可以序列化多个。
- 转换出来的就是str类型，可以直接输入到JsonResponse或者HttpResponse中去。
- 简单的 **获取 —— 序列化 —— 返回** 三件套

```python
import json
from django.core import serializers
from django.http import HttpResponse, JsonResponse

class GoodsListView(View):
    def get(self, request):
        goods = Goods.objects.all()[:10]
        json_data = serializers.serialize('json', goods)
        return JsonResponse(json_data, safe=False)
```

#### 第三形态：使用 drf 的Seializer和APIView接口

drf 在django的基础上升级了他的serializer和view，功能更加强大，但是操作方式基本是相同的。

```python
from rest_framework import serializers
'''
serializers.py
'''
class GoodsSerializer(serializers.Serializer):
	name = serializers.CharField(...)
	....
	
	 def create(self, validated_data):
        return Goods.objects.create(**validated_data)
```

> Tips：
>
> 1. serializer里的字段类型的定义与models里的字段类型定义相似，但是参数不同
> 2. create 是重载过后的函数，调用save的时候会调用create，validated_data 是所有serializer中的有效信息（？？）

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import GoodsSerializer
from rest_framework import status
'''
views.py
'''
class GoodsListView(APIView):
    def get(self, request, format=None):
        goods = Goods.objects.all()[:10]
        # json_data = serializers.serialize('json', goods)
        goods_serializer = GoodsSerializer(goods, many=True)
        # return JsonResponse(json_data, safe=False)
        return Response(goods_serializer.data)
    
    def post(self, request, format=None):
        serializer = GoodsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

> Tips：
>
> 1. many = True 表示可以序列化多个
> 2. goods_serializer.data的数据类型是dict而不是str，这也就意味着这个Response可以接受dict的返回字段而不只是str
> 3. request.data : 这是drf自己封装的request类型，它会吧GET POST BODY里面的所有信息都放在data里面，不用我们自己获取了。

这里仍然是 **获取 —— 序列化 —— 返回** 步骤

对特定的字段有特殊的序列化优点：

- 对路径类的序列化（如图片）会去setting里面找到绝对路径
- 对外键会使用id，也可以嵌套使用

##### RESTful 的状态码

- 200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
- 201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
- 202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
- 204 NO CONTENT - [DELETE]：用户删除数据成功。
- 400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
- 401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
- 403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
- 404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
- 406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
- 410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
- 422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
- 500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。

#### 第四形态：使用  Mixin 进行高层封装 和 ModelSerializer 进行序列化 以及 分页

##### Mixin 封装

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

> Tips：如果不重载get的话，后台会默认你不支持这种方法，所以必须要重载。那有没有不用自己写的方法呢？有，还有更加高层的封装。

```python
from rest_framework import generics

# 这里用的就是ListCreateAPIView
class SnippetList(generics.ListCreateAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
```

##### ModelSerializer

ModelSerializer可以避免serializer的复杂的成员定义，对于有大量成员的model来说可以省掉很多工作量了。

他只需要两步：

- 指定model
- 指定需要序列化的字段：元组类型或者直接\__all__

```python
from rest_framework import serializers 

class GoodsSerializer(serializers.ModelSerializer):
	# 重载两个成员
    category = CategorySerializer()
    images = GoodsImageSerializer(many=True)
    class Meta:
        model = Goods
        fields = "__all__"
```

还有如下改进：

- 之前说过如果有外键那么就会返回id，在ModelSerializer里面可以嵌套其他的Serializer，只需要重载一下就可以了

##### pagination（分页）

- 首先需要在setting中配置：

```python
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10
}
```

加入之后就会分页了！！而且返回的json类型也有改变，会加上：

- count：列表的条数

- next：下一页的url

- previous：上一页的url

- result：真实的数据列表

还有一个特点是原来的图片的url会直接加上可以访问的url路径！

其他具体的配置可以看 drf 的官网，实例如下：

```python
class GoodsPagination(PageNumberPagination):
    page_size = 12 # 一页有几个
    page_size_query_param = 'page_size'  #url中可控的pagesize参数
    page_query_param = "page"			#第几页的那个名称
    max_page_size = 100				
    
class GoodsListView(generics.ListAPIView)
	...
    pagination_class = GoodsPagination
    ...
```

#### 第五形态：使用viewset和router

GenericViewSet = ViewSetMixin + generics.GenericAPIView

ViewSetMixin 只是重写了as_view 和 initial_request方法,我们对views的重写只需要更改他继承的类即可。

比如原来使用的是ListCreateAPIVIew，现在就需要改为 mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet,如下：

```python
from rest_framework import viewsets
from rest_framework import mixins

class AccessListViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = AccessControl.objects.all()
    serializer_class = AccessControlSerializer
```

viewset的好处是他需要跟router一起使用，只需要注册，而不需要自己导向网址了。

router：他会采取默认的操作，比如将get绑定到list上之类的，然后我们就不需要重载as_view方法，我们只需要注册router即可。如下：

```
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

#配置goods的url
router.register(r'message', MessageListViewSet)
router.register(r'blog', BlogListViewSet)
router.register(r'access', AccessListViewSet)
router.register(r'visitors', VisitorListViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
]
```

#### 总结

- GeneticViewSet (viewset)

  单纯的将ViewsetMixin和GenericAPIView结合起来，这样就可以实现GenericAPIView的默认数据库行为，也可以在url界面用as_view方法将http与model的行为联系起来

  其实你可以理解为还没有绑定任何功能的viewset

  - GenericAPIView

    我们用这个方法就可以指定queryset和serializer_class

    - APIView：

      drf的方法，提供一个有界面的后端展示

      - View：Django的方法

  - ViewsetMixin

    在url中将http方法与model的行为绑定起来，我的主要意思是绑定的位置转移了

- mixin：这是个用于绑定http与model的
  - CreateModelMixin
  - ListModelMixin
  - RetrieveModelMixin
  - UpdateModelMixin
  - DestroyModelMixin

- CreateModelAPIView
  - CreateModelMixin
  - GenericAPIView

所以我们定义的方式是这样的，继承GenericViewSet和某个ModelMixin

```
class VisitorListViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = VisitorsInfo.objects.all()
    serializer_class = VisitorInfoSerializer
```

