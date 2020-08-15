import React from 'react'

import Form from './Form'
import Dashboard from './Dashboard'

const Principal = () => {
  return (
    <div>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-10'>
            <Form />
          </div>
        </div>
        <div className='mt-5'>
          <Dashboard />
        </div>
      </div>
    </div>
  )
}

export default Principal
