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

        return (
            ProjectMember.objects
            .select_related(
                "project",
                "user",
            )
            .filter(
                project__owner=user,
            )
        )
    

    
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