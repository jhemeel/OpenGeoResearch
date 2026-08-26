from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from organizations.models import Organization
from organizations.serializers import OrganizationSerializer


class OrganizationViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only API for organizations.
    """

    serializer_class = OrganizationSerializer
    permission_classes = (
        IsAuthenticated,
    )

    queryset = (
        Organization.objects
        .filter(is_active=True)
        .order_by("name")
    )