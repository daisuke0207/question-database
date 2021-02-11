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
