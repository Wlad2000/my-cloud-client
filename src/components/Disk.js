import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getFiles } from '../action/file'
import FileList from './FileList'



const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const BtnContainer = styled.div`
  display:flex;
  height: 40px;
  margin: 20px;

`
const BtnBack = styled.button`
    border-radius:30px;
    background-color: lightgray;
    color: grey;
    font-size: 15px;
    border: none;
    cursor: pointer;
    width: 10%;
`
const BtnCreate = styled.button`
    margin-left: 20px;
    border-radius:30px;
    background-color: lightgreen;
    color: grey;
    font-size: 15px;
    border: none;
    cursor: pointer;
    width: 15%;
    padding: 2px;

`

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)

    useEffect(() => {
      dispatch(getFiles(currentDir))
    }, [currentDir])
    
  return (
    <Container>
        <BtnContainer>
            <BtnBack>Back</BtnBack>
            <BtnCreate>Create folder</BtnCreate>
        </BtnContainer>
        <FileList/>
    </Container>
  )
}

export default Disk