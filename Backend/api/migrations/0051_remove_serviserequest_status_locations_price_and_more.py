# Generated by Django 4.0.5 on 2022-08-01 10:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0050_notifications_remove_serviserequest_status_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='notifications',
            name='message',
            field=models.CharField(default='', max_length=300),
            preserve_default=False,
        ),
    ]