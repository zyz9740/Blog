# Generated by Django 2.0.2 on 2019-03-06 01:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0015_accesscontrol'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='accesscontrol',
            options={'ordering': ('-date', 'ip')},
        ),
        migrations.AddField(
            model_name='accesscontrol',
            name='date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]