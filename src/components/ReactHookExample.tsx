import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { readCSV } from "./test_csv_util.ts";
import MDEditor from "@uiw/react-md-editor";

interface ReactHookExampleProps {
  onFormSubmit: (data: any) => void;
}
interface CsvDataRow {
  Director: string;
  Project: string;
  // Add more fields as per your CSV structure
}
const ReactHookExample = ({ onFormSubmit }: ReactHookExampleProps) => {
  const [data, setData] = React.useState<CsvDataRow[]>([]);
  const [uniqueDirectors, setUniqueDirectors] = useState<string[]>([]);

  const { register, handleSubmit, watch, setValue } = useForm();
  const selectedDirector = watch("director");
  const markdownResponse = watch("markdownResponse");

  useEffect(() => {
    readCSV("src/components/data/projects.csv", (csvData: CsvDataRow[]) => {
      setData(csvData);
      const directors = new Set(csvData.map((row) => row.Director));
      setUniqueDirectors(Array.from(directors));
    });
  }, []);

  useEffect(() => {
    setValue("project", "");
  }, [selectedDirector, setValue]);

  useEffect(() => {
    setValue("markdownResponse", markdownResponse);
  }, [markdownResponse, setValue]);

  const filteredProjects = selectedDirector
    ? data.filter((row) => row.Director === selectedDirector)
    : [];

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">CSV Reader</h2>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="mb-3">
              <label htmlFor="directorSelect" className="form-label">
                Choose a Director:
              </label>
              <select
                id="directorSelect"
                className="form-select"
                {...register("director")}
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
                {...register("project")}
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
                onChange={(content) => setValue("markdownResponse", content)}
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

export default ReactHookExample;
