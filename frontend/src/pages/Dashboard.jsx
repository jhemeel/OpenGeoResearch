import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await api.get("projects/");
        setProjects(response.data.results || response.data);
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
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Dashboard</h2>

      <p>
        Welcome to OpenGeoResearch.
      </p>

      <section>
        <h3>Overview</h3>

        <div>
          <strong>{projects.length}</strong>
          <p>Projects</p>
        </div>
      </section>

      <section>
        <h3>Recent Projects</h3>

        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.slice(0, 5).map((project) => (
            <div key={project.id}>
              <h4>{project.name}</h4>
              <p>{project.code}</p>
            </div>
          ))
        )}
      </section>

      <Link to="/projects">
        View all projects
      </Link>
    </div>
  );
}

export default Dashboard;