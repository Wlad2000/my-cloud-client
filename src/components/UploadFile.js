import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { RemoveFile } from '../reducers/uploadReducer'

const Container = styled.div`
    background-color: beige;
    padding: 2%;
    border-radius: 20px;
    margin: 5px 0;
`
const Header = styled.div`
    display: flex;
    justify-content: space-between;
`
const Name = styled.div`

`
const ButtonClose = styled.button`
    border: none;
    background-color: lightgray;
    color: gray;
    padding: 5px;
    border-radius: 10px;
    width: 30px;
    cursor: pointer;
    &:hover{
        background-color: lightcoral;
        color:white;
    };
`
const ProgressBar = styled.div`
    height: 1rem;
    border-radius: 8px;
    background-color: lightblue;
    display: flex;
    margin: 3px 0;
`
const UploadBar = styled.div`
    background-color: lightgreen;
    
    border-radius: 8px;
`
const Progress = styled.div`
    color:blue;
    left: 50%;
    position: absolute;
`

const UploadFile = ({file}) => {
   const dispatch = useDispatch()
   
  return (
    <Container>
        <Header>
            <Name>{file.name}</Name>
            <ButtonClose onClick={() => dispatch(RemoveFile(file.id))}>X</ButtonClose>
        </Header>
        <ProgressBar>
            <UploadBar style={{width: file.progress + "%"}} ></UploadBar>
            <Progress>{file.progress}%</Progress>
        </ProgressBar>
    </Container>
  )
}

export default UploadFile