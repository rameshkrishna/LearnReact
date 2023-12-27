import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { readCSV } from "./test_csv_util.js";
import MDEditor from "@uiw/react-md-editor";

const FormDataSchema = z.object({
  director: z
    .string()
    .min(5, "Director name must be at least 5 characters long"),
  project: z
    .string()
    .min(10, "Project name must be at least 10 characters long"),
  markdownResponse: z.string().min(3),
});

interface FormValidationExampleZodProps {
  onFormSubmit: (data: any) => void;
}

const FormValidationExampleZod = ({
  onFormSubmit,
}: FormValidationExampleZodProps) => {
  const [data, setData] = React.useState([]);
  const [uniqueDirectors, setUniqueDirectors] = React.useState([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormDataSchema),
  });
  const selectedDirector = watch("director");
  const markdownResponse = watch("markdownResponse");

  useEffect(() => {
    readCSV("src/components/data/projects.csv", (csvData) => {
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
          {Object.keys(errors).length > 0 && (
            <div className="alert alert-danger mt-3" role="alert">
              {errors.director && <p>{errors.director.message}</p>}
              {errors.project && <p>{errors.project.message}</p>}
              {errors.markdownResponse && (
                <p>{errors.markdownResponse.message}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormValidationExampleZod;