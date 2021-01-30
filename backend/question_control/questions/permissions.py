from rest_framework import permissions


class ProfilePermission(permissions.BasePermission):
    """
    読み取りは誰でも許可。それ以外の書き込みのみなどの操作は不可。
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return False


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    読み込みは誰でも許可。それ以外の書き込みなどの操作は投稿者本人のみ許可。
    """

    def has_object_permission(self, request, view, obj):
        # 安全な読み取り（SAFE_METHODS）のリクエストであればTrueを返す。
        if request.method in permissions.SAFE_METHODS:
            return True
        # それ以外の操作は投稿者本人であればTrueを返す。
        return obj.owner == request.user
