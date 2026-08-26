import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../services/projectService";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();

        setProjects(
          data.results || data
        );
      } catch (error) {
        console.error(error);
        setError("Unable to load projects.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div>
        <h2>Projects</h2>

        <Link to="/projects/new">
          Create Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div>
          {projects.map((project) => (
            <article key={project.id}>
              <h3>
                <Link
                  to={`/projects/${project.id}`}
                >
                  {project.name}
                </Link>
              </h3>

              <p>
                <strong>Code:</strong>{" "}
                {project.code}
              </p>

              <p>
                <strong>Organization:</strong>{" "}
                {project.organization_name}
              </p>

              <p>
                <strong>Owner:</strong>{" "}
                {project.owner_name}
              </p>

              <p>
                <strong>Principal Investigator:</strong>{" "}
                {project.principal_investigator_name}
              </p>

              {project.description && (
                <p>
                  {project.description}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;