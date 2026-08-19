"""
Profile models for the OpenGeoResearch platform.
"""

from django.conf import settings
from django.db import models

from core.choices import ProfileVisibility
from core.models import TimeStampedModel
from core.models import UUIDPrimaryKeyModel


class UserProfile(UUIDPrimaryKeyModel, TimeStampedModel):
    """
    General user profile.
    """

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
    )

    bio = models.TextField(
        blank=True,
    )

    country = models.CharField(
        max_length=100,
        blank=True,
    )

    state = models.CharField(
        max_length=100,
        blank=True,
    )

    city = models.CharField(
        max_length=100,
        blank=True,
    )

    timezone = models.CharField(
        max_length=100,
        blank=True,
    )

    preferred_language = models.CharField(
        max_length=20,
        default="en",
    )

    website = models.URLField(
        blank=True,
    )

    profile_visibility = models.CharField(
        max_length=20,
        choices=ProfileVisibility.choices,
        default=ProfileVisibility.PUBLIC,
    )

    class Meta:
        ordering = ["user__email"]
        verbose_name = "User Profile"
        verbose_name_plural = "User Profiles"

    def __str__(self):
        return f"{self.user.email}'s Profile"


class ResearcherProfile(UUIDPrimaryKeyModel, TimeStampedModel):
    """
    Researcher-specific profile.
    """

    profile = models.OneToOneField(
        UserProfile,
        on_delete=models.CASCADE,
        related_name="researcher_profile",
    )

    institution = models.CharField(
        max_length=255,
        blank=True,
    )

    department = models.CharField(
        max_length=255,
        blank=True,
    )

    faculty = models.CharField(
        max_length=255,
        blank=True,
    )

    job_title = models.CharField(
        max_length=255,
        blank=True,
    )

    highest_degree = models.CharField(
        max_length=100,
        blank=True,
    )

    years_of_experience = models.PositiveIntegerField(
        default=0,
    )

    research_interests = models.TextField(
        blank=True,
    )

    orcid = models.CharField(
        max_length=50,
        blank=True,
    )

    google_scholar = models.URLField(
        blank=True,
    )

    researchgate = models.URLField(
        blank=True,
    )

    scopus_author_id = models.CharField(
        max_length=100,
        blank=True,
    )

    web_of_science_id = models.CharField(
        max_length=100,
        blank=True,
    )

    class Meta:
        ordering = ["profile__user__email"]
        verbose_name = "Researcher Profile"
        verbose_name_plural = "Researcher Profiles"

    def __str__(self):
        return self.profile.user.email