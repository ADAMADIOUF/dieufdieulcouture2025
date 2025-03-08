import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const SearchProduct = () => {
  const navigate = useNavigate()
  const { keyword: urlKeyword } = useParams()
  const [keyword, setKeyword] = useState(urlKeyword || '')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      setKeyword('')
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <form onSubmit={submitHandler} className='search'>
      <input
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Rechercher des vêtements...'
        className='search-input'
      />
      <button type='submit' className='search-button'>
        Rechercher
      </button>
    </form>
  )
}

export default SearchProduct
