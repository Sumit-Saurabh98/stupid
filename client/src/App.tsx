import { Routes, Route , Navigate} from "react-router-dom"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Footer from "./components/Footer"
import { Toaster } from "react-hot-toast"
import Navbar from "./components/Navbar"
import { userUserStore } from "./store/useUserStore"
import { useEffect } from "react"
import LoadingSpinner from "./components/LoadingSpinner"
import Editor from "./pages/Editor"

function App() {

  const {checkAuth, checkingAuth, user} = userUserStore()

  useEffect(()=>{
    checkAuth();
  }, [checkAuth])

  if (checkingAuth) return <LoadingSpinner />;



  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(50,120,129,0.3)_0%,rgba(50,50,60,0.2)_45%,rgba(0,1,0,0.1)_100%)]' />
				</div>
			</div>

			<div className='relative z-50'>
				<Navbar />
				<Routes>
					<Route path='/signup' element={user ? <Navigate to="/editor"/> : <SignUp/>} />
					<Route path='/' element={user ? <Navigate to="/editor"/> : <Login/>} />
          <Route path='/editor' element={!user ? <Navigate to="/"/> : <Editor/>} />
				</Routes>
					<Footer/>
			</div>
			<Toaster />
		</div>
  )
}

export default App
