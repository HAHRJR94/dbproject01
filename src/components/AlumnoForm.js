import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useContext } from 'react'
import { FirebaseContext } from '../firebase/context'

const AlumnoForm = () => {
  let history = useHistory()
  const { firebase } = useContext(FirebaseContext)

  const [newAlumno, setAlumno] = useState({ nombre: '', noCuenta: '' })
  const { nombre, noCuenta } = newAlumno

  const handleChange = e => {
    setAlumno({ ...newAlumno, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (nombre.trim() === '' || noCuenta.trim() === '') {
      return
    }

    firebase.alumno.collection('alumnos').add(newAlumno)

    setAlumno({ nombre: '', noCuenta: '' })
    history.push('/')
  }

  return (
    <div className='row justify-content-center align-items-center mt-5 p-3'>
      <div className='card col-5'>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <legend className='text-center lead mb-5'>Agrega un nuevo alumno</legend>
            <div className='form-group'>
              <label>Nombre</label>
              <input
                className='form-control'
                type='text'
                name='nombre'
                value={nombre}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>noCuenta</label>
              <input
                className='form-control'
                type='text'
                name='noCuenta'
                value={noCuenta}
                onChange={handleChange}
              />
            </div>
            <button type='submit' className='btn btn-primary btn-block'>
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AlumnoForm
