# Generated by Django 2.0.2 on 2019-03-06 05:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0017_auto_20190306_0254'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='accesscontrol',
            options={'ordering': ('-date', 'ip_address')},
        ),
        migrations.AddField(
            model_name='accesscontrol',
            name='ip_address',
            field=models.CharField(default='127.0.0.1', max_length=20),
        ),
    ]
