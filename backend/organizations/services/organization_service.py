from django.db import transaction
from django.utils.text import slugify

from core.choices import OrganizationRole
from organizations.models import Membership, Organization


@transaction.atomic
def create_organization(
    *,
    owner,
    name,
    short_name="",
    organization_type,
    description="",
    website="",
    email="",
    phone_number="",
    logo=None,
    country="",
    state="",
    city="",
    is_active
):


    """
    Create an organization and automatically add
    the creator as the organization OWNER.
    """

    name = name.strip()

    
    organization = Organization(
        name=name,
        slug=slugify(name),
        short_name=short_name,
        organization_type=organization_type,
        description=description,
        website=website,
        email=email,
        phone_number=phone_number,
        logo=logo,
        country=country,
        state=state,
        city=city,
        is_active = True 
    )



    organization.full_clean()
    organization.save()

    Membership.objects.create(
        organization=organization,
        user=owner,
        role=OrganizationRole.OWNER,
    )

    return organization

