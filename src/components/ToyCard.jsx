import React from "react";

function ToyCard({ toy, onDeleteToy }) {
  function handleDonate() {
    // Delete from the backend before removing the card.
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not delete toy");
        }

        onDeleteToy(toy.id);
      })
      .catch((error) => console.error("Error donating toy:", error));
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button className="like-btn">Like {"<3"}</button>
      <button className="del-btn" onClick={handleDonate}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;