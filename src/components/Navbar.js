import React, { useState } from 'react'
import Logo from '../assets/img/logo.jpg'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/userReducers'
import { getFiles, searchFile } from '../action/file'
import { ShowLoader } from '../reducers/loaderReducer'
import { useTranslation } from 'react-i18next'

const Nav = styled.div`
    display: flex;
    justify-content: center;
    height: 65px;
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
    width: 50px;
    border-radius: 50%;
    margin-top: 0.5%;
`
const Header = styled.div`
    flex:10;
    margin-left: 10px;
    font-size: 30px;
    display: flex;
    flex-direction: column;
    font-weight: 700;
  background-image: linear-gradient(0.5deg, yellow, blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  

`
const Sub = styled.p`
     font-size: 12px;
     color: black;
     -webkit-text-fill-color: white;
     
     
`
const Login = styled.button`
    flex:1;
    margin-right: 10px;
    background-color: lightseagreen;
    border: none;
    color: whitesmoke;
    height: 30px;
    border-radius: 50px;
    cursor: pointer;
    &:hover {
    background-color: lightgrey;
    color: grey;
  }
`
const Registration = styled.button`
    flex:2;
    background-color: lightseagreen;
    border: none;
    color: whitesmoke;
    height: 30px;
    border-radius: 50px;
    cursor: pointer;
    &:hover {
    background-color: lightgrey;
    color: grey;
  }
    
`
const Exit = styled.button`
    border-radius:30px;
    background-color: lightcoral;
    color: white;
    font-size: 15px;
    padding: 5px;
    border: none;
    cursor: pointer;
    width: 12%;
    flex:1;
    &:hover {
    background-color: lightgrey;
    color: grey;
  }
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
const Lang = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  background-color: grey;
  margin-right: 2%;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 3px;
  width: 40px;
`
const LangButton = styled.button`
    cursor: pointer;
    color: ${props => props.active == 'en' && props.en ? "gray"  : props.active == 'ua' && props.ua ? "gray" : "white"};
    width: 35px;
    height: 20px;
    border: none;
    background-color: ${props => props.active == 'en' && props.en ? "lightgray"  : props.active == 'ua' && props.ua ? "lightgray" : "gray"};;
    border-radius: 10px;
`

const Navbar = () => {
    const isAuth = useSelector(state => state.users.isAuth)
    const currentDir = useSelector(state => state.files.currentDir)
    const dispatch = useDispatch()
    const [searchValue,setSearchValue] = useState('')
    const [searchData,setSearchData] = useState('')
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

    const {t,i18n} = useTranslation()

    const changesLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }
    const [lang, setLang] = useState('en')


  return (
    <Nav>
    <Container>
       
        <Header> <span><Img src={Logo} /> MyCloud</span><Sub>{t("navbar.title")}</Sub></Header>
        {isAuth &&
            <Search 
                type="text" placeholder={t("navbar.search")}
                value={searchValue}
                onChange={(e) => searchHandler(e)}
            />
            
        }

        <Lang>
            <LangButton active={lang} en type="button" onClick={()=> {changesLanguage('en') ; setLang('en')}}>EN</LangButton>
            <LangButton active={lang} ua type="button"  onClick={()=> {changesLanguage('ua'); setLang('ua')}}>UA</LangButton>
        </Lang>
        

        {!isAuth &&
        <>
         <Login><NavLink to="/login">{t("navbar.login")}</NavLink></Login>
         <Registration><NavLink to="/registration">{t("navbar.registration")}</NavLink></Registration>
        </>
        }
        {isAuth &&
        <Exit onClick={() => dispatch(logOut())}>{t("navbar.exit")}</Exit>
        }
        
  
       
    </Container>
    </Nav>
  )
}

export default Navbar   