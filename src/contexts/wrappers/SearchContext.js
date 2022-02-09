import React, { createContext, useReducer } from 'react'
import { searchReducer } from '../reducers/search-reducers'

export const SearchContext = createContext()

const SearchContextProvider = (props) => {
  const [search, dispatchSearch] = useReducer(searchReducer, [])
  const [filters, dispatchFilters] = useReducer(searchReducer, [])


  return (
    <SearchContext.Provider
      value={{
        state: { search, filters },
        actions: { dispatchSearch, dispatchFilters }
      }}>
      {props.children}
    </SearchContext.Provider>
  )
}

export default SearchContextProvider;