import React, { useEffect } from 'react'
import NavBar from './components/NavBar'
import { Routes , Route, Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react'
import {Toaster} from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore';


const App = () => {
  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();
  const { theme } = useThemeStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  console.log(authUser);

  if (isCheckingAuth && !authUser) {
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
  }
  
  return (
    <div  data-theme={theme}>
      <NavBar/>
      <Routes>
        <Route path='/' element={authUser ?  <HomePage/> : <Navigate to="/login"/>} />
        <Route path='/signup' element={!authUser ?  <SignupPage/> : <Navigate to="/"/>}/>
        <Route path='/login' element={!authUser ?  <LoginPage/> : <Navigate to="/"/>}/>
        <Route path='/settings' element={<SettingsPage/>}/>
        <Route path='/profile' element={authUser ?  <ProfilePage/> : <Navigate to="/login"/>}/>

      </Routes>

      <Toaster/>
    </div>
  )
}

export default App
