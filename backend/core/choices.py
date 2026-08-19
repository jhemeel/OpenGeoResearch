"""
Shared model choices for the OpenGeoResearch platform.
"""

from django.db import models


class VerificationStatus(models.TextChoices):
    """
    User verification status.
    """

    PENDING = "pending", "Pending"
    EMAIL_VERIFIED = "email_verified", "Email Verified"
    INSTITUTION_VERIFIED = "institution_verified", "Institution Verified"
    ADMIN_VERIFIED = "admin_verified", "Admin Verified"
    SUSPENDED = "suspended", "Suspended"


class ProfileVisibility(models.TextChoices):
    """
    Profile visibility settings.
    """

    PUBLIC = "public", "Public"
    ORGANIZATION = "organization", "Organization"
    PRIVATE = "private", "Private"


class OrganizationType(models.TextChoices):
    """
    Types of organizations.
    """

    UNIVERSITY = "UNIVERSITY", "University"
    RESEARCH_INSTITUTE = "RESEARCH_INSTITUTE", "Research Institute"
    GOVERNMENT = "GOVERNMENT", "Government"
    NGO = "NGO", "NGO"
    HOSPITAL = "HOSPITAL", "Hospital"
    PRIVATE_COMPANY = "PRIVATE_COMPANY", "Private Company"
    OTHER = "OTHER", "Other"


class OrganizationRole(models.TextChoices):
    """
    Membership roles within an organization.
    """

    OWNER = "OWNER", "Owner"
    ADMIN = "ADMIN", "Administrator"
    RESEARCHER = "RESEARCHER", "Researcher"
    DATA_COLLECTOR = "DATA_COLLECTOR", "Data Collector"
    ANALYST = "ANALYST", "Analyst"
    MEMBER = "MEMBER", "Member"
    VIEWER = "VIEWER", "Viewer"


class ProjectStatus(models.TextChoices):
    """
    Project lifecycle status.
    """

    DRAFT = "DRAFT", "Draft"
    ACTIVE = "ACTIVE", "Active"
    ON_HOLD = "ON_HOLD", "On Hold"
    COMPLETED = "COMPLETED", "Completed"
    ARCHIVED = "ARCHIVED", "Archived"


class ProjectVisibility(models.TextChoices):
    """
    Visibility of a project.
    """

    PRIVATE = "PRIVATE", "Private"
    ORGANIZATION = "ORGANIZATION", "Organization"
    PUBLIC = "PUBLIC", "Public"


class ProjectRole(models.TextChoices):
    OWNER = "OWNER", "Owner"
    PRINCIPAL_INVESTIGATOR = "PRINCIPAL_INVESTIGATOR", "Principal Investigator"
    PROJECT_MANAGER = "PROJECT_MANAGER", "Project Manager"
    DATA_MANAGER = "DATA_MANAGER", "Data Manager"
    RESEARCHER = "RESEARCHER", "Researcher"
    ENUMERATOR = "ENUMERATOR", "Enumerator"
    ANALYST = "ANALYST", "Data Analyst"
    VIEWER = "VIEWER", "Viewer"