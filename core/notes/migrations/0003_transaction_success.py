# Generated by Django 4.0.3 on 2022-10-12 08:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0002_transaction'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='success',
            field=models.BooleanField(default=False),
        ),
    ]
