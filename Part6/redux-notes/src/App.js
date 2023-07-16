import NewNote from "./components/NewNote/NewNote";
import Notes from "./components/Notes/Notes"
import VisibilityFilter from "./components/VisibilityFilter/VisibilityFilter";

const App = () => {

  return (
    <div>
      <NewNote />
      <VisibilityFilter/>
      <Notes />
    </div>
  );
};

export default App;