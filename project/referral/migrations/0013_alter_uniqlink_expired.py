# Generated by Django 3.2.6 on 2021-09-02 10:22

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('referral', '0012_alter_uniqlink_expired'),
    ]

    operations = [
        migrations.AlterField(
            model_name='uniqlink',
            name='expired',
            field=models.DateTimeField(default=datetime.datetime(2021, 9, 9, 10, 22, 4, 629100), editable=False),
        ),
    ]
