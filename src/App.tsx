import CoursePicker from "./CoursePicker";
import "./App.css";
import courses from "./courses.json";

function App() {
  return <CoursePicker courses={courses} />;
}

export default App;
