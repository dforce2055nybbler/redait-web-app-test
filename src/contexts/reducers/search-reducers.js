import { v1 as uuid } from 'uuid'
const maxSearchs = 20
export const searchReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SEARCH':
      let currentSearchs =
        state
          .filter(search => search.text !== action.text)
          .slice(0, maxSearchs)

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
  switch (action.type) {
    case 'SET_MAIN_FILTER':
      return {
        ...state,
        mainFilter: action.filter,
      }
    case 'SET_AUX_FILTERS':
      return {
        ...state,
        auxFilters: action.auxFilters,
    }
    case 'CLEAN_FILTER':
      return []
    default:
      return state
  }
}