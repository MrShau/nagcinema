import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import './index.css'
import { createContext } from 'react'
import UserStore from './stores/UserStore.tsx'

export const Context = createContext<{userStore: UserStore} | null>(null);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Context.Provider value={{
    userStore: new UserStore()
  }}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Context.Provider>,
)
