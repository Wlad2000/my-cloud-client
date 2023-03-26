import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getFiles, uploadFile } from '../action/file'
import { popStack, setCurrentDir, setPopup } from '../reducers/fileReducers'
import FileList from './FileList'
import Popup from './Popup'
import Uploader from './Uploader'



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
const Drop = styled.div`
  width: 80%;
  border-radius: 20%;
  border: dashed lightgray 3px;
  height: 75vh;
  margin-top: 5%;
  display: flex;
  justify-content: center;  
  align-items: center;
  font-size: 25px;
  color: lightblue;
`

const Disk = () => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
  const lastId = useSelector(state => state.files.last)
  const [drag,setDrag] = useState(false)

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

    function dragEnterHandler(e){
      e.preventDefault()
      e.stopPropagation()
      setDrag(true)
    }
    function dragLeaveHandler(e){
      e.preventDefault()
      e.stopPropagation()
      setDrag(false)
    }

    function dropHandler(e){
      e.preventDefault()
      e.stopPropagation()
      let files = [...e.dataTransfer.files] 
      files.forEach(file => dispatch(uploadFile(file, currentDir)))
      setDrag(false)
    }
    
  return ( !drag ?
    <Container onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
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
        <Uploader/>
    </Container>
    :
    <Drop onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
     put your file
    </Drop>
  )
}

export default Disk