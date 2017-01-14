import React from 'react'
import { getVisibleTodos } from './helperFunctions'

export const AddTodo = (props) => {

  const addTodo = props.addTodo

  let input

  return (
    <div>
      <form onSubmit={ e => {
          e.preventDefault()
          addTodo(input.value)
          input.value = ''
        }}>
        <input type="text" ref={ node => input = node }></input>
        <button type="submit" >Add Todo</button>
      </form>
    </div>
  )
}

export const VisibleTodoList = (props) => {

  const { visibilityFilter, toggleTodo } = props

  const todos = getVisibleTodos(props.todos, visibilityFilter)

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

const Todo = ({ text, completed, onClick }) => (

  <li
    onClick={onClick}
    style={{textDecoration: completed ? 'line-through' : 'none'}}>
    {text}
  </li>
)

export const Footer = ({ setVisibilityFilter }) => (

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



const FilterLink = ({ onClick, filter, children }) => (

  <a href="#"
    onClick={ e => {
      e.preventDefault()
      onClick(filter)
    }}>
    {children}
  </a>
)
