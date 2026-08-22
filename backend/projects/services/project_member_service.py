from django.db import transaction
from rest_framework.exceptions import ValidationError

from core.choices import ProjectRole
from projects.models import Project, ProjectMember


# Roles that cannot be assigned through ordinary membership creation.
PROTECTED_ROLES = {
    ProjectRole.OWNER,
    ProjectRole.PRINCIPAL_INVESTIGATOR,
}


@transaction.atomic
def create_project_member(
    *,
    project,
    user,
    role,
    is_active=True,
):
    """
    Create a membership for a user in a project.

    OWNER and PRINCIPAL_INVESTIGATOR memberships are protected
    because they are established through the project creation
    workflow.
    """

    if role in PROTECTED_ROLES:
        raise ValidationError(
            {
                "role": (
                    "OWNER and PRINCIPAL_INVESTIGATOR memberships "
                    "cannot be created through the membership API."
                )
            }
        )

    if not Project.objects.filter(pk=project.pk).exists():
        raise ValidationError(
            {
                "project": "The selected project does not exist."
            }
        )

    if ProjectMember.objects.filter(
        project=project,
        user=user,
    ).exists():
        raise ValidationError(
            {
                "user": (
                    "This user is already a member of this project."
                )
            }
        )

    return ProjectMember.objects.create(
        project=project,
        user=user,
        role=role,
        is_active=is_active,
    )