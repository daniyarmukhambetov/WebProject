from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from datetime import datetime
from datetime import timedelta
from django.core import validators
import jwt
from django.conf import settings
import json


class UserManager(BaseUserManager):
    def _create_user(self, number, password=None, **extra_fields):
        if not number:
            raise ValueError('Указанный номер должно быть установлено')

        user = self.model(number=number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, number, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)

        return self._create_user(number, password, **extra_fields)

    def create_superuser(self, number, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Суперпользователь должен иметь is_staff=True.')

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Суперпользователь должен иметь is_superuser=True.')

        return self._create_user(number, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):

    number = models.CharField(max_length=16, unique=True)

    is_staff = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)
    USERNAME_FIELD = 'number'

    objects = UserManager()


    @property
    def token(self):
        return self._generate_jwt_token()

    def _generate_jwt_token(self):
        dt = datetime.now() + timedelta(days=60)

        token = jwt.encode({
            'id': self.pk,
            'exp': int(dt.strftime('%S'))
        }, settings.SECRET_KEY, algorithm='HS256')

        return token
class Auto(models.Model):
    name = models.CharField(max_length=128, unique=True)
    mark = models.ForeignKey('Mark', on_delete=models.CASCADE)
    model = models.ForeignKey('CarModel', on_delete=models.CASCADE)
    car_type = models.ForeignKey('Type', on_delete=models.CASCADE)
    year = models.IntegerField()
    engine = models.TextField()    


class Mark(models.Model):
    name = models.CharField(max_length=64, unique=True)
    def __str__(self) -> str:
        res = {'name':self.name}
        return json.dumps(res)

class CarModel(models.Model):
    name = models.CharField(max_length=64, unique=True)
    mark = models.ForeignKey(Mark, on_delete=models.CASCADE)
    def __str__(self) -> str:
        res = {'name':self.name}
        return json.dumps(res)

class Type(models.Model):

    name = models.CharField(max_length=32, unique=True)
    def __str__(self) -> str:
        res = {'name':self.name}
        return json.dumps(res)

class Posts(models.Model):
    title = models.CharField(max_length=500)
    description = models.TextField()
    price = models.IntegerField()
    city = models.CharField(max_length=128)
    car = models.ForeignKey(Auto, on_delete=models.CASCADE)
    mileage = models.BigIntegerField()
    color = models.CharField(max_length=64)
    poster = models.ForeignKey(User, on_delete=models.CASCADE)
    seen_count = models.IntegerField(default=0)
    