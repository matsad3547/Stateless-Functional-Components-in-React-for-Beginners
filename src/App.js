import React, { Component } from 'react';

//how I like to start
// const App = () => (
//   <div>
//     <h1>This is a To-Do app</h1>
//     <AddTodo />
//     <VisibleTodoList />
//     <Footer />
//   </div>
// )

class App extends Component {
  constructor() {
    super()
    this.addTodo = this.addTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
  }
  state = {
    todos: [],
    visiblityFilter: "SHOW_ALL",
  }

  addTodo(input) {
    const text = input
    const currentTodos = [...this.state.todos]
    let id
    if (this.state.todos.length > 0) {
      id = currentTodos[currentTodos.length - 1].id
      id++
    }
    else id = 0
    const todos = currentTodos
                  .concat({
                          id,
                          text,
                          completed: false,
                          })
     this.setState({
      todos,
    })

    }

  toggleTodo(id) {
    let todos = this.state.todos
    const todo = todos.find( todo => todo.id === id )
    if (todo.completed) todo.completed = false
    else todo.completed = true
    this.setState({
      todos
    })
  }

  setVisibilityFilter(filter) {
    this.setState({
      visiblityFilter: filter,
    })
  }

  render() {
    return (
      <div>
        <AddTodo
          addTodo={this.addTodo}
          />
        <VisibleTodoList
          todos={this.state.todos}
          toggleTodo={this.toggleTodo}
          />
        <Footer />
      </div>
    );
  }
}

export default App;

class AddTodo extends Component {

  render() {
    return (
      <div>
        <form onSubmit={ e => {
            e.preventDefault()
            this.props.addTodo(this.input.value)
            this.input.value = ''
          }}>
          <input type="text" ref={ (input) => this.input = input }></input>
          <button type="submit" >Add Todo</button>
        </form>
      </div>
    )
  }
}

// const AddTodo = () => (
//   <div>
//     <h2>Form to add todos will go here</h2>
//   </div>
// )

class VisibleTodoList extends Component {
  render () {
    const todos = this.props.todos
    const toggleTodo = this.props.toggleTodo

    return (
      <div>
        <ul>
          {todos.map( todo =>
            <Todo key={todo.id}
              onClick={ () => toggleTodo(todo.id) }
              {...todo}
              />
          )}
        </ul>
      </div>
    )
  }
}

class Todo extends Component {
  render () {
    const text = this.props.text
    const completed = this.props.completed
    const onClick = this.props.onClick

    return (
      <li
        onClick={onClick}
        style={{textDecoration: completed ? 'line-through' : 'none'}}>
        {text}
      </li>
    )
  }
}

// const VisibleTodoList = () => (
//   <div>
//     <ul>
//
//     </ul>
//   </div>
// )

const Footer = () => (
  <div>
    <h2>Filter Links will go here</h2>
  </div>
)
