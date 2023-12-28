import { useState, useEffect } from "react";
import { readCSV } from "./test_csv_util.ts";
import MDEditor from "@uiw/react-md-editor";

interface CSVReaderProps {
  onFormSubmit: (director: string, project: string, report: string) => void;
}

interface CsvDataRow {
  Director: string;
  Project: string;
  // Add more fields as per your CSV structure
}
const CSVReader = ({ onFormSubmit }: CSVReaderProps) => {
  const [data, setData] = useState<CsvDataRow[]>([]);
  const [uniqueDirectors, setUniqueDirectors] = useState<string[]>([]);
  const [selectedDirector, setSelectedDirector] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [markdownResponse, setMarkdownResponse] = useState("");

  useEffect(() => {
    readCSV("src/components/data/projects.csv", (csvData: CsvDataRow[]) => {
      setData(csvData);
      const directors = new Set(csvData.map((row) => row.Director));
      setUniqueDirectors(Array.from(directors));
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("Selected Director:", selectedDirector);
    // console.log("Selected Project:", selectedProject);
    // console.log("Markdown Response:", markdownResponse);
    onFormSubmit(selectedDirector, selectedProject, markdownResponse);
  };

  const handleDirectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDirector(e.target.value);
    setSelectedProject("");
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProject(e.target.value);
  };
  const handleMarkdownChange = (value?: string) => {
    setMarkdownResponse(value || "");
  };

  const filteredProjects = selectedDirector
    ? data.filter((row) => row.Director === selectedDirector)
    : [];
  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">CSV Reader</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="directorSelect" className="form-label">
                Choose a Director:
              </label>
              <select
                id="directorSelect"
                className="form-select"
                value={selectedDirector}
                onChange={handleDirectorChange}
              >
                {uniqueDirectors.map((director, index) => (
                  <option key={index} value={director}>
                    {director}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="projectSelect" className="form-label">
                Choose a Project:
              </label>
              <select
                id="projectSelect"
                className="form-select"
                value={selectedProject}
                onChange={handleProjectChange}
              >
                {filteredProjects.map((row, index) => (
                  <option key={index} value={row.Project}>
                    {row.Project}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3" data-color-mode="light">
              <label htmlFor="markdownResponse" className="form-label">
                Markdown Response:
              </label>
              <MDEditor
                id="markdownResponse"
                value={markdownResponse}
                onChange={handleMarkdownChange}
                style={{ height: "200px" }} // Adjust height as needed
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CSVReader;
