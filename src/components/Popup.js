import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { setPopup } from '../reducers/fileReducers'
import { createDir } from '../action/file'

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
`

const Popup = () => {
    const dispatch = useDispatch()
    const [folderName, setFolderName] = useState('')
    const popupDisplay = useSelector(s => s.files.popup)
    const currentDir = useSelector(s => s.files.currentDir)

    function createHandler(){
        dispatch(createDir(currentDir,folderName));
        dispatch(setPopup('none'));
        setFolderName('')
    }

  return (
    <Container style={{display:popupDisplay}} onClick={() => dispatch(setPopup('none'))}>
        <Content onClick={(e) => e.stopPropagation()}>
        <Header>
            <Title> Create new folder</Title>
            <BtnClose onClick={() => dispatch(setPopup('none'))} >X</BtnClose>
        </Header>
        <Input type="text" placeholder='enter name your folder...' value={folderName} onChange={(e) => setFolderName(e.target.value)}/>
        <BtnCreate onClick={() => createHandler()}>Create</BtnCreate>
        </Content>
    </Container>
  )
}

export default Popup