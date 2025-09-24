import Register from '../pages/Register/Register'
import Login from '../pages/Login/Login'
import Tasks from '../pages/Tasks/Tasks'
import NotFound from '../pages/NotFound/NotFound'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'

const routes = [
  { path: '/', element: <Register/>, public: true },
  { path: '/login', element: <Login />, public: true },
  { path: '*', element: <NotFound />, public: true },
  { path: '/tasks', 
    element: (
      <ProtectedRoute>
        <Tasks />
      </ProtectedRoute>
    ), 
    public: false
  }
]

export default routes;