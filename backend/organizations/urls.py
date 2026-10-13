from django.urls import include, path
from rest_framework.routers import DefaultRouter

from organizations.views import OrganizationViewSet, MembershipViewSet


router = DefaultRouter()

router.register(
    r"organizations",
    OrganizationViewSet,
    basename="organization",
)

router.register(
    r"organization-memberships",
    MembershipViewSet,
    basename="organization-membership",
)

urlpatterns = [
    path("", include(router.urls)),
]


