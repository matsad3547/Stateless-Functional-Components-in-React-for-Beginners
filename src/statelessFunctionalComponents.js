import React, { Component } from 'react';

const FilterLink = ({ onClick, filter, children }) => {

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
