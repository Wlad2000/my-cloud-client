import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { createDir, getFiles } from '../action/file'
import { popStack, setCurrentDir, setPopup } from '../reducers/fileReducers'
import FileList from './FileList'
import Popup from './Popup'



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
  const dirStack = useSelector(state => state.files.dirStack)
  const lastId = useSelector(state => state.files.last)

    useEffect(() => {
      dispatch(getFiles(currentDir))
    }, [currentDir])

    function createDirHandler(){
     // dispatch(createDir(currentDir,'testName'))
     dispatch(setPopup('flex'))
    }
    function backClickHandler(){
    dispatch(popStack())
    dispatch(setCurrentDir(lastId))
     }
    
  return (
    <Container>
        <BtnContainer>
            <BtnBack onClick={() => backClickHandler()} >{lastId==null ? "allBack":"Back"}</BtnBack>
            <BtnCreate onClick={() => createDirHandler()}>Create folder</BtnCreate>
        </BtnContainer>
        <FileList/>
        <Popup/>
    </Container>
  )
}

export default Disk