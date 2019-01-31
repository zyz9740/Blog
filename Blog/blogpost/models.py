from django.db import models

# Create your models here.
from django.utils import timezone
import datetime

# 每个模型被表示为 django.db.models.Model 类的子类。每个模型有一些类变量，它们都表示模型里的一个数据库字段。
# 每个字段都是 Field 类的实例 -
# 比如，字符字段被表示为 CharField ，日期时间字段被表示为 DateTimeField 。
# 这将告诉 Django 每个字段要处理的数据类型。
# 每个 Field 类实例变量的名字（例如 question_text 或 pub_date ）也是字段名，所以最好使用对机器友好的格式。
# 你将会在 Python 代码里使用它们，而数据库会将它们作为列名。

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


class Choice(models.Model):
    # 我们使用 ForeignKey 定义了一个关系。这将告诉 Django，每个 Choice 对象都关联到一个 Question 对象。
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    # Field 也能够接收多个可选参数；在上面的例子中：我们将 votes 的 default 也就是默认值，设为0。
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.choice_text