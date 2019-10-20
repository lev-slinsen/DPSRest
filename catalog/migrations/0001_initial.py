# Generated by Django 2.2.6 on 2019-10-20 22:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Filter',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Name')),
            ],
            options={
                'verbose_name': 'Filter',
                'verbose_name_plural': 'Filters',
            },
        ),
        migrations.CreateModel(
            name='Pizza',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Name')),
                ('price', models.DecimalField(decimal_places=2, default=0, max_digits=6, verbose_name='Price')),
                ('text_short', models.CharField(max_length=100, verbose_name='Short text')),
                ('text_long', models.TextField(verbose_name='Long text')),
                ('size', models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4')], max_length=1, verbose_name='Size')),
                ('photo', models.ImageField(upload_to='images/', verbose_name='Image')),
                ('taste', models.ManyToManyField(to='catalog.Filter', verbose_name='Filter')),
            ],
            options={
                'verbose_name': 'Pizza',
                'verbose_name_plural': 'Pizzas',
            },
        ),
    ]
