# Generated by Django 3.2.6 on 2021-09-01 08:50

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('referral', '0002_alter_uniqlink_expired'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='uniqlink',
            options={'ordering': ['-created']},
        ),
        migrations.AlterField(
            model_name='uniqlink',
            name='expired',
            field=models.DateTimeField(default=datetime.datetime(2021, 9, 8, 8, 50, 11, 451797), editable=False),
        ),
        migrations.CreateModel(
            name='Contributor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contributor_email', models.EmailField(max_length=254, unique=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('uniqlink_uuid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='contributors', to='referral.uniqlink')),
            ],
            options={
                'ordering': ['-created'],
                'unique_together': {('contributor_email', 'uniqlink_uuid')},
            },
        ),
    ]
