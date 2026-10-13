from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOrganizationOwner(BasePermission):
    """
    Permission for organization objects.

    Any authenticated user can view an organization.
    Only an active organization owner can modify it.
    """

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
        )

    def has_object_permission(
        self,
        request,
        view,
        obj,
    ):
        # Anyone with access to the organization can read it.
        if request.method in SAFE_METHODS:
            return True

        # Only an active OWNER can modify the organization.
        return obj.memberships.filter(
            user=request.user,
            role="OWNER",
            is_active=True,
        ).exists()


class IsOrganizationMemberOwner(BasePermission):
    """
    Permission for organization membership objects.

    Organization members can view memberships.
    Only an active organization OWNER can modify them.
    """

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
        )

    def has_object_permission(
        self,
        request,
        view,
        obj,
    ):
        # Members can view memberships.
        if request.method in SAFE_METHODS:
            return True

        # Only an active OWNER can modify memberships.
        is_owner = obj.organization.memberships.filter(
            user=request.user,
            role="OWNER",
            is_active=True,
        ).exists()

        if not is_owner:
            return False

        # An OWNER membership cannot be modified or deleted.
        if (
            obj.user_id == request.user.id
            and obj.role == "OWNER"
        ):
            return False

        # No OWNER membership can be deleted.
        if (
            request.method == "DELETE"
            and obj.role == "OWNER"
        ):
            return False

        return True

