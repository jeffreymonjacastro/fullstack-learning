import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './state/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // The Provider component makes the Redux store available to any nested components that have been wrapped in the main function.
  <Provider store={store}>
    <App />
  </Provider>
)
