# Generated by Django 2.0.2 on 2019-02-28 02:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0007_auto_20190227_1118'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='accesscontrol',
            options={'ordering': ('ip',)},
        ),
        migrations.RemoveField(
            model_name='accesscontrol',
            name='date',
        ),
    ]
