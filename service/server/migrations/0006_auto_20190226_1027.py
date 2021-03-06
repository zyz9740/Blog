# Generated by Django 2.0.2 on 2019-02-26 10:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0005_auto_20190216_1351'),
    ]

    operations = [
        migrations.CreateModel(
            name='BlogInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
                ('intro', models.CharField(max_length=100)),
                ('date', models.DateTimeField()),
                ('content', models.TextField()),
            ],
            options={
                'ordering': ('-date',),
            },
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('messageContent', models.CharField(max_length=100)),
            ],
            options={
                'ordering': ('-date',),
            },
        ),
        migrations.CreateModel(
            name='VisitorsInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('phoneNumber', models.CharField(max_length=11)),
                ('email', models.CharField(max_length=30)),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.DeleteModel(
            name='UserInfo',
        ),
        migrations.AddField(
            model_name='message',
            name='visitor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='server.VisitorsInfo'),
        ),
    ]
