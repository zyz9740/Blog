from django.shortcuts import render
from . import models
import json
from django.http import HttpResponse
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import mixins


# Create your views here.
class VisitorListViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = VisitorsInfo.objects.all()
    serializer_class = VisitorInfoSerializer


class MessageListViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class BlogListViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = BlogInfo.objects.all()
    serializer_class = BlogInfoSerializer




def visitorAccess(request):
    if 'HTTP_X_FORWARDED_FOR' in request.META:  # 获取ip
        client_ip = request.META['HTTP_X_FORWARDED_FOR']
        client_ip = client_ip.split(",")[0]  # 所以这里是真实的ip
    else:
        client_ip = request.META['REMOTE_ADDR']  # 这里获得代理ip

    responseData = {}
    count_nums = AccessNumber.objects.filter(id=1)
    if count_nums:
        count_nums = count_nums[0]
        count_nums.count += 1
        responseData['visitorsCount'] = count_nums.count
    else:
        count_nums = AccessNumber()
        count_nums.count = 1
    count_nums.save()

    from django.utils import timezone  # 引入timezone模块
    visitDate = timezone.now()  # 输出time_now即为当然日期和时间
    visit = AccessControl(date=visitDate, ip_address=client_ip)
    visit.save()
    return responseData


class AccessListViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = AccessControl.objects.all()
    serializer_class = AccessControlSerializer

    def create(self, request, *args, **kwargs):
        data = visitorAccess(request)
        return Response(data, status=status.HTTP_201_CREATED)


from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse

@api_view(['GET'])
def blogDetail(request,blog_id):
    if request.method == 'GET':
        blogs = BlogInfo.objects.all()
        targetBlog = blogs.filter(id=blog_id)
        responseData = BlogInfoSerializer(targetBlog,many=True)
        return Response(responseData.data)
