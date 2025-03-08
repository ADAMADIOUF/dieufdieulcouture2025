// src/components/Error.js
import React from 'react'

const Error = ({ message }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Something Went Wrong</h1>
      <p style={styles.message}>
        {message || 'An unexpected error occurred. Please try again later.'}
      </p>
    </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#d9534f',
  },
  message: {
    fontSize: '1.2rem',
    color: '#777',
  },
}

export default Error
