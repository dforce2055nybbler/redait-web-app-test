import React, { useState, useEffect } from 'react'
import Select, {  components } from 'react-select'
import { FaSearch } from 'react-icons/fa'


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

const Search = (props) => {
  const { contacts, setFilter } = props
  
  const [messagesOptions, setMessagesOptions] = useState([])
  const [clickCount, setClickCount] = useState(0)

  const onClick = (e) => {
    setClickCount(clickCount + 1)
    e.preventDefault()
    e.stopPropagation()
  }

  const styles = {
    control: (css) => ({ ...css, paddingLeft: '1rem' }),
  }

  const handleMessages = contacts => {
    const messagesOptions = contacts.map(contact => {
      return {
        id: contact.id, value: contact.company, label: contact.company
      }
    })

    setMessagesOptions(messagesOptions)
  }

  useEffect(() => {
    if (contacts) {
      handleMessages(contacts)
    }
  }, [contacts] )

  return (
    <Select
      {...props}
      isClearable
      emoji={<FaSearch size={16} color="#264A75" />}
      onEmojiClick={onClick}
      components={{ Control }}
      isSearchable
      name="search"
      placeholder="Buscar"
      options={messagesOptions}
      onChange={e => {
        setFilter({ ...e })
        }
      }
      styles={styles}
    />
  )
}

export default Search