"""
Base abstract models for the OpenGeoResearch platform.

Every model in the project should inherit one or more of these
base classes.
"""

from __future__ import annotations

import uuid

from django.conf import settings
from django.db import models
from django.utils import timezone

from .managers import AllObjectsManager
from .managers import SoftDeleteManager


class UUIDPrimaryKeyModel(models.Model):
    """
    Provides a UUID primary key.
    """

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    class Meta:
        abstract = True


class TimeStampedModel(models.Model):
    """
    Automatically stores when an object was created
    and last updated.
    """

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        abstract = True


class SoftDeleteModel(models.Model):
    """
    Adds soft delete capability to a model.
    """

    is_deleted = models.BooleanField(
        default=False,
        db_index=True,
    )

    deleted_at = models.DateTimeField(
        blank=True,
        null=True,
    )

    objects = SoftDeleteManager()
    all_objects = AllObjectsManager()

    class Meta:
        abstract = True

    def soft_delete(self) -> None:
        """
        Soft delete this object.
        """
        self.is_deleted = True
        self.deleted_at = timezone.now()

        self.save(
            update_fields=[
                "is_deleted",
                "deleted_at",
            ]
        )

    def restore(self) -> None:
        """
        Restore a soft deleted object.
        """
        self.is_deleted = False
        self.deleted_at = None

        self.save(
            update_fields=[
                "is_deleted",
                "deleted_at",
            ]
        )


class AuditModel(models.Model):
    """
    Tracks who created and last updated an object.
    """

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="%(app_label)s_%(class)s_created",
        blank=True,
        null=True,
    )

    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="%(app_label)s_%(class)s_updated",
        blank=True,
        null=True,
    )

    class Meta:
        abstract = True