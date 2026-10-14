import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // Load the toys from the backend when the app first mounts.
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((toyData) => setToys(toyData))
      .catch((error) => console.error("Error loading toys:", error));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // Add the saved toy to the collection.
function handleAddToy(newToy) {
  setToys((currentToys) => [...currentToys, newToy]);
}

// Remove the deleted toy from the displayed collection.
function handleDeleteToy(deletedToyId) {
  setToys((currentToys) =>
    currentToys.filter((toy) => toy.id !== deletedToyId)
  );
}

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDeleteToy={handleDeleteToy} />
    </>
  );
}

export default App;