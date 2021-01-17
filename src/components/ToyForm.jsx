import React, { Component } from 'react';

class ToyForm extends Component {

  constructor(props){
    super(props)
    this.state={
      name: "",
      image: "",
      likes: 0
    }

  }

  handleChange = (e) =>{
    this.setState({...this.state,
     [e.target.name] : e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let toy = {...this.state}
    this.setState({ 
      name: "",
      image: "",
      likes: 0
     });
    this.props.handleNewToy(toy)
  }

  render() {
    // console.log(this.props)
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a toy!</h3>
          <input onChange={this.handleChange} value={this.state.name} type="text" name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input onChange={this.handleChange} value={this.state.image} type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
