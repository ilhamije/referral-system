# Generated by Django 3.2.6 on 2021-09-02 10:21

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('referral', '0005_alter_uniqlink_expired'),
    ]

    operations = [
        migrations.AlterField(
            model_name='uniqlink',
            name='expired',
            field=models.DateTimeField(default=datetime.datetime(2021, 9, 9, 10, 21, 41, 910576), editable=False),
        ),
    ]
