import { useState, useMemo } from "react";

// ... rest of your component code

const projects = [
  { director: "James Smith", project: "Cloud Integration Initiative" },
  { director: "James Smith", project: "Mobile App Redesign" },
  // ... include all other projects here
];

function ReportForm() {
  const [selectedDirector, setSelectedDirector] = useState("");
  const [reports, setReports] = useState(() =>
    projects.map((project) => ({
      director: project.director,
      project: project.project,
      report: "",
    }))
  );

  // Extract a unique list of directors
  const directors = useMemo(() => {
    const directorSet = new Set(projects.map((p) => p.director));
    return ["All", ...Array.from(directorSet)];
  }, []);

  const handleChange = (index: number, value: string) => {
    const updatedReports = [...reports];
    updatedReports[index].report = value;
    setReports(updatedReports);
  };

  const handleDirectorChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDirector(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Reports:", reports);
  };

  return (
    <div>
      <select value={selectedDirector} onChange={handleDirectorChange}>
        {directors.map((director) => (
          <option key={director} value={director}>
            {director}
          </option>
        ))}
      </select>
      <form onSubmit={handleSubmit}>
        {reports
          .filter(
            (item) =>
              item.director === selectedDirector || selectedDirector === "All"
          )
          .map((item, index) => (
            <div key={index}>
              <h3>
                {item.director}: {item.project}
              </h3>
              <textarea
                value={item.report}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder="Enter report here"
              />
            </div>
          ))}
        <button type="submit">Submit Reports</button>
      </form>
    </div>
  );
}

export default ReportForm;
