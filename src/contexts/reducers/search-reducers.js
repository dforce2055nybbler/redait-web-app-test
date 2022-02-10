import { v1 as uuid } from 'uuid'
const maxSearchs = 20
export const searchReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SEARCH':
      let currentSearchs = state.filter(search => search.text !== action.text)
      currentSearchs.slice(0, maxSearchs)
      return [
        {
          id: uuid(),
          text: action.text,
        },
        ...currentSearchs,
      ]
    case 'GET_LAST_SEARCH':
      let result = []
      try {
        if (state.length > 0)
          result = state[state.lenght - 1]
      } catch (error) {
        result = state
      }
      return result
    case 'CLEAN_SEARCH':
      return ''
    default:
      return state
  }
}
export const filterReducer = (state, action) => {
  debugger
  switch (action.type) {
    case 'ADD_FILTER':
      return [
        ...state,
        {
          id: uuid(),
          text: action.text,
        },
      ]
    case 'CLEAN_FILTER':
      return []
    default:
      return state
  }
}