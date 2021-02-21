from django.db import model
from colorfield.fields import ColorField
from django.contrib.auth.models import User

class VirtualUser(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=30)
    icon = models.ImageField(max_length=100, upload_to='None', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Room(models.Model):
    virtual_user = models.ManyToManyField(
        VirtualUser, on_delete=models.CASCADE)
    background = models.ImageField(
        max_length=100, upload_to='None', blank=True)
    is_public = models.BooleanField(default=False)
    max_join = models.IntegerField(default=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Message(models.Model):
    COLOR_CHOICES = [
        ('#FFFFFF', 'white'),
        ('#000000', 'black'),
        ('#2cbb0f', 'green'),
        ('#ed2655', 'red'),
        ('#0072ab', 'blue'),
    ]

    virtual_user = models.ForeignKey(VirtualUser, on_delete=models.CASCADE)
    text = models.TextField(max_length=1000)
    text_color = ColorField(choices=COLOR_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
