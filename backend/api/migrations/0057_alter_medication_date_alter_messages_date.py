# Generated by Django 4.0.5 on 2022-08-09 19:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0056_alter_medication_date_alter_messages_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medication',
            name='date',
            field=models.CharField(blank=True, default='2022-08-09', max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='messages',
            name='date',
            field=models.CharField(default='2022-08-09', max_length=30),
        ),
    ]
