from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from projects.models import ProjectMember
from projects.permissions import IsProjectOwnerForMembership
from projects.serializers import ProjectMemberSerializer
from projects.services.project_member_service import (
    create_project_member,
)


class ProjectMemberViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing project memberships.
    """

    
    serializer_class = ProjectMemberSerializer

    permission_classes = (
        IsAuthenticated,
        IsProjectOwnerForMembership,
    )


    def get_queryset(self):
        user = self.request.user

        queryset = (
            ProjectMember.objects
            .select_related(
                "project",
                "user",
            )
            .filter(
                project__owner=user,
            )
        )

        project_id = self.request.query_params.get("project")

        if project_id:
            queryset = queryset.filter(
                project_id=project_id
            )

        return queryset
    

    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        membership = create_project_member(
            project=serializer.validated_data["project"],
            user=serializer.validated_data["user"],
            role=serializer.validated_data["role"],
            is_active=serializer.validated_data.get(
                "is_active",
                True,
        ),
    )

        response_serializer = self.get_serializer(membership)

        headers = self.get_success_headers(
            response_serializer.data
        )

        return Response(
            response_serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers,
    )

    # Project Member Owner Protection


    def partial_update(self, request, *args, **kwargs):
        membership = self.get_object()

        # The project owner cannot be deactivated.
        if (
            membership.user_id == membership.project.owner_id
            and request.data.get("is_active") is False
        ):
            return Response(
                {
                    "detail": (
                        "The project owner cannot be deactivated."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # The project owner's role cannot be changed.
        if (
            membership.user_id == membership.project.owner_id
            and "role" in request.data
            and request.data["role"] != membership.role
        ):
            return Response(
                {
                    "detail": (
                        "The project owner's role cannot be changed."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        return super().partial_update(
            request,
            *args,
            **kwargs,
    )


    def update(self, request, *args, **kwargs):
        membership = self.get_object()

        # The project owner cannot have their role changed.
        if (
            membership.user_id == membership.project.owner_id
            and "role" in request.data
            and request.data["role"] != membership.role
        ):
            return Response(
                {
                    "detail": (
                        "The project owner's role cannot be changed."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # The project owner cannot be deactivated.
        if (
            membership.user_id == membership.project.owner_id
            and request.data.get("is_active") is False
        ):
            return Response(
                {
                    "detail": (
                        "The project owner cannot be deactivated."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        return super().update(
            request,
            *args,
            **kwargs,
    )



    def destroy(self, request, *args, **kwargs):
        membership = self.get_object()

        # The project owner cannot be removed from their own project.
        if (
            membership.user_id == membership.project.owner_id
        ):
            return Response(
                {
                    "detail": (
                        "The project owner cannot be removed "
                        "from the project."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        return super().destroy(
            request,
            *args,
            **kwargs,
        )

