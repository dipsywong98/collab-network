import React, { createContext, useContext } from 'react'
import axios from 'axios'

const AxiosContext = createContext(null)
AxiosContext.displayName = 'AxiosContext'

export const AxiosProvider = props => {
  axios.defaults.headers['Content-Type'] = 'application/json'
  window.axios = axios
  return <AxiosContext.Provider value={axios}>
    {props.children}
  </AxiosContext.Provider>
}

export const useAxios = () => useContext(AxiosContext)
