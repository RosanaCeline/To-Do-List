import Register from '../pages/Register/Register'
import Login from '../pages/Login/Login'
//import TaskList from '../pages/TaskList/TaskList'
//import NewTask from '../pages/NewTask/NewTask'
//import EditTask from '../pages/EditTask/EditTask'
//import Notfound from '../pages/Notfound/Notfound'
//import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'

const routes = [
  { path: '/', element: <Register/>, public: true },
  { path: '/login', element: <Login />, public: true },
  /*{ path: '*', element: <Notfound />, public: true },
  {
    path: '/tasklist',
    element: (
      <ProtectedRoute>
        <TaskList />
      </ProtectedRoute>
    ),
    title: 'Lista de Tarefas',
    public: false
  },
  {
    path: '/newtask', 
    element: (
      <ProtectedRoute>
        <NewTask />
      </ProtectedRoute>
    ),
    public: false,
    title: 'Nova Tarefa'
  },
  {
    path: '/edittask', 
    element: (
      <ProtectedRoute>
        <EditTask />
      </ProtectedRoute>
    ),
    public: false,
    title: 'Alterar Tarefa',
  },
  {
    path: '/logout',
    element: null, 
    public: false,
    title: 'Sair'
  }*/
]

export default routes;