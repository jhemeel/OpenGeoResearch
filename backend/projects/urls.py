from django.urls import include, path
from rest_framework.routers import DefaultRouter

from projects.viewsets import (
    ProjectMemberViewSet,
    ProjectViewSet,
)


router = DefaultRouter()

router.register(
    r"projects", ProjectViewSet, basename="project",
)

router.register(
    r"project-members", ProjectMemberViewSet, basename="project-member",
)

urlpatterns = [
    path("", include(router.urls)),
]