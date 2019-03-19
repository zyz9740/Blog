from django.db import models

# Create your models here.


class VisitorsInfo(models.Model):
    name = models.CharField(max_length=30)
    phoneNumber = models.CharField(max_length=11)
    email = models.CharField(max_length=30)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name',)


class Message(models.Model):
    date = models.DateTimeField()
    visitor = models.ForeignKey(
        VisitorsInfo,
        on_delete=models.CASCADE
    )
    messageContent = models.CharField(max_length=100)

    class Meta:
        ordering = ('-date',)

    def __str__(self):
        return self.messageContent


class BlogInfo(models.Model):
    title = models.CharField(max_length=30)
    intro = models.CharField(max_length=100)
    date = models.DateTimeField()
    content = models.TextField()

    class Meta:
        ordering = ('title',)

    def __str__(self):
        return self.title


class AccessControl(models.Model):

    date = models.DateTimeField(blank=True, null=True)
    ip_address = models.CharField(max_length=20, default='UNKNOWN')

    class Meta:
        ordering = ('-date','ip_address')

    def __str__(self):
        return self.ip_address


class AccessNumber(models.Model):
    count = models.IntegerField(verbose_name="访问人数")




