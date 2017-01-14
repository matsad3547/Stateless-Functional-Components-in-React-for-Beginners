import React, { Component } from 'react';
import { AddTodo, VisibleTodoList, Footer} from './classComponents'

//how I like to start:
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

// class AddTodo extends Component {
//
//   render() {
//     return (
//       <div>
//         <form onSubmit={ e => {
//             e.preventDefault()
//             this.props.addTodo(this.input.value)
//             this.input.value = ''
//           }}>
//           <input type="text" ref={ (input) => this.input = input }></input>
//           <button type="submit" >Add Todo</button>
//         </form>
//       </div>
//     )
//   }
// }
//
// // const AddTodo = () => (
// //   <div>
// //     <h2>Form to add todos will go here</h2>
// //   </div>
// // )
//
// const getVisibleTodos = (todos, filter) => {
//   switch (filter) {
//     case 'SHOW_ALL':
//     return todos
//     case 'SHOW_ACTIVE':
//     return todos.filter( t => !t.completed )
//     case 'SHOW_COMPLETED':
//     return todos.filter( t => t.completed )
//     default:
//     throw new Error('Unknown filter:', filter)
//   }
// }
//
// class VisibleTodoList extends Component {
//
//   render () {
//
//     const filter = this.props.visibilityFilter
//     const todos = getVisibleTodos(this.props.todos, filter)
//     const toggleTodo = this.props.toggleTodo
//
//     return (
//       <div>
//         <ul>
//           {todos.map( todo =>
//             <Todo key={todo.id}
//               onClick={ () => toggleTodo(todo.id) }
//               {...todo}
//               />
//           )}
//         </ul>
//       </div>
//     )
//   }
// }
//
// class Todo extends Component {
//
//   render () {
//
//     const text = this.props.text
//     const completed = this.props.completed
//     const onClick = this.props.onClick
//
//     // const { text, completed, onClick } = this.props
//
//     return (
//       <li
//         onClick={onClick}
//         style={{textDecoration: completed ? 'line-through' : 'none'}}>
//         {text}
//       </li>
//     )
//   }
// }
//
//
//
// // const VisibleTodoList = () => (
// //   <div>
// //     <ul>
// //
// //     </ul>
// //   </div>
// // )
//
// // const Footer = () => (
// //   <div>
// //     <h2>Filter Links will go here</h2>
// //   </div>
// // )
//
// class Footer extends Component {
//   render() {
//     const setVisibilityFilter = this.props.setVisibilityFilter
//     return (
//       <p>
//         show:
//         <FilterLink filter="SHOW_ALL" onClick={setVisibilityFilter} >
//           All
//         </FilterLink>
//         {', '}
//         <FilterLink filter="SHOW_ACTIVE" onClick={setVisibilityFilter} >
//           Active
//         </FilterLink>
//         {', '}
//         <FilterLink filter="SHOW_COMPLETED" onClick={setVisibilityFilter} >
//           Completed
//         </FilterLink>
//       </p>
//     )
//   }
// }
//
// const FilterLink = ({ onClick, filter, children }) => {
//
//   return (
//
//     <a href="#"
//       onClick={ e => {
//         e.preventDefault()
//         onClick(filter)
//       }}>
//       {children}
//     </a>
//   )
// }
