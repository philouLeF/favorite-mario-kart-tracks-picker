import CoursePicker from "./CoursePicker";
import "./App.css";
import courses from "./courses.json";

function App() {
  return (
    <div>
      <h1>Welcome to the favorite Mario Kart 8 course picker</h1>
      <p>
        For each group of tracks presented to you, click on your favorite. Your
        favorite tracks will then begin to appear. You can continue as long as
        you like to build up an arbitrarily long list of your favorite tours. In
        principle, this selector is perfectly accurate, provided you choose
        consistently - you'll get your second favorite right, even if it's
        opposite your absolute favorite at the start, for example. Click here to
        find out more about how this tool works. Various filtering and selector
        layout options are available in the "Options" tab next to "Favorites
        found" below.
      </p>
      <CoursePicker courses={courses} />
    </div>
  );
}

export default App;
