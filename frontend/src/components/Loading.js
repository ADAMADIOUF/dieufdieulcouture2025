// src/components/Loading.js
import React from 'react'

const Loading = () => {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.message}>Chargement...</p> {/* Translated to French */}
    </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', // Ensure it's centered vertically
  },
  spinner: {
    border: '8px solid #f3f3f3', // Light gray
    borderTop: '8px solid #3498db', // Blue color
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1.5s linear infinite', // Faster spin speed
    marginBottom: '20px',
  },
  message: {
    fontSize: '1.5rem',
    color: '#333',
    marginTop: '10px',
  },
}

// Adding spinner animation via @keyframes
const stylesGlobal = {
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}

export default Loading
