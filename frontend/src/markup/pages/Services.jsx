import React from 'react'
import { Link } from 'react-router'
function Services() {
  return (
    <div>
      <h2>Services</h2>
      <Link to={"/employee-list"}>
      <button>Employe List</button>
      </Link>
    </div>
  )
}

export default Services
