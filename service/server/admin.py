from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.VisitorsInfo)
admin.site.register(models.Message)
admin.site.register(models.BlogInfo)
admin.site.register(models.AccessControl)