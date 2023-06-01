import React, {  useState } from 'react'
import styled from 'styled-components'
import folderLogo from '../assets/img/folder.png'
import fileLogo from '../assets/img/file.png'
import { useDispatch, useSelector } from 'react-redux'
import { pushStack, setCurrentDir } from '../reducers/fileReducers'
import { deleteFile, downloadFile, UpdateStatusFile } from '../action/file'
import sizeFormat from '../assets/sizeFormat'
import IconDownload from '../assets/img/download-icon.png'
import { useTranslation } from 'react-i18next'

const Container = styled.div`
    margin: 10px 0;
    grid-template-columns: 1fr 4fr repeat(4,1fr);
    border-bottom: 1px solid grey;
    display: grid;
    &:hover {
      transform: scale(1.02);
      background: rgba(211, 211, 211, .3) ;
      border-bottom: 5px solid grey;
      
    }
    &:hover .btn {
    display: flex;
    grid-column-start: 2;
    justify-content: center;
    align-items: center;
  }
`
const Image = styled.img`
  justify-self: center;
  width: 40%;
`
const Name = styled.div`
  grid-column-start: 2;
  display: flex;
  flex-direction: column;
`
const NameStatus = styled.p`
  color: ${props => props.edit ? 'orange': props.accepted ? 'green': props.archived ? 'blue' : 'black'};
  margin-top: 1%;
  font-size: 14px;
`

const Status = styled.div`
  grid-column-start: 4;
  justify-self: center;
  color: green;
  display: flex;
  margin-bottom: 10%;
  align-items: center;
`
const SelectStatus = styled.select`
  border: none;
  border-bottom: 1px solid grey;
  background: transparent;
  color: black;
  margin-left: 5px;
  cursor: pointer;
  height:25px;
  &:hover {
    color: blue;
   
  }
`
const ButtonStatus = styled.button`
  cursor: pointer;
  background-color: lightblue;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  margin-right: 2%;
  &:hover {
    background-color: lightgreen;
    color: white;
  }

`

const Date = styled.div`
  grid-column-start: 5;
  justify-self: center;

`
const Size = styled.div`
  grid-column-start: 6;
  justify-self: center;

`
const Buttons = styled.div`
  display: none;
  margin-bottom: 10px;
`
const Download = styled.button`
  padding: 5px;
  cursor: pointer;
  background-color: lightblue;
  border: none;
  width: 30%;
  border-radius: 20px;
  &:hover {
    background-color: blue;
    color: white;
  }
`
const Delete = styled.button`
  padding: 5px;
  cursor: pointer;
  background-color: lightcoral;
  border: none;
  width: 60px;
  margin-left: 10px;
  border-radius: 20px;
  &:hover {
    background-color: red;
    color: white;
  }
`
const ContainerGrid = styled.div`
  width: 150px;
  height: 150px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover{
    transform: scale(1.02);
    background: rgba(211, 211, 211, .3) ;
    border-bottom: 5px solid grey;
  }
  &:hover .btn {
    display: flex;
    grid-column-start: 2;
    justify-content: center;
    align-items: center;
    
  }
`
const ImageGrid = styled.img`
    height: 100px;
    width: 100px;
`

const ButtonsGrid = styled.div`
  display: none;
  margin-bottom: 10px;
`
const DownloadGrid = styled.button`
  cursor: pointer;
  border: none;
  height: 30px;
  width: 30px;
  border-radius: 20px;
  background: no-repeat center center;
  background-size: contain;
  background-image: url(${IconDownload});
  background-color: lightblue;
  &:hover {
    background-color: blue;
  }

`
const DeleteGrid = styled.button`
  padding: 5px;
  cursor: pointer;
  background-color: lightcoral;
  border: none;
  width: 50px;
  margin-left: 10px;
  border-radius: 20px;
  &:hover {
    background-color: red;
    color: white;
  }
`

const File = ({file}) => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
  const filesView = useSelector(s => s.files.view)
  const {t} = useTranslation()
  const [status,setStatus] = useState('')


  function openHandler(file){
    if(file.type === 'dir'){
      dispatch(pushStack(currentDir))
      dispatch(setCurrentDir(file._id)) 
    }
  }

  function downloadHandler(e){
    e.stopPropagation()
    downloadFile(file)
  }

  function deleteHandler(e){
    e.stopPropagation()
    dispatch(deleteFile(file))
  }
  function updateStatusHandler(e){
    console.log(status)
    e.stopPropagation()
    dispatch(UpdateStatusFile(file,status))
    window.location.reload();
  }


   
  
  if(filesView === 'list'){
    return (
      <Container onClick={()=> openHandler(file)}>
        <Image src={file.type === 'dir' ? folderLogo : fileLogo} alt=""/>
        <Name>{file.name}  {file.type !== 'dir' &&  <Status>
          {file.status == 'edit' && <NameStatus edit > {t("file.status1")}</NameStatus>}
          {file.status == 'archive' && <NameStatus archived> {t("file.status3")}</NameStatus>}
          {file.status == 'accepted' && <NameStatus accepted> {t("file.status2")}</NameStatus>}
          </Status>}</Name>
        {file.type !== 'dir' &&  <Status>
          <ButtonStatus type='button' onClick={(e) => updateStatusHandler(e)}>ok</ButtonStatus>
        <SelectStatus  value={status} onChange={(e) => setStatus(e.target.value)} >
              <option value={file.status}> {file.status}</option>
              { file.status !== 'edit' && <option value="edit" >{t("file.status1")}</option>}
              { file.status !== 'archive' && <option value="archive">{t("file.status3")}</option>}
              { file.status !== 'accepted' && <option value="accepted" >{t("file.status2")}</option>}
            </SelectStatus>
        </Status>}
        <Date>{file.date.slice(0,10)}</Date>
        <Size>{sizeFormat(file.size)}</Size>
        <Buttons className='btn'>
        {file.type !== 'dir' && <Download onClick={(e)=>downloadHandler(e)}> {t("file.download")}</Download>}
        <Delete onClick={(e)=>deleteHandler(e)}> {t("file.delete")}</Delete>
        </Buttons>
      </Container>
    )
  }
  if(filesView === 'grid'){
    return (
      <ContainerGrid onClick={()=> openHandler(file)}>
        <ImageGrid src={file.type === 'dir' ? folderLogo : fileLogo} alt=""/>
        <Name>{file.name}</Name>
        {file.type !== 'dir' && <Status>
           {file.status == 'edit' && <NameStatus edit > {t("file.status1")}</NameStatus>}
          {file.status == 'archive' && <NameStatus archived> {t("file.status3")}</NameStatus>}
          {file.status == 'accepted' && <NameStatus accepted> {t("file.status2")}</NameStatus>}
          </Status>}
        <ButtonsGrid className='btn'>
        {file.type !== 'dir' && <DownloadGrid onClick={(e)=>downloadHandler(e)}></DownloadGrid>}
        <DeleteGrid onClick={(e)=>deleteHandler(e)}>{t("file.delete")}</DeleteGrid>
        </ButtonsGrid>
      </ContainerGrid>
    )
  }
}

export default File