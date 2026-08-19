from django.db import transaction
from django.utils.text import slugify

from core.choices import ProjectRole
from projects.models import Project, ProjectMember
from projects.services.project_code_service import generate_project_code


@transaction.atomic
def create_project(**validated_data):
    """
    Create a project and its initial project memberships.

    The project owner is automatically added as an OWNER.
    The principal investigator is automatically added as a
    PRINCIPAL_INVESTIGATOR when different from the owner.
    """

    name = validated_data["name"].strip()

    project = Project(
        **validated_data,
        code=generate_project_code(),
        slug=slugify(name),
    )

    project.full_clean()
    project.save()

    ProjectMember.objects.create(
        project=project,
        user=project.owner,
        role=ProjectRole.OWNER,
    )

    if (
        project.principal_investigator
        and project.principal_investigator != project.owner
    ):
        ProjectMember.objects.create(
            project=project,
            user=project.principal_investigator,
            role=ProjectRole.PRINCIPAL_INVESTIGATOR,
        )

    return project