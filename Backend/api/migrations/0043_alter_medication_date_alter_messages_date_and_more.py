# Generated by Django 4.0.5 on 2022-07-27 22:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0042_rename_statusvet_serviserequest_statusowner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medication',
            name='date',
            field=models.CharField(
                blank=True, default='2022-07-28', max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='messages',
            name='date',
            field=models.CharField(default='2022-07-28', max_length=30),
        ),
        migrations.AlterField(
            model_name='serviserequest',
            name='statusOwner',
            field=models.CharField(blank=True, choices=[('accepted', 'accepted'), ('pending', 'pending'), (
                'declined', 'declined')], default='pending', max_length=30, null=True),
        ),
    ]