from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from projects.serializers import ProjectSerializer
from projects.services.project_service import create_project
from projects.permissions import IsProjectOwner

# Normally DRF's ModelViewSet would effectively do request, serializer and Project.objects.create
# But we are overiding the create() method
# So we're deliberately routing creation through our service: request, serializer validation, create_project(),
# Project ── Owner membership ── PI membership

class ProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing research projects.
    """

    serializer_class = ProjectSerializer
    permission_classes = (
        IsAuthenticated,
        IsProjectOwner,
)

    def get_queryset(self):
        return (
            self.get_project_queryset()
            .select_related(
                "organization",
                "owner",
                "principal_investigator",
            )
        )

    def get_project_queryset(self):
        from projects.models import Project

        return Project.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        project = create_project(**serializer.validated_data)

        response_serializer = self.get_serializer(project)

        headers = self.get_success_headers(response_serializer.data)

        return Response(
            response_serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers,
        )
    
    