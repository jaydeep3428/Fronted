import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Hello_word from './Hello_word.jsx'
import Students from './Students.jsx'
import Input_field from './Input_field.jsx'
import Toggle from './Toggle.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Hello_word /> */}
    {/* <App /> */}
    {/* <Students name={'Jaydeep'} /> */}
    {/* <Input_field /> */}

    <Toggle />
  </React.StrictMode>,
)
