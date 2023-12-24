// import Button from "./components/Button";
// import Message from "./Message";
// import ListGroup from "./components/ListGroup";
// import Card from "./components/Card";
import ConfirmModal from "./components/ConfirmModal";
import { useState } from "react";
// import EmailPasswordForm from "./components/Form";
// import ReportForm from "./components/ReportForm";
import Nav from "./components/BootStrapComponents/Nav";
// import CSVReader from "./components/CSVReader";
import ReactHookExample from "./components/ReactHookExample";

function App() {
  // const [activeItem, setActiveItem] = useState<string>("");
  const [selectedDirector, setSelectedDirector] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [markdownResponse, setMarkdownResponse] = useState<string>("");
  // const handleActiveItem = (item: string) => {
  //   setActiveItem(item);
  // };
  // const items = [
  //   "Ramesh",
  //   "Krishna",
  //   "Leo",
  //   "Puttapaka",
  //   "Hyderabad",
  //   "Shilpa",
  //   "Shivani",
  //   "Shireesha",
  // ];

  // const handleClick = (item: string) => {
  //   console.log(item);
  // };
  // const handleCSVData = (data) => {
  //   console.log("got data");
  //   console.log(data);
  // };
  // const handleFormSubmit = (
  //   director: string,
  //   project: string,
  //   report: string
  // ) => {
  //   console.log("Director:", director);
  //   console.log("Project:", project);
  //   console.log("Markdown Response:", report);
  //   setSelectedDirector(director);
  //   setSelectedProject(project);
  //   setMarkdownResponse(report);
  // };
  const handleFormSubmit = (data) => {
    console.log(data.director);
    setSelectedDirector(data.director);
    setSelectedProject(data.project);
    setMarkdownResponse(data.markdownResponse);
  };
  return (
    <div>
      <Nav />
      {/* <Message /> */}
      {/* <div>
        <Button link="https://google.com" btxtxt="Google" />
      </div>
      <ListGroup
        items={items}
        heading="List of lists"
        onSelectItem={(item) => {
          handleClick(item);
          handleActiveItem(item);
        }}
      /> */}
      <ConfirmModal
        ModalText={[markdownResponse, selectedDirector, selectedProject]}
      />

      {/* <EmailPasswordForm /> */}
      {/* <CSVReader onFormSubmit={handleFormSubmit} /> */}
      <ReactHookExample onFormSubmit={handleFormSubmit} />
    </div>
  );
}

export default App;