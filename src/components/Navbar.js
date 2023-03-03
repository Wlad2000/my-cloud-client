import React from 'react'
import Logo from '../assets/img/logo.jpg'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/userReducers'

const Nav = styled.div`
    display: flex;
    justify-content: center;
    height: 59px;
    background-color: lightblue;
    align-items: center;
`
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    margin-left: 20px;
    margin-right: 20px ;
    width: 70%;
  
    
`
const Img = styled.img`
    width: 60px;
    border-radius: 50%;
`
const Header = styled.div`
    margin-left: 10px;
    font-size: 30px;
    font-weight: 700;
    background-color: #2AA5A0;
  background-image: linear-gradient(-0.5deg, yellow, blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
const Login = styled.div`
    flex:1;
    margin-left: auto;
    margin-right: 20px;
`
const Registration = styled.div`
    flex:1;
`
const Exit = styled.button`
    border-radius:30px;
    background-color: grey;
    color: white;
    font-size: 15px;
    border: none;
    cursor: pointer;
    width: 12%;

`

const Navbar = () => {
    const isAuth = useSelector(state => state.users.isAuth)
    const dispatch = useDispatch()

  return (
    <Nav>
    <Container>
        <Img src={Logo} />
        <Header>MyCloud</Header>
   
        {!isAuth &&
        <>
         <Login><NavLink to="/login">Login</NavLink></Login>
         <Registration><NavLink to="/registration">Registration</NavLink></Registration>
        </>
        }
        {isAuth &&
        <Exit onClick={() => dispatch(logOut())}>Exit</Exit>
        }
        
  
       
    </Container>
    </Nav>
  )
}

export default Navbar   