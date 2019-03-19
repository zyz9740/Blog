from django.urls import path
from django.conf.urls import url, include

from django.conf.urls.static import static
from django.conf import settings

from .views import *

from rest_framework.routers import DefaultRouter

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from django.contrib import staticfiles

router = DefaultRouter()

#配置goods的url
router.register(r'message', MessageListViewSet)
router.register(r'blog', BlogListViewSet)
router.register(r'access', AccessListViewSet)
router.register(r'visitors', VisitorListViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    path('blog/<int:blog_id>', blogDetail, name='blogDetail'),
]
