from django.urls import path
from django.conf.urls import include

from rest_framework import routers

from questions.views import(
    UserViewSet,
    ProfileUserViewSet,
    QuestionViewSet,
    AnswerViewSet,
    AnswerLikeViewSet,
)

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('questions', QuestionViewSet)
router.register('answers', AnswerViewSet)
router.register('answerlike', AnswerLikeViewSet)


urlpatterns = [
    path('profile/', ProfileUserViewSet.as_view(), name='profile'),
    path('', include(router.urls)),
]
