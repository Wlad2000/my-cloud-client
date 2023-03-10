import React from 'react'
import Logo from '../assets/img/logo.jpg'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/userReducers'

const Foot = styled.div`

    bottom: 0;
    width: 100%;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    height: 59px;
    background-color: lightgray
`
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
  
    
`
const Img = styled.img`
    width: 60px;
    border-radius: 50%;
`
const Header = styled.div`
    flex:10;
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
    flex:4;
`



const Footer = () => {
    const isAuth = useSelector(state => state.users.isAuth)
  
  return (
    <Foot>
    <Container>
    <Header> <Img src={Logo} /> MyCloud</Header>
   

    <Login></Login>
    <Registration>Private Build Co.</Registration>
 
    </Container>
    </Foot>
  )
}

export default Footer   