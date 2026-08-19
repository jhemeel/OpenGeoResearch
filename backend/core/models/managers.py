"""
Reusable model managers for the OpenGeoResearch platform.
"""

from django.db import models

from .querysets import SoftDeleteQuerySet


class SoftDeleteManager(models.Manager):
    """
    Default manager.

    Returns only non-deleted records.
    """

    def get_queryset(self):
        return SoftDeleteQuerySet(
            self.model,
            using=self._db,
        ).alive()

    def alive(self):
        return self.get_queryset().alive()

    def deleted(self):
        return self.get_queryset().deleted()

    def recent(self, days=30):
        return self.get_queryset().recent(days)


class AllObjectsManager(models.Manager):
    """
    Returns all records, including soft-deleted ones.
    """

    def get_queryset(self):
        return SoftDeleteQuerySet(
            self.model,
            using=self._db,
        )

    def alive(self):
        return self.get_queryset().alive()

    def deleted(self):
        return self.get_queryset().deleted()

    def recent(self, days=30):
        return self.get_queryset().recent(days)