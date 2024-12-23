import { Button } from "@/components/ui/button";
import {
  Github,
  Globe,
  User,
  Mail,
  Lock,
  Loader,
  UserPlus,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { userUserStore } from "@/store/useUserStore";

const SignUp = () => {
  const { signup, signUpLoading } = userUserStore();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSignup = () => {
    signup(userData.username, userData.email, userData.password);

    setUserData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="max-w-md w-full space-y-6 bg-gray-900 p-8 rounded-lg border border-gray-800">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-white">Create an account</h2>
          <p className="text-gray-400">
            Enter your email below to create your account
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
          >
            <Github className="mr-2 h-4 w-4" /> GitHub
          </Button>
          <Button
            variant="outline"
            className="bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
          >
            <Globe className="mr-2 h-4 w-4" /> Google
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-700"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-900 px-2 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Username"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
                className="pl-10 bg-gray-800 border-gray-700 text-gray-200 focus:border-gray-600"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                type="email"
                placeholder="Email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value.toLowerCase().trim() })
                }
                className="pl-10 bg-gray-800 border-gray-700 text-gray-200 focus:border-gray-600"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                type="password"
                placeholder="Password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value.trim() })
                }
                className="pl-10 bg-gray-800 border-gray-700 text-gray-200 focus:border-gray-600"
              />
            </div>
          </div>

          <Button
            onClick={handleSignup}
            disabled={signUpLoading || userData.email == "" || userData.password == "" || userData.username == ""}
            className="w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
							 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
          >
            {signUpLoading ? (
               <>
                  <Loader
                    className="mr-2 h-5 w-5 animate-spin"
                    aria-hidden="true"
                  />
                  Loading...
                </>
            ) : (
               <>
                  <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
                  Sign up
                </>
            )}
          </Button>

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-medium text-emerald-400 hover:text-emerald-300"
            >
              Login here <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
