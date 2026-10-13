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

        setProjects(data.results || data);
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
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 w-36 animate-pulse rounded-ogr-md bg-ogr-slate-200" />
            <div className="h-4 w-72 animate-pulse rounded bg-ogr-slate-200" />
          </div>

          <div className="h-10 w-32 animate-pulse rounded-ogr-md bg-ogr-slate-200" />
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-64 animate-pulse rounded-ogr-lg border border-ogr-slate-200 bg-white shadow-ogr-sm"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-ogr-lg border border-red-200 bg-red-50 p-5">
        <h2 className="font-semibold text-ogr-danger">
          Unable to load projects
        </h2>

        <p className="mt-1 text-sm text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-ogr-primary-600">
            Research workspace
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-ogr-slate-900 sm:text-3xl">
            Projects
          </h2>

          <p className="mt-2 max-w-2xl text-sm text-ogr-slate-500 sm:text-base">
            Create, organize, and manage your research projects and their
            associated activities.
          </p>
        </div>

        <Link
          to="/projects/new"
          className="inline-flex items-center justify-center rounded-ogr-md bg-ogr-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-ogr-sm transition hover:bg-ogr-primary-700 focus:outline-none focus:ring-2 focus:ring-ogr-primary-500 focus:ring-offset-2"
        >
          <span className="mr-2 text-lg leading-none">+</span>
          Create Project
        </Link>
      </section>

      {/* Summary */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-ogr-lg border border-ogr-slate-200 bg-white p-5 shadow-ogr-sm">
          <p className="text-sm font-medium text-ogr-slate-500">
            Total Projects
          </p>

          <p className="mt-2 text-3xl font-bold text-ogr-slate-900">
            {projects.length}
          </p>

          <p className="mt-1 text-xs text-ogr-slate-500">
            Projects available in your workspace
          </p>
        </div>

        <div className="rounded-ogr-lg border border-ogr-slate-200 bg-white p-5 shadow-ogr-sm">
          <p className="text-sm font-medium text-ogr-slate-500">
            Research Workspace
          </p>

          <p className="mt-2 text-lg font-semibold text-ogr-primary-700">
            OpenGeoResearch
          </p>

          <p className="mt-1 text-xs text-ogr-slate-500">
            Centralized project management
          </p>
        </div>

        <div className="rounded-ogr-lg border border-ogr-slate-200 bg-white p-5 shadow-ogr-sm">
          <p className="text-sm font-medium text-ogr-slate-500">
            Project Management
          </p>

          <p className="mt-2 text-lg font-semibold text-ogr-geo-700">
            Research &amp; Data
          </p>

          <p className="mt-1 text-xs text-ogr-slate-500">
            Studies, collection, forms and analytics
          </p>
        </div>
      </section>

      {/* Project Section */}
      <section>
        <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h3 className="text-lg font-semibold text-ogr-slate-900">
              Your Projects
            </h3>

            <p className="mt-1 text-sm text-ogr-slate-500">
              Select a project to view its details and research activities.
            </p>
          </div>

          <span className="text-sm text-ogr-slate-500">
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </span>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-ogr-lg border border-dashed border-ogr-slate-300 bg-white px-6 py-14 text-center shadow-ogr-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ogr-primary-50 text-xl font-bold text-ogr-primary-700">
              P
            </div>

            <h3 className="mt-4 text-lg font-semibold text-ogr-slate-900">
              No projects yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ogr-slate-500">
              You haven't created any research projects yet. Create your first
              project to start organizing your research.
            </p>

            <Link
              to="/projects/new"
              className="mt-6 inline-flex items-center rounded-ogr-md bg-ogr-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-ogr-sm transition hover:bg-ogr-primary-700"
            >
              + Create Your First Project
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group flex flex-col overflow-hidden rounded-ogr-lg border border-ogr-slate-200 bg-white shadow-ogr-sm transition duration-200 hover:-translate-y-0.5 hover:border-ogr-primary-200 hover:shadow-ogr-md"
              >
                {/* Card Header */}
                <div className="border-b border-ogr-slate-100 px-5 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <span className="inline-flex rounded-full bg-ogr-primary-50 px-2.5 py-1 text-xs font-semibold text-ogr-primary-700">
                        {project.code}
                      </span>

                      <h3 className="mt-3 text-lg font-semibold leading-6 text-ogr-slate-900">
                        <Link
                          to={`/projects/${project.id}`}
                          className="transition hover:text-ogr-primary-700"
                        >
                          {project.name}
                        </Link>
                      </h3>
                    </div>

                    <Link
                      to={`/projects/${project.id}`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-ogr-md text-ogr-slate-400 transition hover:bg-ogr-slate-100 hover:text-ogr-primary-600"
                      aria-label={`View ${project.name}`}
                    >
                      →
                    </Link>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex-1 space-y-4 px-5 py-5">
                  {project.description && (
                    <p className="line-clamp-3 text-sm leading-6 text-ogr-slate-600">
                      {project.description}
                    </p>
                  )}

                  <div className="space-y-3">
                    {/* Organization */}
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-ogr-slate-400">
                        Organization
                      </p>

                      <p className="mt-1 text-sm font-medium text-ogr-slate-700">
                        {project.organization_name || "Not specified"}
                      </p>
                    </div>

                    {/* Owner */}
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-ogr-slate-400">
                        Project Owner
                      </p>

                      <p className="mt-1 text-sm font-medium text-ogr-slate-700">
                        {project.owner_name || "Not specified"}
                      </p>
                    </div>

                    {/* Principal Investigator */}
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-ogr-slate-400">
                        Principal Investigator
                      </p>

                      <p className="mt-1 text-sm font-medium text-ogr-slate-700">
                        {project.principal_investigator_name ||
                          "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between border-t border-ogr-slate-100 bg-ogr-slate-50 px-5 py-3">
                  <span className="text-xs text-ogr-slate-500">
                    Research Project
                  </span>

                  <Link
                    to={`/projects/${project.id}`}
                    className="text-sm font-semibold text-ogr-primary-600 transition hover:text-ogr-primary-700"
                  >
                    View project →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Projects;