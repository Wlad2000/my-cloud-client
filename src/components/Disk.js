import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled,{ keyframes } from 'styled-components'
import { getFiles, uploadFile } from '../action/file'
import { popStack, setCurrentDir, setPopup, setView } from '../reducers/fileReducers'
import FileList from './FileList'
import Popup from './Popup'
import Uploader from './Uploader'
import IconList from '../assets/img/icon-list.png'
import IconGrid from '../assets/img/icon-grid.png'
import { useTranslation } from 'react-i18next'



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
  width: 100%;
  
`
const BtnContainer = styled.div`
  display:flex;
  height: 40px;
  margin: 20px;
  align-items: center;
  width: 40%;
`
const BtnBack = styled.button`
    border-radius:30px;
    background-color: lightgray;
    color: grey;
    font-size: 15px;
    border: none;
    cursor: pointer;
    width: 30%;
    height: 40px;
    &:hover {
    background-color: grey;
    color: white;
  }
`
const BtnCreate = styled.button`
    margin-left: 20px;
    border-radius:30px;
    background-color: lightgreen;
    color: grey;
    font-size: 15px;
    border: none;
    cursor: pointer;
    width: 30%;
    padding: 2px;
    height: 40px;
    &:hover {
    background-color: green;
    color: white;
  }
`
const BtnAcc = styled.button`
    border-radius:30px;
    background-color: lightgray;
    color: green;
    font-size: 12px;
    border: none;
    cursor: pointer;
    width: 12%;
    height: 30px;
    margin-right: 2%;
    &:hover {
    background-color: green;
    color: white;
  }
`
const Upload = styled.div`
`
const LabelUpload = styled.label`
    color: grey;
    border: 2px dashed grey;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 10px;
    white-space: nowrap;
    &:hover {
    color: blue;
    border: 3px dashed lightblue;
  }
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
const SelectSort = styled.select`
  border: none;
  border-bottom: 1px solid grey;
  background: transparent;
  color: black;
  margin-left: 5px;
  width: 100px;
  cursor: pointer;
  height:25px;
  &:hover {
    color: blue;
   
  }
`
const LabelSort = styled.label`
  color: grey;
`
const View = styled.div`

`
const ViewList = styled.button`
  height: 30px;
  width: 30px;
  border: none;
  outline: none;
  cursor: pointer;
  background: no-repeat center center;
  background-size: contain;
  background-image: url(${IconList});
  &:hover{
    background-color: lightblue;
  }

`
const ViewGrid = styled.button`
  height: 30px;
  width: 30px;
  border: none;
  outline: none;
  cursor: pointer;
  background: no-repeat center center;
  background-size: contain;

  background-image: url(${IconGrid});
  &:hover{
    background-color: lightblue;
  }
`
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px);
  width: 100%;
`

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  
  border-top: 5px solid gray;
  border-right: 5px solid gray;
  border-bottom: 5px solid gray;
  border-left: 8px solid lightgray;
  background: transparent;
  width: 75px;
  height: 75px;
  border-radius: 50%;
`;

const Disk = () => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
  const lastId = useSelector(state => state.files.last)
  const loader = useSelector(state => state.loader.isVisible)
  const [drag,setDrag] = useState(false)
  const [sort,setSort] = useState('type')
  const {t} = useTranslation()

    useEffect(() => {
      dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort])

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
    
    if(loader){
      return(
        <Loader>
           <Spinner></Spinner>
           
        </Loader>
      )
    }

  return ( !drag ?
    <Container onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
        <NavContainer>
            <BtnContainer>
            <BtnBack onClick={() => backClickHandler()} >{lastId==null ? `${t("disk.allBack")}`:`${t("disk.back")}`}</BtnBack>
            <BtnCreate onClick={() => createDirHandler()}>{t("disk.create")}</BtnCreate>
            </BtnContainer>
            <BtnAcc type='button' onClick={()=> setSort('status')}>{t("disk.sort5")}</BtnAcc>
            <LabelSort htmlFor='SelectSort'>{t("disk.sort")}: 
            <SelectSort value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="name">{t("disk.sort1")}</option>
              <option value="type">{t("disk.sort2")}</option>
              <option value="date">{t("disk.sort3")}</option>
              <option value="size">{t("disk.sort4")}</option>
            </SelectSort>
            </LabelSort>
            <View>
              <ViewList onClick={() => dispatch(setView('list'))} />
              <ViewGrid onClick={() => dispatch(setView('grid'))}/>
            </View>
            <Upload>
              <LabelUpload htmlFor='inputUpload'>{t("disk.download")}</LabelUpload>
              <InputUpload multiple={true} onChange={(e) => fileUploadHandler(e)} id="inputUpload" type="file" />
            </Upload>
        </NavContainer>
        <FileList/>
        <Popup/>
        <Uploader/>
    </Container>
    :
    <Drop onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
     {t("disk.drop")}
    </Drop>
  )
}

export default Disk