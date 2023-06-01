import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { setPopup } from '../reducers/fileReducers'
import { createDir } from '../action/file'
import { useTranslation } from 'react-i18next'


const Container = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Content = styled.div`
    width: 40%;
    background-color: lightblue;
    padding: 20px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
`
const Title = styled.div`

`
const BtnClose = styled.button`
    cursor: pointer;
    background-color: lightcoral;
    color: white;
    height: 30px;
    border: none;
    width: 30px;
    border-radius: 50%;
    &:hover{
        background-color: red;
    };

`
const Input = styled.input`
    margin: 20px 0px;
    border:none;
    font-size: 15px;
    background: transparent;
    border-bottom: solid navy 3px;
    width: 90%;
    &:focus{
        transform: scale(1.05);
    };
`
const BtnCreate = styled.button`
    align-self: flex-end;
    height: 30px;
    border: none;
    color: white;
    background-color: green;
    font-size: 13px;
    width: 70px;
    border-radius: 50px;
    cursor: pointer;
    &:hover{
        background-color: lightgreen;
        color: grey;
    };
`

const Popup = () => {
    const dispatch = useDispatch()
    const [folderName, setFolderName] = useState('')
    const popupDisplay = useSelector(s => s.files.popup)
    const currentDir = useSelector(s => s.files.currentDir)
    const {t} = useTranslation()

    function createHandler(){
        dispatch(createDir(currentDir,folderName));
        dispatch(setPopup('none'));
        setFolderName('')
    }

  return (
    <Container style={{display:popupDisplay}} onClick={() => dispatch(setPopup('none'))}>
        <Content onClick={(e) => e.stopPropagation()}>
        <Header>
            <Title>{t("createFolder.title")}</Title>
            <BtnClose onClick={() => dispatch(setPopup('none'))} >X</BtnClose>
        </Header>
        <Input type="text" placeholder={t("createFolder.input")} value={folderName} onChange={(e) => setFolderName(e.target.value)}/>
        <BtnCreate onClick={() => createHandler()}>{t("createFolder.create")}</BtnCreate>
        </Content>
    </Container>
  )
}

export default Popup