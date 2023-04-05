import React from 'react'
import styled from 'styled-components'
import folderLogo from '../assets/img/folder.png'
import fileLogo from '../assets/img/file.png'
import { useDispatch, useSelector } from 'react-redux'
import { popStack, pushStack, setCurrentDir } from '../reducers/fileReducers'
import { deleteFile, downloadFile } from '../action/file'
import sizeFormat from '../assets/sizeFormat'

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
`
const Delete = styled.button`
  padding: 5px;
  cursor: pointer;
  background-color: lightcoral;
  border: none;
  width: 50px;
  margin-left: 10px;
  border-radius: 20px;
`

const File = ({file}) => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)

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

  return (
    <Container onClick={()=> openHandler(file)}>
      <Image src={file.type === 'dir' ? folderLogo : fileLogo} alt=""/>
      <Name>{file.name}</Name>
      <Date>{file.date.slice(0,10)}</Date>
      <Size>{sizeFormat(file.size)}</Size>
      <Buttons className='btn'>
      {file.type !== 'dir' && <Download onClick={(e)=>downloadHandler(e)}>Download</Download>}
      <Delete onClick={(e)=>deleteHandler(e)}>Delete</Delete>
      </Buttons>
    </Container>
  )
}

export default File