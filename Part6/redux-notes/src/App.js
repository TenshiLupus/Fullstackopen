import { useEffect } from "react";
import NewNote from "./components/NewNote/NewNote";
import Notes from "./components/Notes/Notes";
import VisibilityFilter from "./components/VisibilityFilter/VisibilityFilter";

import noteService from "./services/notes";
import { setNotes } from "./reducers/noteReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(setNotes(await noteService.getAll()));
    })();
  }, [dispatch]);

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
