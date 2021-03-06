import React, { createContext, useReducer, useEffect } from 'react'
import { searchReducer } from '../reducers/search-reducers'
import { filterReducer } from '../reducers/search-reducers'

export const SearchContext = createContext()

const SearchContextProvider = (props) => {
  const [searches, dispatchSearch] = useReducer(searchReducer, [], () => {
    // initial value
    const storedSearch =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('searches'))
        : null;
    return storedSearch ? storedSearch : []
  })
  const [filters, dispatchFilters] = useReducer(filterReducer, {})

  useEffect(() => {
    if (typeof window !== 'undefined')
      localStorage.setItem('searches', JSON.stringify(searches))
  }, [searches])

  return (
    <SearchContext.Provider
      value={{
        state: { searches, filters },
        actions: { dispatchSearch, dispatchFilters }
      }}>
      {props.children}
    </SearchContext.Provider>
  )
}

export default SearchContextProvider;