import logo from "../assets/images/logos.svg";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6 p-4" >
      <img src={logo} alt="OpenGeoResearch Logo" height="300" width="400" />
      Opengeoresearch
      <div className="flex flex-wrap gap-3">
        <Button>Primary</Button>

        <Button variant="secondary">Secondary</Button>

        <Button variant="outline">Outline</Button>

        <Button variant="ghost">Ghost</Button>

        <Button variant="danger">Delete</Button>

        <Button variant="warning">Warning</Button>

        <Button loading>Loading</Button>
      </div>
      <Input
        label="Project Name"
        name="projectName"
        placeholder="Enter project name"
        required
      />
      <Input
        label="Description"
        name="description"
        placeholder="Enter a description"
        helpText="Provide a brief description of the project."
      />
      <Input
        label="Project Code"
        name="projectCode"
        value="OGR-2026-0001"
        disabled
      />
      <Input
        label="Example with Error"
        name="errorExample"
        error="This field is required."
      />
    </div>
  );
}

export default Home;
