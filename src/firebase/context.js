import React, { useState, useEffect, createContext } from 'react'
import firebase from './firebase'

export const FirebaseContext = createContext()

const Context = props => {
  const [citas, setCitas] = useState([])
  const [alumnos, setAlumnos] = useState([])
  const [update, setUpdate] = useState({})
  const [getId, setGetId] = useState('')

  useEffect(() => {
    const obtenerCitas = () => {
      firebase.db.collection('citas').orderBy('date', 'desc').onSnapshot(handleSnapshot)
    }

    const obtenerAlumnos = () => (
      firebase.alumno.collection('alumnos').orderBy('noCuenta', 'desc').onSnapshot(handleAlumno)
    )

    obtenerCitas()
    obtenerAlumnos()
  }, [])

  const handleSnapshot = snapshot => {
    const citas = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })

    setCitas(citas)
  }

  const handleAlumno = snapshot => {
    const alumnos = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })

    setAlumnos(alumnos)
  }

  const handleDelete = async id => {
    try {
      await firebase.db.collection('citas').doc(id).delete()
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdate = async id => {
    const doc = await firebase.db.collection('citas').doc(id).get()
    setUpdate({ ...doc.data() })
  }

  useEffect(() => {
    if (getId === '') {
      setUpdate({})
    } else {
      handleUpdate(getId)
    }
  }, [getId])

  return (
    <FirebaseContext.Provider
      value={{ citas, alumnos, update, getId, firebase, handleDelete, handleUpdate, setGetId }}
    >
      {props.children}
    </FirebaseContext.Provider>
  )
}
export default Context
