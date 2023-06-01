import React from 'react'
import styled from 'styled-components'
import UploadFile from './UploadFile'
import { useDispatch, useSelector } from 'react-redux'
import { Hide } from '../reducers/uploadReducer'
import { useTranslation } from 'react-i18next'

const Container = styled.div`
    height: 60%;
    width: 40%;
    position: fixed;
    bottom: 0;
    right: 0;
    background-color: aliceblue;
    padding: 2%;
    border-radius: 10%;
    overflow-y: auto;
`
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
    padding: 5px;
    margin-bottom: 10px;
`
const Title = styled.div`
    color: blue;
`
const ButtonClose = styled.button`
    border: none;
    background-color: lightcoral;
    color: black;
    padding: 5px;
    border-radius: 50%;
    width: 30px;
    cursor: pointer;
    &:hover{
        background-color: red;
        color: white;
    };
`

const Uploader = () => {
    const files = useSelector(s => s.upload.files)

    const isVisible = useSelector(s=> s.upload.isVisible)
    const dispatch = useDispatch()
    const {t} = useTranslation()

  return (
        isVisible &&
    <Container>
        <Header>
            <Title>{t("uploader.title")}</Title>
            <ButtonClose onClick={() => dispatch(Hide())}>X</ButtonClose>
        </Header>
        {files.map(file => 
           <UploadFile key={file.id} file={file}/> 
        ).reverse()}
    </Container>
  )
}

export default Uploader