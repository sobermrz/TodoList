import React, { Component } from "react"
import PropTypes from "prop-types"

class AddTodo extends Component {
  state = {
    title: "",
    name: ""
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.addTodo(this.state.title, this.state.name)
    this.setState({ title: "", name: "" })
    // this.props.addTodo(this.state.name)
    // this.setState({ name: "" })
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
        {/* input the name */}
        <input
          type="text"
          name="name"
          style={{ flex: "10", padding: "5px" }}
          placeholder="enter name ..."
          value={this.state.name}
          onChange={this.onChange}
        />

        {/* item need to be added */}
        <input
          type="text"
          name="title"
          style={{ flex: "10", padding: "5px" }}
          placeholder="Add Todo ..."
          value={this.state.title}
          onChange={this.onChange}
        />

        <input type="submit" value="Submit" className="btn" style={{ flex: "1" }} />
      </form>
    )
  }
}

//PropTypes
AddTodo.protoType = {
  addTodo: PropTypes.func.isRequired
}

export default AddTodo
