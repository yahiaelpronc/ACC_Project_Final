# Generated by Django 4.0.5 on 2022-07-27 20:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0038_merge_20220727_1823'),
    ]

    operations = [
        migrations.AlterField(
            model_name='locations',
            name='website_link',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='serviserequest',
            name='status',
            field=models.CharField(blank=True, choices=[('accepted', 'accepted'), ('pending', 'pending'), ('declined', 'declined')], default='pending', max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='surgicaloperationsrequest',
            name='statusUser',
            field=models.CharField(blank=True, choices=[('accepted', 'accepted'), ('pending', 'pending'), ('declined', 'declined')], default='pending', max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='surgicaloperationsrequest',
            name='statusVet',
            field=models.CharField(blank=True, choices=[('accepted', 'accepted'), ('pending', 'pending'), ('declined', 'declined')], default='pending', max_length=30, null=True),
        ),
    ]