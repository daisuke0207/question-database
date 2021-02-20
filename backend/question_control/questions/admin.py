from django.contrib import admin

from .models import Answer, AnswerLike, Question, UserProfile

admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(AnswerLike)
admin.site.register(UserProfile)
