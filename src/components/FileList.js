import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import File from './File'


const Container = styled.div`
    margin: 20px 0 ;
    display: flex;
    flex-direction: column;
`
const Header = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr repeat(4,1fr);
`
const Name = styled.div`
    grid-column-start: 2;
    color: blue;

`
const Date = styled.div`
    grid-column-start: 5;
    justify-self: center;
    color: blue;
`
const Size = styled.div`
    grid-column-start: 6;
    justify-self: center;
    color: blue;
`

const FileList = () => {

   const files = useSelector(s => s.files.files).map(file => <File file={file} key={file._id} />)

  return (
    <Container>
        <Header>
            <Name>Name</Name>
            <Date>Date</Date>
            <Size>Size</Size>
        </Header>
        {files}
    </Container>
  )
}

export default FileList