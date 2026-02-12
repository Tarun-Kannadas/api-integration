import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { UserList } from './components/UserList';
import { TodosList } from './components/TodoList';

function App() {
  return (
    <>
    <BrowserRouter>
      <div style={{ textAlign: 'center' }}>
        <nav style={{ 
            padding: "10px", 
            borderBottom: "1px solid #ccc", 
            marginBottom: "20px",
            display: 'flex',
            justifyContent: 'center',
            gap:"20px"
          }}>        
          <Link to="/" >Home</Link>
          <Link to="/users">Users List</Link>
          <Link to="/todos">Todos List</Link>
        </nav>
      </div>

      <Routes>
        <Route path='/' element={<h2>Welcome to API Integration</h2>}/>
        <Route path='/users' element={<UserList/>} />
        <Route path='/todos' element={<TodosList/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
