import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getOrganizations,
  getOrganizationTypes,
} from "../services/organizationsApi";

function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  const [organizationTypes, setOrganizationTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [ordering, setOrdering] = useState("name");

  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const params = {};
        if (search.trim()) {
          params.search = search.trim();
        }
        if (organizationType) {
          params.organization_type = organizationType;
        }
        if (ordering) {
          params.ordering = ordering;
        }

        const data = await getOrganizations(params);

        setOrganizations(data.results || data);
      } catch (error) {
        console.error(error);

        setError("Unable to load organizations.");
      } finally {
        setLoading(false);
      }
    };

    loadOrganizations();
  }, [search, organizationType, ordering]);

  useEffect(() => {
    const loadOrganizationTypes = async () => {
      try {
        const data = await getOrganizationTypes();

        setOrganizationTypes(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadOrganizationTypes();
  }, []);

  if (loading) {
    return <p>Loading organizations...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div>
        <h2>Organizations</h2>
        <div>
          <label htmlFor="organization-search">Search organizations</label>

          <br />

          <input
            id="organization-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, location, description..."
          />
        </div>
        <br />
        <div>
          {" "}
          <label htmlFor="organization-type">
            {" "}
            Organization Type{" "}
          </label> <br />{" "}
          <select
            id="organization-type"
            value={organizationType}
            onChange={(event) => setOrganizationType(event.target.value)}
          >
            {" "}
            <option value=""> All types </option>{" "}
            {organizationTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {" "}
                {type.label}{" "}
              </option>
            ))}{" "}
          </select>{" "}
        </div>{" "}
        <br />
        <div>
          <label htmlFor="organization-ordering">Sort by</label>

          <br />

          <select
            id="organization-ordering"
            value={ordering}
            onChange={(event) => setOrdering(event.target.value)}
          >
            <option value="name">Name (A–Z)</option>

            <option value="-name">Name (Z–A)</option>

            <option value="-created_at">Newest first</option>

            <option value="created_at">Oldest first</option>
          </select>
        </div>
        <br />
        <Link to="/organizations/new">Create Organization</Link>
      </div>

      {organizations.length === 0 ? (
        <p>No organizations found.</p>
      ) : (
        <div>
          {organizations.map((organization) => (
            <article key={organization.id}>
              <h3>
                <Link to={`/organizations/${organization.id}`}>
                  {organization.name}
                </Link>
              </h3>

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
                <strong>Members:</strong> {organization.member_count}
              </p>

              <p>
                <strong>Projects:</strong> {organization.project_count}
              </p>

              {(organization.city ||
                organization.state ||
                organization.country) && (
                <p>
                  <strong>Location:</strong>{" "}
                  {[organization.city, organization.state, organization.country]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              )}

              {organization.description && <p>{organization.description}</p>}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Organizations;
