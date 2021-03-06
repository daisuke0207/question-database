from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Question, Answer, AnswerLike, UserProfile
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True,
                                     'required': True, 'min_length': 5}}

    # パスワードをハッシュ化するためオーバーライド
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'owner', 'overview_text',
                  'gender', 'occupation', 'icon', 'updated_at')


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
        fields = ('id', 'created_at', 'answer', 'owner', 'owner_name')
        extra_kwargs = {'owner': {'read_only': True}}
