# Generated by Django 4.1.5 on 2023-01-25 17:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('papers', '0003_alter_paper_standard_alter_paper_year'),
    ]

    operations = [
        migrations.AddField(
            model_name='paper',
            name='duration',
            field=models.IntegerField(default=0),
        ),
    ]
