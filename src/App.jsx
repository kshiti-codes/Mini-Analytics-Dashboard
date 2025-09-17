// src/App.js
import { Provider } from 'react-redux'
import { store } from './store/store'
import AnalyticsDashboard from './components/AnalyticsDashboard'

function App() {
  return (
    <Provider store={store}>
      <AnalyticsDashboard />
    </Provider>
  )
}

export default App