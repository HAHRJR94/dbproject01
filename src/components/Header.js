import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className='container-fluid bg-success p-2'>
      <NavLink to={'/'} className='nav-link'>
        <h1 className='text-center text-white display-4 border border-light rounded'>
          Administrador de Pacientes
        </h1>
      </NavLink>
    </header>
  )
}

export default Header
