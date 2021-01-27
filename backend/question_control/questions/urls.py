from django.urls import path
from django.conf.urls import include

from rest_framework import routers

from questions.views import(
    ManageUserViewSet,
    UserViewSet,
    ManageUserViewSet,
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
    path('myself/', ManageUserViewSet.as_view(), name='myself'),
    path('', include(router.urls)),
]