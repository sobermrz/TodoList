import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import "./App.css"
import AddTodo from "./components/AddTodo"
import Header from "./components/layout/Header"
import Todos from "./components/Todos"
// import { v4 as uuid } from "uuid"
import About from "./components/pages/About"
import axios from "axios"

const qs = (function (a) {
  if (a === "") return {}
  let b = {}
  for (let i = 0; i < a.length; ++i) {
    let p = a[i].split("=", 2)

    if (p.length === 1) b[p[0]] = ""
    else b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "))
    console.log(b[p[0]])
  }
  return b
})(window.location.search.substr(1).split("&"))

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get(qs["webapp"] + "/users").then(res => this.setState({ todos: res.data }))
  }

  // componentDidMount() {
  //   fetch("/users")
  //     .then(res => res.json())
  //     .then(todos => this.setState({ todos: res.data }))
  //   fetch("/users")
  //     .then(res => res.json())
  //     .then(todos => this.setState({ todos }))
  // }

  //toggle complete
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }

        return todo
      })
    })
  }

  //Delete Todo
  delTodo = id => {
    axios.delete(qs["webapp"] + `/users/${id}`).then(res =>
      this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      })
    )
  }

  //Add Todo
  addTodo = (title, name) => {
    axios
      .post(qs["webapp"] + "/users", {
        name,
        title,
        completed: false
      })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }))
  }

  render() {
    console.log(this.state.todos)
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
