from rest_framework.permissions import BasePermission


class IsProjectOwner(BasePermission):
    """
    Allows access to authenticated users who own the project.
    """

    message = "You must be the project owner to modify this project."

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
        )

    def has_object_permission(self, request, view, obj):
        if request.method in ("GET", "HEAD", "OPTIONS"):
            return True

        return obj.owner_id == request.user.id


class IsProjectOwnerForMembership(BasePermission):
    """
    Allows modification of a project membership only to the
    owner of the associated project.
    """

    message = "You must be the project owner to manage project members."

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
        )

    def has_object_permission(self, request, view, obj):
        if request.method in ("GET", "HEAD", "OPTIONS"):
            return True

        return obj.project.owner_id == request.user.id
    



