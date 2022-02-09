import { v1 as uuid } from 'uuid'

export const searchReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SEARCH':
      return [
        {
          id: uuid(),
          text: action.text,
        },
        ...state,
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