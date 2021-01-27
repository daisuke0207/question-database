from rest_framework import permissions

class ProfilePermission(permissions.BasePermission):
    """
    読み取りは誰でも許可。それ以外の書き込みのみなどの操作は不可。
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return False
