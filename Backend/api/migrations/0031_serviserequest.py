# Generated by Django 4.0.5 on 2022-07-26 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0030_alter_animal_gender_alter_surgicaloperations_owner'),
    ]

    operations = [
        migrations.CreateModel(
            name='ServiseRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('locationName', models.CharField(blank=True, max_length=30, null=True)),
                ('serviceName', models.CharField(max_length=30)),
                ('locationOwner', models.CharField(max_length=30)),
                ('animalOwner', models.CharField(max_length=30)),
                ('price', models.IntegerField()),
                ('date', models.CharField(max_length=30)),
                ('time', models.IntegerField()),
                ('timePeriod', models.CharField(choices=[('am', 'am'), ('pm', 'pm')], max_length=2)),
                ('AnimalType', models.CharField(choices=[('cat', 'cat'), ('dog', 'dog'), ('cow', 'cow')], max_length=30)),
            ],
        ),
    ]