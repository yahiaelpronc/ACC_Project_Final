# Generated by Django 4.0.5 on 2022-07-25 05:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_rename_city_locations_governorate'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='myuser',
            name='country',
        ),
        migrations.AddField(
            model_name='myuser',
            name='address',
            field=models.CharField(default="qena,El Sh'oon", max_length=40),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='myuser',
            name='governorate',
            field=models.CharField(default='Qena', max_length=40),
            preserve_default=False,
        ),
    ]