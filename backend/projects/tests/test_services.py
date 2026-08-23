from django.contrib.auth import get_user_model
from django.test import TestCase

from core.choices import ProjectRole
from organizations.models import Organization
from projects.models import Project, ProjectMember
from projects.services.project_service import create_project


User = get_user_model()


class CreateProjectServiceTests(TestCase):

    def setUp(self):
        self.owner = User.objects.create_user(
            email="owner@example.com",
            password="TestPassword123!",
        )

        self.pi = User.objects.create_user(
            email="pi@example.com",
            password="TestPassword123!",
        )

        self.organization = Organization.objects.create(
            name="Test Organization",
        )

    def test_create_project_generates_code_and_slug(self):
        project = create_project(
            name="Service Test Project",
            organization=self.organization,
            owner=self.owner,
            principal_investigator=self.pi,
        )

        self.assertTrue(project.code)
        self.assertEqual(
            project.slug,
            "service-test-project",
        )

        self.assertTrue(
            project.code.startswith("OGR-")
        )

    def test_create_project_creates_owner_membership(self):
        project = create_project(
            name="Owner Membership Test",
            organization=self.organization,
            owner=self.owner,
        )

        membership = ProjectMember.objects.get(
            project=project,
            user=self.owner,
        )

        self.assertEqual(
            membership.role,
            ProjectRole.OWNER,
        )

    def test_create_project_creates_pi_membership(self):
        project = create_project(
            name="PI Membership Test",
            organization=self.organization,
            owner=self.owner,
            principal_investigator=self.pi,
        )

        membership = ProjectMember.objects.get(
            project=project,
            user=self.pi,
        )

        self.assertEqual(
            membership.role,
            ProjectRole.PRINCIPAL_INVESTIGATOR,
        )