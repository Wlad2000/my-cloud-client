import React from 'react'
import { useSelector } from 'react-redux'
import styled, { keyframes }  from 'styled-components'
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
const fileAnimation = keyframes`
    0% { opacity: 0; transform: translateX(-50%) }
    100% {opacity: 1; transform: translateX(0%) }
`
const Transition = styled.div`
    animation-name: ${fileAnimation};
    animation-duration: 500ms;
    animation-iteration-count: 1;
`


const FileList = () => {

   const files = useSelector(s => s.files.files)


  return (
    <Container>
        <Header>
            <Name>Name</Name>
            <Date>Date</Date>
            <Size>Size</Size>
        </Header>
            {files.map(file => 
            <Transition
                key={file._id}
            >
                <File file={file}/>
            </Transition>
            )}
    </Container>
  )
}

export default FileList