import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tooltip, Tr, useDisclosure } from '@chakra-ui/react'
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from "react";
import { getOrganization, getUserToken } from '../config/api/auth';

export default function Home() {
  // const dataFetchedRef = useRef(false);
  const [ehrData, setEhrData] = useState([]);
  const [ehrId, setEhrId]=useState()
  const [ehrDetail, setEhrDetail]=useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const router = useRouter();
  const organizationType = getOrganization()
  const [error, setError] = useState()
  console.log("ORGA type ", organizationType)
  useEffect(() => {
    const url = (organizationType == 'hospital') ? 'http://localhost:8000/ehr/' : 'http://localhost:8000/insurance/ehr/'
    axios.get(url, {
      headers: {
				Authorization: getUserToken()
			}
		}).then( async (res) => {
      console.log("res ", res)
      console.log("res rslt ", res['data']['result'])
      // ehrData.push(res['data']['result'])
      // console.log("EHR data " , ehrData )
      setEhrData(res['data']['result'])
    }).catch((error) => {
      console.log("ERROR ", error)
      setError(error)
    })
  }, [])

  useEffect(()=>{
    if (ehrId != undefined) {
      axios.get(`http://localhost:8000/ehr/${ehrId}`, {
        headers: {
          Authorization: getUserToken()
        }
      }
      ).then((response)=>{
        console.log("RESPONSE ", response)
        setEhrDetail(response.data)
      })
    }
	},[ehrId])
  
  const showModal = (id) => {
    setEhrId(id);
    onOpen()
  }
  
  return error ? <div>There is no EHR found</div> : (
    
    <>
    <TableContainer px="40px">
  <Table variant='simple'>
    <Thead>
      <Tr>
        <Th>ID</Th>
        <Th>Name</Th>
        <Th>Gender</Th>
        <Th>Nationality</Th>
        <Th></Th>
      </Tr>
    </Thead>
    <Tbody>
        {ehrData != [] && ehrData.map( (element, index) => <Tr key={element['Key']}>
          <Td>{element['Key']}</Td>
          <Td>{element['Record'].name}</Td>
          <Td>{element['Record'].gender}</Td>
          <Td>{element['Record'].nationality}</Td>
          <Td onClick={()=> showModal(element['Key'])}>detail</Td>
        </Tr> )}
       
    </Tbody>
  </Table>
</TableContainer>

{ehrDetail.result != undefined && <Modal onClose={onClose} isOpen={isOpen} size={'2xl'} scrollBehavior={'inside'}>
          <ModalOverlay />
          <ModalContent p="20px">
            <ModalCloseButton mr={'10px'} />
            <ModalBody>
              <div>
                  {console.log("dwdw" ,ehrDetail)}
                 <Box px="40px">
                    <div>ID: {ehrId} </div> 
                    <div>Name: {ehrDetail.result.name} </div>
                    <div>Gender: {ehrDetail.result.gender} </div>
                    <div>Nationality: {ehrDetail.result.nationality} </div>
                    <div>Medical History:  </div>
                    
                </Box>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>}
        </>
  )
}
