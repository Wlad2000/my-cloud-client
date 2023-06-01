import React from 'react'
import { useSelector } from 'react-redux'
import styled, { keyframes }  from 'styled-components'
import File from './File'
import { useTranslation } from 'react-i18next'

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
const Status = styled.div`
    grid-column-start: 4;
    justify-self: center;
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
const NoFiles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
  width: 100%;
  color: gray;
  font-size: 20px;
`
const ContainerGrid = styled.div`
    margin: 20px 0 ;
    display: flex;
    flex-wrap: wrap;
   
    

`

const FileList = () => {
   const files = useSelector(s => s.files.files)
   const filesView = useSelector(s => s.files.view)
   const {t} = useTranslation()

    if(files.length === 0){
        return (
            <NoFiles>
                {t("fileList.noFiles")}
            </NoFiles>
        )
    }

    if(filesView === 'grid'){
        return (
            <ContainerGrid>
                    {files.map(file => 
                        <Transition key={file._id}>
                            <File file={file}/>
                        </Transition>
                    )}
            </ContainerGrid>
        )
    }

    if(filesView === 'list'){
    return (
        <Container>
            <Header>
                <Name> {t("fileList.name")}</Name>
                <Status> {t("fileList.status")}</Status>
                <Date> {t("fileList.date")}</Date>
                <Size> {t("fileList.size")}</Size>
            </Header>
                {files.map(file => 
                    <Transition key={file._id}>
                        <File file={file}/>
                    </Transition>
                )}
        </Container>
    )
    }
}

export default FileList