import styled from 'styled-components'
import Navbar from './components/Navbar';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Registration from './components/Registration';
import Login from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { auth } from './action/user';
import Disk from './components/Disk';
import './i18n'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Wrap = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column; 
  align-items: center;
`


function App() {
  const isAuth = useSelector(state => state.users.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])
  

  return (
    <BrowserRouter>
    <Container>
     <Navbar/>
      <Wrap >
       
        {!isAuth ?
          <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path='*' element={<Navigate to='/login' />} />
          </Routes>
          :
          <Routes>
           <Route exact path="/" element={<Disk />} />
           <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        }
      </Wrap>
      </Container>
    </BrowserRouter>
  );
}

export default App;
