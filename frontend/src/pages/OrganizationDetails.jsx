import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getOrganization,
  getOrganizationMembers,
} from "../services/organizationsApi";
import { getOrganizationProjects } from "../services/organizationsApi";

import { deleteProject } from "../services/projectService";
import { getProjects } from "../services/projectService";

function OrganizationDetails() {
  const { id } = useParams();

  const [organization, setOrganization] = useState(null);

  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [membersLoading, setMembersLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(true);

  const [error, setError] = useState("");
  const [membersError, setMembersError] = useState("");
  const [projectsError, setProjectsError] = useState("");

  const handleDeleteProject = async (project) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProject(project.id);

      setProjects((previousProjects) =>
        previousProjects.filter((item) => item.id !== project.id),
      );
    } catch (error) {
      console.error(error);

      setProjectsError("Unable to delete project.");
    }
  };

  useEffect(() => {
    const loadOrganization = async () => {
      try {
        const data = await getOrganization(id);

        setOrganization(data);
      } catch (error) {
        console.error(error);

        setError("Unable to load organization.");
      } finally {
        setLoading(false);
      }
    };

    loadOrganization();
  }, [id]);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const data = await getOrganizationMembers({
          organization: id,
        });

        setMembers(data.results || data);
      } catch (error) {
        console.error(error);

        setMembersError("Unable to load organization members.");
      } finally {
        setMembersLoading(false);
      }
    };

    loadMembers();
  }, [id]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getOrganizationProjects(id);

        setProjects(data.results || data);
      } catch (error) {
        console.error(error);

        setProjectsError("Unable to load organization projects.");
      } finally {
        setProjectsLoading(false);
      }
    };

    loadProjects();
  }, [id]);

  if (loading) {
    return <p>Loading organization...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!organization) {
    return <p>Organization not found.</p>;
  }

  return (
    <div>
      <div>
        <Link to="/organizations">← Back to Organizations</Link>

        <h2>{organization.name}</h2>

        {organization.short_name && (
          <p>
            <strong>Short name:</strong> {organization.short_name}
          </p>
        )}

        {organization.organization_type && (
          <p>
            <strong>Type:</strong> {organization.organization_type}
          </p>
        )}

        <p>
          <strong>Owner:</strong>{" "}
          {organization.owner_name || organization.owner_email || "N/A"}
        </p>

        <p>
          <strong>Owner email:</strong> {organization.owner_email || "N/A"}
        </p>

        <p>
          <strong>Members:</strong> {organization.member_count}
        </p>

        <p>
          <Link to={`/organizations/${organization.id}/members`}>
            Manage Members
          </Link>
        </p>

        <p>
          <strong>Projects:</strong> {organization.project_count}
        </p>
        <p>
          <Link to={`/projects/new?organization=${organization.id}`}>
            + Create Project
          </Link>
        </p>

        {(organization.city || organization.state || organization.country) && (
          <p>
            <strong>Location:</strong>{" "}
            {[organization.city, organization.state, organization.country]
              .filter(Boolean)
              .join(", ")}
          </p>
        )}

        {organization.description && <p>{organization.description}</p>}

        <p>
          <Link to={`/organizations/${organization.id}/edit`}>
            Edit Organization
          </Link>
        </p>
      </div>

      <hr />

      <section>
        <h3>Members</h3>

        {membersLoading && <p>Loading members...</p>}

        {membersError && <p>{membersError}</p>}

        {!membersLoading && !membersError && members.length === 0 && (
          <p>No members found.</p>
        )}

        {!membersLoading && !membersError && members.length > 0 && (
          <div>
            {members.map((member) => (
              <article key={member.id}>
                {" "}
                <p>
                  {" "}
                  <strong>User:</strong>{" "}
                  {member.user_name || member.user_email || member.user}{" "}
                </p>{" "}
                <p>
                  {" "}
                  <strong>Email:</strong> {member.user_email || "N/A"}{" "}
                </p>{" "}
                <p>
                  {" "}
                  <strong>Role:</strong> {member.role}{" "}
                </p>{" "}
                <p>
                  {" "}
                  <strong>Status:</strong>{" "}
                  {member.is_active ? "Active" : "Inactive"}{" "}
                </p>{" "}
              </article>
            ))}
          </div>
        )}
      </section>

      <hr />

      <section>
        <h3>Projects</h3>

        {projectsLoading && <p>Loading projects...</p>}

        {projectsError && <p>{projectsError}</p>}

        {!projectsLoading && !projectsError && projects.length === 0 && (
          <p>No projects found.</p>
        )}

        {!projectsLoading && !projectsError && projects.length > 0 && (
          <div>
            {projects.map((project) => (
              <article key={project.id}>
                <h4>
                  <Link to={`/projects/${project.id}`}>{project.name}</Link>
                </h4>

                <p>
                  <strong>Code:</strong> {project.code}
                </p>
                <p>
                  <strong>Status:</strong> {project.status}
                </p>
                <p>
                  <strong>Owner:</strong> {project.owner_name}
                </p>

                <p>
                  <Link to={`/projects/${project.id}/edit`}>Edit Project</Link>
                </p>
                <button
                  type="button"
                  onClick={() => handleDeleteProject(project)}
                >
                  Delete Project
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default OrganizationDetails;
