from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

USER_URL = '/question/users/'
PROFILE_URL = '/question/profile/'
TOKEN_URL = '/auth/'


class AuthorizedUserApiTests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username='test_user', password='test_pw', email='test@localhost')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_1_1_should_get_user_profile(self):
        res = self.client.get(PROFILE_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, {
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email
        })

    def test_1_2_should_not_allowed_by_PUT(self):
        payload = {'username': 'test_user',
                   'password': 'test_pw', 'email': 'test@com'}
        res = self.client.put(PROFILE_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_1_3_should_partial_update_user_profile(self):
        payload = {'username': 'test2_user',
                   'email': 'test2@localhost'}
        self.assertEqual(self.user.username, 'test_user')
        res = self.client.patch(PROFILE_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.username, payload['username'])


class UnauthenticatedApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_1_4_should_create_new_user(self):
        payload = {'username': 'test_user',
                   'password': 'test_pw', 'email': 'test@localhost'}
        res = self.client.post(USER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_1_5_should_create_new_user_not_need_email(self):
        payload = {'username': 'test_user', 'password': 'test_pw'}
        res = self.client.post(USER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_1_6_should_not_create_user_by_same_usernames(self):
        payload = {'username': 'test_user',
                   'password': 'test_pw', 'email': 'test@localhost'}
        get_user_model().objects.create_user(**payload)
        res = self.client.post(USER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_1_7_should_not_create_user_password_less_than_5(self):
        payload = {'username': 'test_user', 'password': 'pass'}
        res = self.client.post(USER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_1_8_should_response_token(self):
        payload = {'username': 'test_user', 'password': 'test_pw'}
        get_user_model().objects.create_user(**payload)
        res = self.client.post(TOKEN_URL, payload)

    def test_1_9_should_not_response_token_with_invalid_credentials(self):
        get_user_model().objects.create_user(username='test_user', password='test_pw')
        payload = {'username': 'test_user', 'password': 'miss_pw'}
        res = self.client.post(TOKEN_URL, payload)

        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_1_10_should_not_response_token_with_non_exist_credentials(self):
        payload = {'username': 'test_user', 'password': 'test_pw'}
        res = self.client.post(TOKEN_URL, payload)

        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_1_11_should_not_response_token_with_missing_field(self):
        payload = {'username': 'test_user', 'password': ''}
        res = self.client.post(TOKEN_URL, payload)
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_1_12_should_not_response_token_with_missing_field(self):
        payload = {'username': '', 'password': ''}
        res = self.client.post(TOKEN_URL, payload)
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_1_13_should_not_get_user_profile_when_unauthorized(self):
        res = self.client.get(PROFILE_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
