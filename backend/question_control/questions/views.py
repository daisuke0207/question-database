from django.contrib.auth.models import User

from rest_framework import generics, viewsets, permissions

from .models import Question, Answer, AnswerLike
from .serializers import UserSerializer, UserProfileSerializer, QuestionSerializer, AnswerSerializer, AnswerLikeSerializer
from .permissions import ProfilePermission, IsOwnerOrReadOnly


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (ProfilePermission,)


class ProfileUserViewSet(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permissions_classes = (IsOwnerOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permissions_classes = (IsOwnerOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class AnswerLikeViewSet(viewsets.ModelViewSet):
    queryset = AnswerLike.objects.all()
    serializer_class = AnswerLikeSerializer
    permissions_classes = (IsOwnerOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
