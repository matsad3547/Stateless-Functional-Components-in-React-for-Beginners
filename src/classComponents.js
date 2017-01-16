import React, { Component } from 'react'
import { getVisibleTodos } from './helperFunctions'

export class AddTodo extends Component {

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

//more React-y way to do this - controlled component
// export class AddTodo extends Component {
//
//   constructor(props) {
//     super(props)
//     this.handleOnChange = this.handleOnChange.bind(this)
//     this.handleOnSubmit = this.handleOnSubmit.bind(this)
//   }
//   state = {
//     newTodo: '',
//   }
//
//   handleOnChange(e) {
//     let newTodo = e.target.value
//     this.setState({
//       newTodo,
//     })
//   }
//
//   handleOnSubmit(e) {
//     e.preventDefault()
//         this.props.addTodo(this.state.newTodo)
//     this.setState({
//       newTodo: '',
//     })
//   }
//
//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleOnSubmit}>
//           <input type="text"
//             value={this.state.newTodo}
//             onChange={this.handleOnChange}></input>
//           <button type="submit" >Add Todo</button>
//         </form>
//       </div>
//     )
//   }
// }

export class VisibleTodoList extends Component {

  render () {

    const filter = this.props.visibilityFilter
    const toggleTodo = this.props.toggleTodo
    const todos = getVisibleTodos(this.props.todos, filter)

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

    //this messiness can be replaced by...
    // const text = this.props.text
    // const completed = this.props.completed
    // const onClick = this.props.onClick

    //this - through the power of destructuring
    const { text, completed, onClick } = this.props

    return (
      <li
        onClick={onClick}
        style={{textDecoration: completed ? 'line-through' : 'none'}}>
        {text}
      </li>
    )
  }
}

export class Footer extends Component {
  render() {

    const setVisibilityFilter = this.props.setVisibilityFilter

    return (
      <p>
        show:
        <FilterLink filter="SHOW_ALL" onClick={setVisibilityFilter} >
          All
        </FilterLink>
        {', '}
        <FilterLink filter="SHOW_ACTIVE" onClick={setVisibilityFilter} >
          Active
        </FilterLink>
        {', '}
        <FilterLink filter="SHOW_COMPLETED" onClick={setVisibilityFilter} >
          Completed
        </FilterLink>
      </p>
    )
  }
}

class FilterLink extends Component {
  render() {

    const { filter, onClick, children} = this.props

    return (

      <a href="#"
        onClick={ e => {
          e.preventDefault()
          onClick(filter)
        }}>
        {children}
      </a>
    )
  }
}
