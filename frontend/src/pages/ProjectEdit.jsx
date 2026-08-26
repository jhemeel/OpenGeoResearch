import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getProject,
  updateProject,
} from "../services/projectService";

import api from "../services/api";

function ProjectEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [organizations, setOrganizations] = useState([]);
  const [researchers, setResearchers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    principal_investigator: "",
    description: "",
    objectives: "",
    keywords: "",
    funding_agency: "",
    grant_number: "",
    budget: "",
    ethics_approval_number: "",
    start_date: "",
    end_date: "",
    status: "",
    visibility: "",
    is_active: true,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          projectResponse,
          organizationResponse,
          researcherResponse,
        ] = await Promise.all([
          getProject(id),
          api.get("organizations/"),
          api.get("profiles/researchers/"),
        ]);

        const project = projectResponse;

        setOrganizations(
          organizationResponse.data.results ||
            organizationResponse.data
        );

        setResearchers(
          researcherResponse.data.results ||
            researcherResponse.data
        );

        setFormData({
          name: project.name || "",
          organization: project.organization || "",
          principal_investigator:
            project.principal_investigator || "",
          description: project.description || "",
          objectives: project.objectives || "",
          keywords: project.keywords || "",
          funding_agency:
            project.funding_agency || "",
          grant_number:
            project.grant_number || "",
          budget:
            project.budget ?? "",
          ethics_approval_number:
            project.ethics_approval_number || "",
          start_date:
            project.start_date || "",
          end_date:
            project.end_date || "",
          status:
            project.status || "",
          visibility:
            project.visibility || "",
          is_active:
            project.is_active ?? true,
        });
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load project."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitting(true);
    setError("");

    try {
      await updateProject(id, formData);

      navigate(`/projects/${id}`);
    } catch (error) {
      console.error(error);

      if (error.response?.data) {
        setError(
          JSON.stringify(
            error.response.data
          )
        );
      } else {
        setError(
          "Unable to update project."
        );
      }

      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading project...</p>;
  }

  if (error && !formData.name) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Edit Project</h2>

      {error && (
        <div>
          <strong>Error:</strong>
          <pre>{error}</pre>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            Project Name
          </label>

          <br />

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="organization">
            Organization
          </label>

          <br />

          <select
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            required
          >
            <option value="">
              Select organization
            </option>

            {organizations.map(
              (organization) => (
                <option
                  key={organization.id}
                  value={organization.id}
                >
                  {organization.name}
                </option>
              )
            )}
          </select>
        </div>

        <br />

        <div>
          <label htmlFor="principal_investigator">
            Principal Investigator
          </label>

          <br />

          <select
            id="principal_investigator"
            name="principal_investigator"
            value={
              formData.principal_investigator
            }
            onChange={handleChange}
            required
          >
            <option value="">
              Select principal investigator
            </option>

            {researchers.map(
              (researcher) => (
                <option
                  key={researcher.id}
                  value={researcher.id}
                >
                  {researcher.name} (
                  {researcher.email})
                </option>
              )
            )}
          </select>
        </div>

        <br />

        <div>
          <label htmlFor="description">
            Description
          </label>

          <br />

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
          />
        </div>

        <br />

        <div>
          <label htmlFor="objectives">
            Objectives
          </label>

          <br />

          <textarea
            id="objectives"
            name="objectives"
            value={formData.objectives}
            onChange={handleChange}
            rows="5"
          />
        </div>

        <br />

        <div>
          <label htmlFor="keywords">
            Keywords
          </label>

          <br />

          <input
            id="keywords"
            name="keywords"
            type="text"
            value={formData.keywords}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label htmlFor="funding_agency">
            Funding Agency
          </label>

          <br />

          <input
            id="funding_agency"
            name="funding_agency"
            type="text"
            value={formData.funding_agency}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label htmlFor="grant_number">
            Grant Number
          </label>

          <br />

          <input
            id="grant_number"
            name="grant_number"
            type="text"
            value={formData.grant_number}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label htmlFor="budget">
            Budget
          </label>

          <br />

          <input
            id="budget"
            name="budget"
            type="number"
            min="0"
            step="0.01"
            value={formData.budget}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label htmlFor="ethics_approval_number">
            Ethics Approval Number
          </label>

          <br />

          <input
            id="ethics_approval_number"
            name="ethics_approval_number"
            type="text"
            value={
              formData.ethics_approval_number
            }
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label htmlFor="start_date">
            Start Date
          </label>

          <br />

          <input
            id="start_date"
            name="start_date"
            type="date"
            value={formData.start_date}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label htmlFor="end_date">
            End Date
          </label>

          <br />

          <input
            id="end_date"
            name="end_date"
            type="date"
            value={formData.end_date}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label htmlFor="status">
            Status
          </label>

          <br />

          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">
              Select status
            </option>

            <option value="DRAFT">
              Draft
            </option>

            <option value="ACTIVE">
              Active
            </option>

            <option value="COMPLETED">
              Completed
            </option>

            <option value="ARCHIVED">
              Archived
            </option>
          </select>
        </div>

        <br />

        <div>
          <label htmlFor="visibility">
            Visibility
          </label>

          <br />

          <select
            id="visibility"
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
            required
          >
            <option value="">
              Select visibility
            </option>

            <option value="PRIVATE">
              Private
            </option>

            <option value="ORGANIZATION">
              Organization
            </option>

            <option value="PUBLIC">
              Public
            </option>
          </select>
        </div>

        <br />

        <div>
          <label>
            <input
              name="is_active"
              type="checkbox"
              checked={formData.is_active}
              onChange={handleChange}
            />

            {" "}
            Active project
          </label>
        </div>

        <br />

        <button
          type="submit"
          disabled={submitting}
        >
          {submitting
            ? "Saving Changes..."
            : "Save Changes"}
        </button>

        {" "}

        <button
          type="button"
          onClick={() =>
            navigate(`/projects/${id}`)
          }
          disabled={submitting}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ProjectEdit;