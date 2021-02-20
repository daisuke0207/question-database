from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    GENDER_CHOICES = (
        ('男', 'Male'),
        ('女', 'Female'),
        ('その他', 'Other'),
    )

    Overview_text = models.TextField(max_length=1000, verbose_name='概要')
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    occupation = models.CharField(max_length=100, verbose_name='職業')
    icon = models.ImageField(max_length=100, upload_to='None', blank=True)


class Question(models.Model):
    question_text = models.CharField(
        verbose_name='質問文',
        max_length=300
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.question_text[:100]}'


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer_text = models.TextField(
        verbose_name='回答文',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.answer_text[:200]


class AnswerLike(models.Model):
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
