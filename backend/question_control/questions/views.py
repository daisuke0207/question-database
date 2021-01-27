from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework import viewsets

from .models import Question, Answer, AnswerLike
from .serializers import UserSerializer, QuestionSerializer, AnswerSerializer, AnswerLikeSerializer
from .permissions import ProfilePermission


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (ProfilePermission,)

class ManageUserViewSet(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permissions_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = (IsAuthenticated,)

class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = (IsAuthenticated,)

class AnswerLikeViewSet(viewsets.ModelViewSet):
    queryset = AnswerLike.objects.all()
    serializer_class = AnswerLikeSerializer
    permission_classes = (IsAuthenticated,)