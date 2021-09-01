# Generated by Django 3.2.6 on 2021-09-01 08:53

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('referral', '0003_auto_20210901_0850'),
    ]

    operations = [
        migrations.AddField(
            model_name='uniqlink',
            name='num_contributors',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='contributor',
            name='uniqlink_uuid',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='contributors', to='referral.uniqlink'),
        ),
        migrations.AlterField(
            model_name='uniqlink',
            name='expired',
            field=models.DateTimeField(default=datetime.datetime(2021, 9, 8, 8, 53, 19, 686863), editable=False),
        ),
    ]