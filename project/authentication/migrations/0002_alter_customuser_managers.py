# Generated by Django 3.2.6 on 2021-08-29 07:22

import authentication.managers
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='customuser',
            managers=[
                ('objects', authentication.managers.UserManager()),
            ],
        ),
    ]