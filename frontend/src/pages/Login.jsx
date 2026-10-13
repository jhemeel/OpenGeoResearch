import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      if (error.response?.data) {
        const data = error.response.data;

        setError(
          typeof data === "string"
            ? data
            : Object.entries(data)
                .map(([field, messages]) => {
                  const value = Array.isArray(messages)
                    ? messages.join(" ")
                    : typeof messages === "object" &&
                        messages !== null
                      ? JSON.stringify(messages)
                      : String(messages);

                  return `${field}: ${value}`;
                })
                .join(" | ")
        );
      } else {
        setError("Unable to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ogr-slate-50 px-4 py-10 sm:px-6">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-ogr-primary-100/70 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-ogr-geo-100/70 blur-3xl"
      />

      <div className="relative w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-ogr-primary-600 text-white shadow-ogr-md">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-9 w-9"
              aria-hidden="true"
            >
              <path d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5Z" />
              <path d="M3 12l9 4.5 9-4.5" />
              <path d="M3 16.5 12 21l9-4.5" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-ogr-slate-950 sm:text-3xl">
            OpenGeoResearch
          </h1>

          <p className="mt-2 text-sm text-ogr-slate-500">
            Research &amp; Data Analytics Platform
          </p>
        </div>

        {/* Login form */}
        <Card className="border-ogr-slate-200 shadow-ogr-lg">
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-tight text-ogr-slate-900">
              Welcome back
            </h2>

            <p className="mt-1 text-sm leading-6 text-ogr-slate-500">
              Sign in to access your research workspace.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="ogr-alert ogr-alert-error mb-5 break-words"
            >
              <p className="font-semibold">
                Sign-in failed
              </p>

              <p className="mt-1">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email address"
              name="userEmail"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              disabled={loading}
              autoComplete="email"
            />

            <Input
              label="Password"
              name="userPassword"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              disabled={loading}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
            >
              Sign in
            </Button>
          </form>

          <div className="mt-6 border-t border-ogr-slate-100 pt-5 text-center">
            <p className="text-xs leading-5 text-ogr-slate-500">
              Secure access to your research projects
              and geospatial workspace.
            </p>
          </div>
        </Card>

        <p className="mt-6 text-center text-xs text-ogr-slate-400">
          OpenGeoResearch
        </p>
      </div>
    </main>
  );
}

export default Login;
