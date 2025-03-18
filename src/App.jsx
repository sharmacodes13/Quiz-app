import { useState } from 'react'
import Quiz from './components/Quiz'

function App() {
  const [timerEnabled, setTimerEnabled] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-100 to-blue-200">
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
        
        <footer className="mt-10 text-center py-4">
          <div className="border-t border-blue-200 pt-4 text-blue-800">
            <p className="text-sm mb-2">Created by Ayush Sharma</p>
            <div className="flex justify-center space-x-4">
              <a 
                href="https://github.com/sharmacodes13" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/ayush-sharma13/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App 