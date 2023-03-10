import React from 'react'
import styled from 'styled-components'
import folderLogo from '../assets/img/folder.png'
import fileLogo from '../assets/img/file.png'

const Container = styled.div`
    margin: 10px 0;
    grid-template-columns: 1fr 4fr repeat(4,1fr);
    border-bottom: 1px solid grey;
    display: grid;
    &:hover {
      transform: scale(1.02);
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

const File = ({file}) => {
  return (
    <Container>
      <Image src={file.type === 'dir' ? folderLogo : fileLogo} alt=""/>
      <Name>{file.name}</Name>
      <Date>{file.date.slice(0,10)}</Date>
      <Size>{file.size}</Size>

    </Container>
  )
}

export default File