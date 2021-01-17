import React from "react";
import ToyCard from "./ToyCard";

const ToyContainer = (props) => {
  // console.log(props)
  return (
    <div id="toy-collection">
      {props.toys.map((toy) => {
        // console.log(toy,"toy")
        return (
          <ToyCard
            key={toy.id}
            toy={toy}
            handleLike={props.handleLike}
            handleDelete={props.handleDelete}
          />
        );
      })}
    </div>
  );
};

export default ToyContainer;
