import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { createDir, getFiles, uploadFile } from '../action/file'
import { popStack, setCurrentDir, setPopup } from '../reducers/fileReducers'
import FileList from './FileList'
import Popup from './Popup'



const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const NavContainer = styled.div`
  display:flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  margin-top: 20px;
`
const BtnContainer = styled.div`
  display:flex;
  height: 40px;
  margin: 20px;
  align-items: center;
  width: 50%;
`
const BtnBack = styled.button`
    border-radius:30px;
    background-color: lightgray;
    color: grey;
    font-size: 15px;
    border: none;
    cursor: pointer;
    width: 10%;
    height: 40px;
    
`
const BtnCreate = styled.button`
    margin-left: 20px;
    border-radius:30px;
    background-color: lightgreen;
    color: grey;
    font-size: 15px;
    border: none;
    cursor: pointer;
    width: 20%;
    padding: 2px;
    height: 40px;

`
const Upload = styled.div`
  
`
const LabelUpload = styled.label`
    color: grey;
    border: 2px dashed grey;
    padding: 5px 10px;
    cursor: pointer;
    margin-left: 10px;
    border-radius: 10px;
`
const InputUpload = styled.input`
    display: none;
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
    function fileUploadHandler(e){
      const files = [...e.target.files]
      files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }
    
  return (
    <Container>
        <NavContainer>
            <BtnContainer>
            <BtnBack onClick={() => backClickHandler()} >{lastId==null ? "allBack":"Back"}</BtnBack>
            <BtnCreate onClick={() => createDirHandler()}>Create folder</BtnCreate>
            </BtnContainer>
            <Upload>
              <LabelUpload htmlFor='inputUpload'>Download File</LabelUpload>
              <InputUpload multiple={true} onChange={(e) => fileUploadHandler(e)} id="inputUpload" type="file" />
            </Upload>
        </NavContainer>
        <FileList/>
        <Popup/>
    </Container>
  )
}

export default Disk