"""
Reusable QuerySets for the OpenGeoResearch platform.

These QuerySets provide common filtering methods that can be
shared across all models.
"""

from django.db import models
from django.utils import timezone


class BaseQuerySet(models.QuerySet):
    """
    Base QuerySet with reusable query methods.
    """

    def active(self):
        """
        Return only active records.
        """
        if hasattr(self.model, "is_active"):
            return self.filter(is_active=True)
        return self

    def inactive(self):
        """
        Return inactive records.
        """
        if hasattr(self.model, "is_active"):
            return self.filter(is_active=False)
        return self.none()

    def recent(self, days=30):
        """
        Return objects created within the last X days.
        """
        if hasattr(self.model, "created_at"):
            cutoff = timezone.now() - timezone.timedelta(days=days)
            return self.filter(created_at__gte=cutoff)
        return self.none()


class SoftDeleteQuerySet(BaseQuerySet):
    """
    QuerySet for models supporting soft deletion.
    """

    def alive(self):
        """
        Return non-deleted records.
        """
        return self.filter(is_deleted=False)

    def deleted(self):
        """
        Return only soft-deleted records.
        """
        return self.filter(is_deleted=True)

    def soft_delete(self):
        """
        Soft delete all records in the queryset.
        """
        return self.update(
            is_deleted=True,
            deleted_at=timezone.now(),
        )

    def restore(self):
        """
        Restore all soft-deleted records.
        """
        return self.update(
            is_deleted=False,
            deleted_at=None,
        )