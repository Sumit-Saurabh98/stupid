import { Button } from "@/components/ui/button"
import { Github, Globe, Mail, Lock, Loader, ArrowRight, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { userUserStore } from "@/store/useUserStore";

const Login = () => {

    const {login, loginLoading, googleLogin, githubLogin} = userUserStore()

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const handleLogin = () =>{
        login(userData.email, userData.password)

        setUserData({
            email: "",
            password: ""
        })
    }

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="max-w-md w-full space-y-6 bg-gray-900 p-8 rounded-lg border border-gray-800">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-white">Login to your account</h2>
          <p className="text-gray-400">Enter your email below to login to your account</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button onClick={githubLogin} variant="outline" className="bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700">
            <Github className="mr-2 h-4 w-4"/> GitHub
          </Button>
          <Button onClick={googleLogin} variant="outline" className="bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700">
            <Globe className="mr-2 h-4 w-4"/> Google
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-700"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-900 px-2 text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500"/>
              <Input
              value={userData.email}
              onChange={(e) => setUserData({...userData, email: e.target.value.toLowerCase().trim()})}
                type="email"
                placeholder="Email"
                className="pl-10 bg-gray-800 border-gray-700 text-gray-200 focus:border-gray-600"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500"/>
              <Input
              value={userData.password}
              onChange={(e) => setUserData({...userData, password: e.target.value.trim()})}
                type="password"
                placeholder="Password"
                className="pl-10 bg-gray-800 border-gray-700 text-gray-200 focus:border-gray-600"
              />
            </div>
          </div>

           <Button
           onClick={handleLogin}
              className="w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
							 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
              disabled={loginLoading || userData.email == "login" || userData.password == ""}
            >
              {loginLoading ? (
                <>
                  <Loader
                    className="mr-2 h-5 w-5 animate-spin"
                    aria-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
                  Login
                </>
              )}
            </Button>

           <p className="mt-8 text-center text-sm text-gray-400">
            Not have an Account?
            <Link
              to="/signup"
              className="font-medium text-emerald-400 hover:text-emerald-300"
            >
              Signup here <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login