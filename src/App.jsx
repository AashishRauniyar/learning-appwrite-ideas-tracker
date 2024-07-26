import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { UserProvider, useUser } from "./lib/context/user";
import { IdeasProvider } from "./lib/context/ideas";

function App() {
  const isLoginPage = window.location.pathname === "/login";

  return (
    <div className="min-h-screen bg-gray-100">
      <UserProvider>
        <IdeasProvider>
          <Navbar /> {/* Add the navbar before page content */}
          <main className="p-4">
            {isLoginPage ? <Login /> : <Home />}
          </main>
        </IdeasProvider>
      </UserProvider>
    </div>
  );
}

function Navbar() {
  const user = useUser();

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-2xl font-bold">Idea Tracker</a>
        <div className="flex items-center space-x-4">
          {user.current ? (
            <>
              <span className="text-white">{user.current.email}</span>
              <button
                type="button"
                onClick={() => user.logout()}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
              >
                Logout
              </button>
            </>
          ) : (
            <a href="/login" className="text-white hover:text-gray-300">
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

export default App;
