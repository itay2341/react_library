import React from 'react'
import { useEffect } from 'react'

const ErrorPage = () => {
  const loading = () => {
    const el = document.getElementById('head')
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }


  useEffect(() => {
    loading()
  }, [])
  return (
    <div>
      <div id='head'></div>
      <h1>Error</h1>
      <h1>Error</h1>
      <h1>Error</h1>
      <h1>Error</h1>
      <h1>Error</h1>
      <h1>Error</h1>
      <h1>Error</h1>
      <h1>Error</h1>
    </div>
  )
}

export default ErrorPage