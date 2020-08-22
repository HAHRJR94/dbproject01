import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../firebase/context'
import moment from 'moment'
import Logo from '../images/Logo.jpg'

const Form = () => {
  const { alumnos, update, getId, setGetId, firebase } = useContext(FirebaseContext)

  //Datos del formulario
  const [paciente, setPaciente] = useState({
    nombre: '',
    edad: '',
    peso: '',
    sintomas: '',
    nCta: '',
    alumno: '',
    date: moment(Date.now()).format('L')
  })
  const [error, setError] = useState(false)
  const { nombre, edad, peso, sintomas, nCta, date } = paciente

  useEffect(() => {
    if (Object.keys(update).length > 0) {
      setPaciente(update)
    }
  }, [update])

  //Captura los datos del formulario
  const handleChange = e => {
    setPaciente({ ...paciente, [e.target.name]: e.target.value })
  }

  //Cancela la actualización de los datos
  const handleCancelUpdate = () => {
    setPaciente({ nombre: '', edad: '', peso: '', sintomas: '', nCta: '', alumno: '' })
    setGetId('')
  }

  //Envía los datos a la DB
  const handleSubmit = e => {
    e.preventDefault()

    //Valida si un campo esta vacío
    if (
      nombre.trim() === '' ||
      edad.trim() === '' ||
      sintomas.trim() === '' ||
      nCta.trim() === ''
    ) {
      setError(true)
      return
    }
    setError(false)

    //valida si se va a guardar o actualizar la información
    if (getId === '') {
      //Guarda el registro en la DB
      firebase.db.collection('citas').add(paciente)
    } else {
      //Actualiza un resgistro en la DB
      firebase.db.collection('citas').doc(getId).update(paciente)
      setGetId('')
    }
    
    //Reinicia los valores del formulario
    setPaciente({ nombre: '', edad: '', peso: '', sintomas: '', nCta: '' })
  }

  //Muestra un mensaje de error
  const dataError = () => {
    //Tiempo en que aparecera el mensaje de error
    setTimeout(() => {
      setError(false)
    }, 2500)

    return (
      <h2 className='bg-danger text-center text-white mt-5 p-3 rounded'>
        TODOS LOS CAMPOS SON OBLIGATORIOS!!!
      </h2>
    )
  }

  return (
    <section>
      {error && dataError()}

      <div className='card mt-5 p-4'>
        <form onSubmit={handleSubmit}>
          <div className='row justify-content-between align-items-center'>
            <h2 className='text-center text-primary mb-4 m-auto'>
              Administrador de pacientes
            </h2>
            <img src={Logo} width='35%' alt='Logotipo' />
          </div>
          <hr />
          <div className='row justify-content-center'>
            <div className='col-md-4 form-group'>
              <label>No. de Cuenta</label>
              <select
                className='form-control'
                name='nCta'
                value={nCta}
                onChange={handleChange}
              >
                <option value=''>-- seleccione la cuenta --</option>
                {alumnos.map(alumno => (
                  <option key={alumno.id} value={alumno.nombre}>
                    {alumno.noCuenta}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-md-5 form-group'>
              <label>Alumno</label>
              <input
                className='form-control'
                type='text'
                name='alumno'
                value={nCta}
                readOnly='readOnly'
              />
            </div>
            <div className='col-md-3 form-group'>
              <label>Fecha</label>
              <input
                className='form-control text-center'
                type='text'
                name='date'
                value={date}
              />
            </div>
          </div>
          <div className='row justify-content-center mt-3'>
            <Link className='btn btn-success' to={'/alumno-form'}>
              Nuevo Alumno
            </Link>
          </div>
          <hr />
          <div className='form-group'>
            <label>Nombre</label>
            <input
              className='form-control'
              type='text'
              name='nombre'
              value={nombre}
              onChange={handleChange}
              placeholder='Nombre del paciente'
            />
          </div>
          <div className='form-group'>
            <label>Edad</label>
            <input
              className='form-control'
              type='text'
              name='edad'
              value={edad}
              onChange={handleChange}
              placeholder='Edad'
            />
          </div>
          <div className='form-group'>
            <label>Peso</label>
            <input
              className='form-control'
              type='text'
              name='peso'
              value={peso}
              onChange={handleChange}
              placeholder='peso'
            />
          </div>
          <div className='form-group'>
            <label>Sintomas</label>
            <input
              className='form-control'
              type='text'
              name='sintomas'
              value={sintomas}
              onChange={handleChange}
              placeholder='Sintomas'
            />
          </div>
          <button className='btn btn-outline-primary btn-block' type='submit'>
            {getId === '' ? 'Guardar' : 'Actualizar'}
          </button>
          {getId !== '' && (
            <button
              className='btn btn-outline-danger btn-block mt-2'
              type='submit'
              onClick={() => handleCancelUpdate}
            >
              Cancelar
            </button>
          )}
        </form>
      </div>
    </section>
  )
}

export default Form
