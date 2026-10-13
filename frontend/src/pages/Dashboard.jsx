import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";
import StatusBadge from "../components/ui/StatusBadge";

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

  /* ---------------------------------
     Loading State
  --------------------------------- */

  if (loading) {
    return (
      <div className="space-y-8">
        <Card>
          <div className="space-y-4">
            <div className="h-6 w-28 animate-pulse rounded-full bg-ogr-slate-200" />

            <div className="h-9 w-72 animate-pulse rounded-lg bg-ogr-slate-200" />

            <div className="h-4 w-full max-w-xl animate-pulse rounded bg-ogr-slate-200" />
          </div>
        </Card>

        <div>
          <div className="mb-4 space-y-2">
            <div className="h-5 w-40 animate-pulse rounded bg-ogr-slate-200" />
            <div className="h-4 w-64 animate-pulse rounded bg-ogr-slate-200" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item}>
                <div className="space-y-4">
                  <div className="h-10 w-10 animate-pulse rounded-lg bg-ogr-slate-200" />

                  <div className="h-3 w-20 animate-pulse rounded bg-ogr-slate-200" />

                  <div className="h-8 w-14 animate-pulse rounded bg-ogr-slate-200" />

                  <div className="h-3 w-32 animate-pulse rounded bg-ogr-slate-200" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card title="Recent Projects">
          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-lg border border-ogr-slate-100 p-4"
              >
                <div className="space-y-2">
                  <div className="h-4 w-40 animate-pulse rounded bg-ogr-slate-200" />
                  <div className="h-3 w-24 animate-pulse rounded bg-ogr-slate-200" />
                </div>

                <div className="h-6 w-20 animate-pulse rounded-full bg-ogr-slate-200" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  /* ---------------------------------
     Error State
  --------------------------------- */

  if (error) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="Research workspace"
          description="Manage your research projects and geospatial activities from one workspace."
        />

        <Card title="Unable to load dashboard">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ogr-danger/10 text-sm font-bold text-ogr-danger">
              !
            </div>

            <div>
              <p className="text-sm font-medium text-ogr-slate-800">
                Something went wrong
              </p>

              <p className="mt-1 text-sm text-ogr-danger">
                {error}
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  /* ---------------------------------
     Dashboard
  --------------------------------- */

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <Card
        className="relative overflow-hidden border-ogr-primary-100"
        bodyClassName="relative"
      >
        {/* Decorative shapes */}
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-ogr-primary-50" />

        <div className="pointer-events-none absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-ogr-geo-50" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-ogr-primary-100 bg-ogr-primary-50 px-3 py-1 text-xs font-semibold text-ogr-primary-700">
              <span className="h-1.5 w-1.5 rounded-full bg-ogr-primary-500" />
              Research workspace
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-ogr-slate-950 sm:text-3xl">
              Welcome to OpenGeoResearch
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-ogr-slate-600 sm:text-base">
              Manage research projects, spatial data, field activities,
              and analytical workflows from one connected workspace.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-ogr-md bg-ogr-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-ogr-sm transition hover:bg-ogr-primary-700 hover:shadow-ogr-md focus:outline-none focus:ring-2 focus:ring-ogr-primary-500 focus:ring-offset-2"
            >
              View Projects
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Card>

      {/* Overview */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-ogr-slate-900">
            Workspace overview
          </h2>

          <p className="mt-1 text-sm text-ogr-slate-500">
            A quick look at the research resources available to you.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Projects */}
          <Card
            hover
            className="relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-ogr-primary-50" />

            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ogr-primary-50 text-ogr-primary-700">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5Z" />
                  <path d="M3 12l9 4.5 9-4.5" />
                  <path d="M3 16.5 12 21l9-4.5" />
                </svg>
              </div>

              <p className="mt-5 text-sm font-medium text-ogr-slate-500">
                Projects
              </p>

              <p className="mt-1 text-3xl font-bold tracking-tight text-ogr-slate-950">
                {projects.length}
              </p>

              <p className="mt-2 text-xs text-ogr-slate-500">
                Research projects available to you
              </p>
            </div>
          </Card>

          {/* Research Studies */}
          <Card
            hover
            className="relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-ogr-geo-50" />

            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ogr-geo-50 text-ogr-geo-700">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z" />
                  <path d="M4 5.5V21" />
                  <path d="M8 7h8M8 11h8M8 15h5" />
                </svg>
              </div>

              <p className="mt-5 text-sm font-medium text-ogr-slate-500">
                Research Studies
              </p>

              <p className="mt-1 text-3xl font-bold tracking-tight text-ogr-slate-950">
                —
              </p>

              <p className="mt-2 text-xs text-ogr-slate-500">
                Research studies
              </p>
            </div>
          </Card>

          {/* Data Collection */}
          <Card
            hover
            className="relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-ogr-accent-50" />

            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ogr-accent-50 text-ogr-accent-700">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path d="M5 4h14v16H5z" />
                  <path d="M8 8h8M8 12h8M8 16h5" />
                </svg>
              </div>

              <p className="mt-5 text-sm font-medium text-ogr-slate-500">
                Data Collection
              </p>

              <p className="mt-1 text-3xl font-bold tracking-tight text-ogr-slate-950">
                —
              </p>

              <p className="mt-2 text-xs text-ogr-slate-500">
                Data collection activities
              </p>
            </div>
          </Card>

          {/* Responses */}
          <Card
            hover
            className="relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-ogr-geo-50" />

            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ogr-geo-50 text-ogr-geo-700">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path d="M4 5h16v11H8l-4 4V5Z" />
                  <path d="M8 9h8M8 12h5" />
                </svg>
              </div>

              <p className="mt-5 text-sm font-medium text-ogr-slate-500">
                Responses
              </p>

              <p className="mt-1 text-3xl font-bold tracking-tight text-ogr-slate-950">
                —
              </p>

              <p className="mt-2 text-xs text-ogr-slate-500">
                Research responses
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Recent Projects */}
      <Card
        title="Recent Projects"
        description="Your most recently available research projects."
        actions={
          <Link
            to="/projects"
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-semibold text-ogr-primary-600 transition hover:bg-ogr-primary-50 hover:text-ogr-primary-700"
          >
            View all
            <span aria-hidden="true">→</span>
          </Link>
        }
      >
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-ogr-slate-300 bg-ogr-slate-50/70 px-6 py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-ogr-slate-400 shadow-ogr-sm">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-6 w-6"
              >
                <path d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5Z" />
                <path d="M3 12l9 4.5 9-4.5" />
                <path d="M3 16.5 12 21l9-4.5" />
              </svg>
            </div>

            <p className="mt-4 font-semibold text-ogr-slate-800">
              No projects yet
            </p>

            <p className="mt-1 max-w-sm text-sm leading-6 text-ogr-slate-500">
              Research projects you have access to will appear here.
            </p>

            <Link
              to="/projects"
              className="mt-5 inline-flex items-center gap-2 rounded-ogr-md border border-ogr-primary-200 bg-white px-4 py-2 text-sm font-semibold text-ogr-primary-700 transition hover:bg-ogr-primary-50"
            >
              Explore projects
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {projects.slice(0, 5).map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="group flex items-center justify-between gap-4 rounded-lg border border-transparent px-4 py-4 transition hover:border-ogr-slate-200 hover:bg-ogr-slate-50"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ogr-primary-50 text-ogr-primary-700 transition group-hover:bg-ogr-primary-100">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-5 w-5"
                    >
                      <path d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5Z" />
                      <path d="M3 12l9 4.5 9-4.5" />
                      <path d="M3 16.5 12 21l9-4.5" />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <h4 className="truncate text-sm font-semibold text-ogr-slate-900 transition group-hover:text-ogr-primary-700">
                      {project.name}
                    </h4>

                    <p className="mt-1 text-xs font-medium text-ogr-slate-500">
                      {project.code}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <StatusBadge status={project.status} />

                  <span className="flex h-8 w-8 items-center justify-center rounded-full text-ogr-slate-400 transition group-hover:bg-white group-hover:text-ogr-primary-600">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>

      {/* Platform Information */}
      <Card
        className="border-ogr-geo-100 bg-ogr-geo-50/40"
        bodyClassName="p-5 sm:p-6"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-ogr-geo-600 shadow-ogr-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 10v6M12 7.5v.5" />
            </svg>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ogr-slate-900">
              Your research workspace
            </h3>

            <p className="mt-1 max-w-3xl text-sm leading-6 text-ogr-slate-600">
              OpenGeoResearch brings projects, data collection, forms,
              spatial analysis, and research responses together in one
              platform.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;