from rest_framework import serializers, status
from django.contrib.auth.models import User
from rest_framework.fields import SerializerMethodField
from .models import Question, Answer, AnswerLike
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    # パスワードをハッシュ化するためオーバーライド
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    questions = SerializerMethodField()
    answers = SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'questions', 'answers']

    def get_questions(self, obj):
        try:
            question_contents = QuestionSerializer(Question.objects.all().filter(
                owner=User.objects.get(id=obj.id)), many=True).data
            return question_contents
        except:
            question_contents = None
            return question_contents

    def get_answers(self, obj):
        try:
            question_contents = AnswerSerializer(Answer.objects.all().filter(
                owner=User.objects.get(id=obj.id)), many=True).data
            return question_contents
        except:
            question_contents = None
            return question_contents

    def update(self, request, *args, **kwargs):
        response = {'message': 'PUT method is not allowed'}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)


class QuestionSerializer(serializers.ModelSerializer):
    owner_name = serializers.ReadOnlyField(
        source='owner.username', read_only=True)

    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Question
        fields = ('id', 'question_text', 'created_at',
                  'updated_at', 'owner', 'owner_name')
        extra_kwargs = {'owner': {'read_only': True}}


class AnswerSerializer(serializers.ModelSerializer):
    owner_name = serializers.ReadOnlyField(
        source='owner.username', read_only=True)

    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Answer
        fields = ('id', 'answer_text', 'created_at',
                  'updated_at', 'question', 'owner', 'owner_name')
        extra_kwargs = {'owner': {'read_only': True}}


class AnswerLikeSerializer(serializers.ModelSerializer):
    owner_name = serializers.ReadOnlyField(
        source='owner.username', read_only=True)

    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = AnswerLike
        fields = ('id', 'like', 'created_at', 'updated_at',
                  'answer', 'owner', 'owner_name')
        extra_kwargs = {'owner': {'read_only': True}}
