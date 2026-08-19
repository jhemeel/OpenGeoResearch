from django.utils import timezone

from django.conf import settings
from django.db import transaction

from projects.models import ProjectSequence


DEFAULT_PROJECT_CODE_PREFIX = "OGR"


@transaction.atomic
def generate_project_code(prefix=None):
    """
    Generate the next unique project code.

    Example:
        OGR-2026-0001
    """

    
    year = timezone.now().year

    sequence, _ = ProjectSequence.objects.select_for_update().get_or_create(
        year=year,
        defaults={"last_number": 0},
    )

    sequence.last_number += 1
    sequence.save(update_fields=["last_number"])


    if prefix is None:
        prefix = getattr(
            settings,
            "PROJECT_CODE_PREFIX",
            DEFAULT_PROJECT_CODE_PREFIX,
        )

    return f"{prefix}-{year}-{sequence.last_number:04d}"