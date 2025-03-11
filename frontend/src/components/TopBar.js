import React, { useEffect, useState } from 'react'

const TopBar = () => {
  const [direction, setDirection] = useState('forwards')

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection((prev) => (prev === 'forwards' ? 'backwards' : 'forwards'))
    }, 4000) // Change direction every 4 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='topbar-container'>
      <div className={`marquee ${direction}`}>
        <p>📍 Dieuf Dieul Couture | 📞 +221 77 925 85 08 | 📍CITé Safco Tivaoune Peulh, Dakar, Senegal</p>
      </div>
    </div>
  )
}

export default TopBar
