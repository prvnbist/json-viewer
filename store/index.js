import React from 'react'

const Context = React.createContext()

const initialState = {
   json: {
      string: 'this is a string',
      number: 123,
      object: {
         one: 'one',
         two: 2,
         nested: {
            three: 3,
            four: 'four',
         },
      },
      array: [
         'this',
         'is',
         'an',
         'array',
         {
            object: {
               five: 'cinco',
            },
         },
      ],
   },
   status: 'LOADING',
}
const reducer = (state, { type, payload }) => {
   switch (type) {
      case 'SET_STATUS':
         return { ...state, status: payload }
      case 'SET_JSON':
         return { ...state, json: payload }
      default:
         return state
   }
}

export const StateProvider = ({ children }) => {
   const [state, dispatch] = React.useReducer(reducer, initialState)
   return (
      <Context.Provider value={{ ...state, dispatch }}>
         {children}
      </Context.Provider>
   )
}

export const useViewer = () => React.useContext(Context)
