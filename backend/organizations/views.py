from rest_framework import status, viewsets, filters
from django.db.models import Count, Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action

from core.choices import ( OrganizationType, OrganizationRole,)

from organizations.services.organization_service import (
    create_organization,
)

from organizations.models import (
    Membership,
    Organization,
)
from organizations.serializers import (
    MembershipSerializer,
    OrganizationSerializer,
)
from organizations.permissions import ( IsOrganizationOwner, IsOrganizationMemberOwner,)



class OrganizationViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing organizations.
    """

    serializer_class = OrganizationSerializer

    permission_classes = (
        IsAuthenticated,
        IsOrganizationOwner,
    )

    filter_backends = (
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
        filters.OrderingFilter,
    )

    filterset_fields = (
        "organization_type",
        "country",
        "state",
        "city",
    )

    search_fields = (
        "name",
        "short_name",
        "description",
        "city",
        "state",
        "country",
    )

   
    ordering_fields = (
        "name",
        "created_at",
        "updated_at",
        "organization_type",
        "country",
        "state",
        "city",
    )

    ordering = (
        "name",
)



    def get_queryset(self):
        return (
            Organization.objects
            .filter(is_active=True)
            .annotate(
                active_member_count=Count(
                    "memberships",
                    filter=Q(
                        memberships__is_active=True
                    ),
                    distinct=True,
                ),
                active_project_count=Count(
                    "projects",
                    filter=Q(
                        projects__is_active=True
                    ),
                    distinct=True,
                ),
            )
            .order_by("name")
    )


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        organization = create_organization(
            owner=request.user,
            **serializer.validated_data,
        )

        response_serializer = self.get_serializer(
            organization
        )

        headers = self.get_success_headers(
            response_serializer.data
        )

        return Response(
            response_serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers,
        )

    def destroy(self, request, *args, **kwargs):
        organization = self.get_object()

        organization.is_active = False

        organization.save(
            update_fields=[
                "is_active",
                "updated_at",
            ]
        )

        return Response(
            {
                "detail": (
                    "Organization deactivated successfully."
                )
            },
            status=status.HTTP_200_OK,
        )


    @action(
        detail=False,
        methods=["get"],
        url_path="types",
    )
    def organization_types(self, request):
        return Response(
            [
                {
                    "value": value,
                    "label": label,
                }
                for value, label in OrganizationType.choices
            ]
        )


    @action(
        detail=False,
        methods=["get"],
        url_path="roles",
    )
    def organization_roles(self, request):
        return Response(
            [
                {
                    "value": value,
                    "label": label,
                }
                for value, label in OrganizationRole.choices
            ]
        )

    

class MembershipViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing organization memberships.
    """

    serializer_class = MembershipSerializer

    permission_classes = (
        IsAuthenticated,
        IsOrganizationMemberOwner,
    )

    def get_queryset(self):
        user = self.request.user

        return (
            Membership.objects
            .select_related(
                "organization",
                "user",
            )
            .filter(
                organization__memberships__user=user,
                organization__memberships__is_active=True,
            )
            .distinct()
        )


    def create(self, request, *args, **kwargs):
        organization_id = request.data.get("organization")

        if not organization_id:
            return Response(
                {
                    "organization": [
                        "This field is required."
                    ]
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        is_owner = Membership.objects.filter(
            organization_id=organization_id,
            user=request.user,
            role="OWNER",
            is_active=True,
        ).exists()

        if not is_owner:
            return Response(
                {
                    "detail": (
                        "Only the organization owner "
                        "can add members."
                    )
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        membership = serializer.save()

        response_serializer = self.get_serializer(
            membership
        )

        headers = self.get_success_headers(
            response_serializer.data
        )

        return Response(
            response_serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers,
    )


    def destroy(self, request, *args, **kwargs):
        membership = self.get_object()

        # Never allow an OWNER membership to be deleted.
        if membership.role == "OWNER":
            return Response(
                {
                    "detail": (
                        "An organization owner "
                        "cannot be removed."
                    )
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        self.perform_destroy(membership)

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )
