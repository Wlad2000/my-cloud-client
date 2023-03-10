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

`
const Date = styled.div`
    grid-column-start: 5;
    justify-self: center;
`
const Size = styled.div`
    grid-column-start: 6;
    justify-self: center;
`

const FileList = () => {

   const files = useSelector(s => s.files.files).map(file => <File file={file} key={file.id} />)

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