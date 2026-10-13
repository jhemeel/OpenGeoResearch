import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import Organizations from "./pages/Organizations";

import ProjectCreate from "./pages/ProjectCreate";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectEdit from "./pages/ProjectEdit";

import OrganizationDetails from "./pages/OrganizationDetails";
import OrganizationCreate from "./pages/OrganizationCreate";
import OrganizationEdit from "./pages/OrganizationEdit";
import OrganizationMembers from "./pages/OrganizationMembers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects/new" element={<ProjectCreate />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id/edit" element={<ProjectEdit />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/organizations/new" element={<OrganizationCreate />} />
            <Route
              path="/organizations/:id"
              element={<OrganizationDetails />}
            />
            <Route
              path="/organizations/:id/edit"
              element={<OrganizationEdit />}
            />
            <Route
              path="/organizations/:id/members"
              element={<OrganizationMembers />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
