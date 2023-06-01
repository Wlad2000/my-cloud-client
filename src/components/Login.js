import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled,{keyframes} from 'styled-components'
import { login } from '../action/user'
import { useTranslation } from 'react-i18next'

const loginAnimation = keyframes`
    0% { opacity: 0; transform: translateY(-50%) }
    100% {opacity: 1; transform: translateY(0%) }
`

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

    animation-name: ${loginAnimation};
    animation-duration: 700ms;
    animation-iteration-count: 1;
`
const Header = styled.div`
    font-size: 25px;
    font-weight: 700;
    color: grey;
`
const Input = styled.input`
    border:none;
    font-size: 15px;
    background: transparent;
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
    &:hover {
    background-color: green;
    color: white;
   
  }
` 


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const {t} = useTranslation()


  return (
    <Container>
        <Header>{t("login.login")}</Header>
        <Input value={email} onChange={(e)=> setEmail(e.target.value)} type="text" placeholder={t("login.email")}/>
        <Input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder={t("login.password")}/>
        <BtnRegistration onClick={() => dispatch(login(email,password))}>{t("login.login")}</BtnRegistration>
    </Container>
  )
}

export default Login