import { Link } from "react-router-dom";
import { LogIn, LogOut, Menu, X } from "lucide-react"; // Import icons for mobile menu
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { userUserStore } from "@/store/useUserStore";

const Navbar = () => {

  const {logout, user} = userUserStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuth = true;

  return (
    <nav className="bg-gray-900 text-white border-b border-gray-800 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold">
              STUPID
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {isAuth ? (
              <>
                <Link 
                  to="/editor"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Editor
                </Link>
                <div className="flex items-center space-x-4">
                  <h1 className="text-gray-300">{user?.username}</h1>

                  {user ? (
              <button
              onClick={logout}
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
						rounded-md flex items-center transition duration-300 ease-in-out"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline ml-2">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to={"/"}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
                  
                </div>
              </>
            ) : (
              <Button 
                variant="outline" 
                className="border-gray-600 hover:bg-gray-800"
              >
                Sign in
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-800 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuth ? (
              <div className="space-y-3">
                <Link
                  to="/editor"
                  className="block px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  Editor
                </Link>
                <div className="px-3 py-2">
                  <h1 className="text-gray-300 mb-2">Hi Username</h1>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-600 hover:bg-gray-800"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="px-3 py-2">
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 hover:bg-gray-800"
                >
                  Sign in
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;