from django.db import models

class Question(models.Model):
    question_text = models.CharField(
        verbose_name='質問文',
        max_length=300
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f'{self.question_text[:100]}'

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer_text = models.TextField(
        verbose_name='回答文',
    ) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.answer_text[:200]

class AnswerFavorite(models.Model):
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)
    like = models.BooleanField(
        verbose_name='いいね',
        default=False
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
