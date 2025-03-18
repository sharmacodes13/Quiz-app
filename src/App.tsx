import { useState } from 'react'
import Quiz from './components/Quiz'

function App() {
  const [timerEnabled, setTimerEnabled] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 text-center">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={timerEnabled}
              onChange={() => setTimerEnabled(!timerEnabled)}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">Enable Timer</span>
          </label>
        </div>
        
        <Quiz enableTimer={timerEnabled} timePerQuestion={30} />
      </div>
    </div>
  )
}

export default App
