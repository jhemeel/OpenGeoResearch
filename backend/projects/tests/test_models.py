from django.contrib.auth import get_user_model
from django.test import TestCase

from organizations.models import Organization
from projects.models import Project


User = get_user_model()


class ProjectModelTests(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="test@example.com",
            password="TestPassword123!",
        )

        self.organization = Organization.objects.create(
            name="Test Organization",
        )

    # def test_project_generates_code_and_slug(self):
    #     project = Project.objects.create(
    #         name="My Test Research Project",
    #         organization=self.organization,
    #         owner=self.user,
    #     )

    #     self.assertTrue(project.code)
    #     self.assertTrue(project.slug)

    #     self.assertEqual(
    #         project.slug,
    #         "my-test-research-project",
    #     )

    #     self.assertTrue(
    #         project.code.startswith("OGR-")
    #     )

    def test_project_can_be_saved(self):
        project = Project.objects.create(
            code="OGR-TEST-0001",
            name="My Test Research Project",
            slug="my-test-research-project",
            organization=self.organization,
            owner=self.user,
        )

        self.assertEqual(
            project.code,
            "OGR-TEST-0001",
        )

        self.assertEqual(
            project.slug,
            "my-test-research-project",
        )