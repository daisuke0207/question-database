# Generated by Django 3.1.5 on 2021-02-13 13:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0002_auto_20210130_2154'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='answerlike',
            name='like',
        ),
        migrations.RemoveField(
            model_name='answerlike',
            name='updated_at',
        ),
    ]
