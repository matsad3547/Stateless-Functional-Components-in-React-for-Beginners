import React, { Component } from 'react';
// import { AddTodo, VisibleTodoList, Footer} from './classComponents'
import { AddTodo, VisibleTodoList, Footer} from './statelessFunctionalComponents'

//how I like to start:
// 
// const App = () => (
//   <div>
//     <h1>This is a To-Do app</h1>
//     <AddTodo />
//     <VisibleTodoList />
//     <Footer />
//   </div>
// )
//
// const AddTodo = () => (
//   <div>
//     <h1>This is the add todo component</h1>
//   </div>
// )

class App extends Component {
  constructor() {
    super()
    this.addTodo = this.addTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.setVisibilityFilter = this.setVisibilityFilter.bind(this);
  }
  state = {
    todos: [],
    visibilityFilter: "SHOW_ALL",
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

  //if you forget to bind, your function won't work!
  setVisibilityFilter(filter) {
    this.setState({
      visibilityFilter: filter,
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
          visibilityFilter={this.state.visibilityFilter}
          toggleTodo={this.toggleTodo}
          />
        <Footer
          setVisibilityFilter={this.setVisibilityFilter}/>
      </div>
    );
  }
}

export default App;
