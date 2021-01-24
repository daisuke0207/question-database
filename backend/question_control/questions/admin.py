from django.contrib import admin

from .models import Answer, AnswerFavorite, Question

admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(AnswerFavorite)