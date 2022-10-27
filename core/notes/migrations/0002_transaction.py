# Generated by Django 4.0.3 on 2022-10-12 07:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
        ('notes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('buyer', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='buyer', to='users.profile')),
                ('note', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='notes.note')),
                ('seller', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='seller', to='users.profile')),
            ],
        ),
    ]