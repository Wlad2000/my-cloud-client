import React, { useState } from 'react'
import styled from 'styled-components'
import { registration } from '../action/user'

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 20px;
    width: 400px;
    border: 0.5px solid grey;
    padding: 20px;
    justify-content: center;
    
    background-color: whitesmoke;
    border-radius:30px;
    height: 300px;
    margin-top: 10%;
`
const Header = styled.div`
    font-size: 25px;
    font-weight: 700;
    color: grey;
`
const Input = styled.input`
    border:none;
    background: transparent;
    font-size: 15px;
    border-bottom: solid navy 3px;
    width: 90%;
    &:focus{
        transform: scale(1.05);
    };
`
const BtnRegistration = styled.button`
    border-radius:30px;
    background-color: lightblue;
    color: grey;
    font-size: 20px;
    border: none;
    cursor: pointer;
    width: 50%;
    margin-top: 20px;
` 

const Registration = () => { 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

  return (
    <Container>
        <Header>Registration</Header>
        <Input value={email} onChange={(e)=> setEmail(e.target.value)} type="text" placeholder='enter name...'/>
        <Input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder='enter password..'/>
       
        <BtnRegistration onClick={() => registration(email,password)}>Registration</BtnRegistration>
    </Container>
  )
}

export default Registration