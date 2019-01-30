from django.contrib import admin
from . import models

# Register your models here.


class BlogpostAdmin(admin.ModelAdmin):
    exclude = ['posted']
    prepopulated_fields = {'slug': ('title',)}

admin.site.register(models.Blogpost, BlogpostAdmin)