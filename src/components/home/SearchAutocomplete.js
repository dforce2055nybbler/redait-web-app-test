import React, { useState, useEffect } from 'react'
import Select, {  components } from 'react-select'
import { FaSearch } from 'react-icons/fa'
import { v1 as uuid } from 'uuid'

import AsyncSelect from 'react-select/async'

const Control = ({ children, ...props }) => {
  const { emoji, onEmojiClick } = props.selectProps
  const style = { cursor: 'pointer' }

  return (
    <components.Control {...props}>
      <span onMouseDown={onEmojiClick} style={style}>
        {emoji}
      </span>
      {children}
    </components.Control>
  )
}

const SearchAutocomplete = (props) => {
  const { options, search, autocompleteHandle, optionSelected } = props
  
  const [inputValue, setInputValue] = useState('')
  const [searchOptions, setSearchOptions] = useState([])

  const styles = {
    control: (css) => ({ ...css, paddingLeft: '1rem' }),
  }


  const onClickSearchButton = (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      if (inputValue) {
        e.type = 'click'
        e.target.value = inputValue
        search(e, inputValue)
      }
    } catch (error) {
    }
  }

  const handleSearchOptions = options => {
    const searchOptions = options.map(option => {
      return {
        id: option.id ? option.id : uuid(), value: option.value, label: option.label
      }
    })

    setSearchOptions(searchOptions)
  }

  const filterSearchOptions = (inputValue) => {
    try {
      if (inputValue) {
        return searchOptions.filter((i) =>
          i.label.toLowerCase().includes(inputValue?.toLowerCase())
        )
      }
    } catch (error) {
      return searchOptions
    }
    
  };

  const promiseOptions = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterSearchOptions(inputValue))
      }, 200)
    })
  
  const handleInputChange = (newValue) => {
    const newInputValue = newValue.replace(/\W/g, '')
    setInputValue(newInputValue)
    // TODO: Obtener resultados de la API para mostrar sugerencias
    return newInputValue;
  }

  useEffect(() => {
    if (options) {
      handleSearchOptions(options)
    }
    if (optionSelected)
      setInputValue(optionSelected.value)

  }, [options, optionSelected] )

  return (
    <AsyncSelect
      cacheOptions
      {...props}
      isClearable
      emoji={<FaSearch size={16} color="#264A75" />}
      onEmojiClick={onClickSearchButton}
      components={{ Control }}
      isSearchable
      name="search"
      placeholder="Buscar"
      defaultOptions={searchOptions}
      loadOptions={promiseOptions}
      noOptionsMessage={() => null}
      value={searchOptions.value}
      onInputChange={handleInputChange}
      onKeyDown={search}
      onChange={(value, e) => autocompleteHandle(e, value)}
      styles={styles}
    />
  )
}

export default SearchAutocomplete