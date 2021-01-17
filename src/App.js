import React from "react";
import "./App.css";

import Header from "./components/Header";
import ToyForm from "./components/ToyForm";
import ToyContainer from "./components/ToyContainer";

const API = "http://localhost:3000/toys";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      display: false,
      grabToys: [],
    };
  }

  componentDidMount() {
    fetch(API)
      .then((resp) => resp.json())
      .then((toys) => {
        this.setState({
          grabToys: toys,
        });
      });
  }

  handleDelete = (deleteToy) => {
    console.log(deleteToy, "deleteToy");
    fetch(`http://localhost:3000/toys/${deleteToy}`, { method: "DELETE" })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        this.setState({
          grabToys: this.state.grabToys.filter((toy) => {
            console.log(toy);
            return toy.id !== deleteToy;
          }),
        });
      });
  };

  handleLike = (toy) => {
    console.log(toy, "handle like");
    const data = { ...toy, likes: toy.likes + 1 };
    const reqObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(API + `/${toy.id}`, reqObj)
      .then((req) => req.json())
      .then((newToy) => {
        console.log(newToy, "new like");
        let updatedToys = [...this.state.grabToys];
        this.setState({
          grabToys: updatedToys.map((toy) => {
            return toy.id === newToy.id ? newToy : toy;
          }),
        });

        // this.setState({ grabToys: updatedToys });
      });
  };

  handleClick = () => {
    console.log("handle click");
    let newBoolean = !this.state.display;
    this.setState({
      display: newBoolean,
    });
  };

  handleNewToy = (toy) => {
    // console.log(toy,"NEW TOY BUTTON")
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(toy),
    };

    fetch(API, reqObj)
      .then((req) => req.json())
      .then((newToy) => {
        let updatedToys = [...this.state.grabToys, newToy];
        this.setState({
          grabToys: updatedToys,
          display: false,
        });
      });
  };

  render() {
    // console.log(this.state.grabToys)
    return (
      <>
        <Header />
        {this.state.display ? (
          <ToyForm handleNewToy={this.handleNewToy} />
        ) : null}
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer
          handleDelete={this.handleDelete}
          handleLike={this.handleLike}
          toys={this.state.grabToys}
        />
      </>
    );
  }
}

export default App;
