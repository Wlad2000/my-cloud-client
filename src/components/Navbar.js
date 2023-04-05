import React, { useState } from 'react'
import Logo from '../assets/img/logo.jpg'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/userReducers'
import { getFiles, searchFile } from '../action/file'
import { ShowLoader } from '../reducers/loaderReducer'

const Nav = styled.div`
    display: flex;
    justify-content: center;
    height: 59px;
    background-color: lightblue;
    align-items: center;
    width: 100%;
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
    flex:1;
`
const Exit = styled.button`
    border-radius:30px;
    background-color: grey;
    color: white;
    font-size: 15px;
    padding: 5px;
    border: none;
    cursor: pointer;
    width: 12%;
    flex:1;
`
const Search = styled.input`
    width: 20%;
    margin-right: 5%;
    border: none;
    border-bottom: 2px solid grey;
    border-left: 1px solid grey;
    padding: 5px;
    background: transparent;
    color: gray;

`

const Navbar = () => {
    const isAuth = useSelector(state => state.users.isAuth)
    const currentDir = useSelector(state => state.files.currentDir)
    const dispatch = useDispatch()
    const [searchValue,setSearchValue] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)

    function searchHandler(e){
        setSearchValue(e.target.value)
        if(searchTimeout !== false){
            clearTimeout(searchTimeout)
        }
        dispatch(ShowLoader())
        if(e.target.value !== ''){
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFile(value))
            }, 500, e.target.value))
        }else{
            dispatch(getFiles(currentDir))
        }
    }

  return (
    <Nav>
    <Container>
       
        <Header> <Img src={Logo} /> MyCloud</Header>
        {isAuth &&
            <Search 
                type="text" placeholder="Enter title file.."
                value={searchValue}
                onChange={(e) => searchHandler(e)}
            />
            
        }
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