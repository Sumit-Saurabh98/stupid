import { Github, Heart } from "lucide-react"
import { Button } from "./ui/button"

const Footer = () => {
  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo/Title */}
          <div className="flex items-center">
            <h1 className="text-white text-xl font-bold">Stupid Code Editor</h1>
            <span className="ml-2 text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">Beta</span>
          </div>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <p className="font-medium text-gray-400">All rights reserved © 2024</p>
          </div>

          {/* Right side - GitHub link & Attribution */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:bg-gray-600"
              onClick={() => window.open('https://github.com/sumit-saurabh98/stupid', '_blank')}
            >
              <Github className="w-5 h-5" />
            </Button>
            
            <div className="text-sm text-gray-400 flex items-center">
              <span className="hidden sm:inline">Created by</span>
              <a 
                href="https://github.com/sumit-saurabh98" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-1 text-gray-300 hover:text-white font-medium"
              >
                Sumit Saurabh
              </a>
              <span className="mx-1">with</span>
              <Heart className="w-4 h-4 text-red-500 inline animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Footer