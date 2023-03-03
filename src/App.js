import styled from 'styled-components'
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Registration from './components/Registration';
import Login from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { auth } from './action/user';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: beige;
  width: 100%;
  height: 100%;
`


function App() {
  const isAuth = useSelector(state => state.users.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])
  

  return (
    <BrowserRouter>
      <Container >
        <Navbar/>
        {!isAuth &&
          <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          </Routes>
        }
          
      </Container>
    </BrowserRouter>
  );
}

export default App;
