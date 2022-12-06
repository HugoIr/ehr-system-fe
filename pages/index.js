import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tooltip, Tr, useDisclosure } from '@chakra-ui/react'
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { getOrganization, getUserToken } from '../config/api/auth';
import BASE_URL from '../config/api/constant';
import ROUTE from '../config/api/route';

export default function Home() {
  const [ehrData, setEhrData] = useState([]);
  const [ehrId, setEhrId]=useState()
  const [ehrDetail, setEhrDetail]=useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const router = useRouter();
  const organizationType = getOrganization()
  const [error, setError] = useState()
  const [ehrHistory, setEhrHistory] = useState([])
  const [isBusy, setIsBusy] = useState(true)
  useEffect(() => {
    const url = (organizationType == 'hospital') ? `${BASE_URL}/ehr/` : `${BASE_URL}/insurance/ehr/`
    axios.get(url, {
      headers: {
				Authorization: getUserToken()
			}
		}).then( async (res) => {
      setEhrData(res['data']['result'])
    }).catch((error) => {
      console.log("ERROR ", error)
      setError(error)
    })
    setIsBusy(false)
  }, [])

  useEffect(()=>{
    if (ehrId != undefined) {
      axios.get(`${BASE_URL}/ehr/${ehrId}`, {
        headers: {
          Authorization: getUserToken()
        }
      }
      ).then((response)=>{
      
        setEhrDetail(response.data)
      })
    }
	},[ehrId])

  useEffect(()=>{
    if (ehrId != undefined) {
      axios.get(`${BASE_URL}/ehr/history/${ehrId}`, {
        headers: {
          Authorization: getUserToken()
        }
      }
      ).then((response)=>{
        setEhrHistory(response.data.result)
      })
    }
	},[ehrDetail, ehrId])

  const showModal = (id) => {
    setEhrId(id);
    onOpen()
  }
  
  return isBusy ? 'Loading...' : (error ? <div>There is no EHR found</div> : (
    
    <>
    {(organizationType == 'hospital') && <Button onClick={() => router.push(ROUTE.CREATE)} ml='24px' id='createNewEhr' colorScheme='green' type='submit' width='12em' borderRadius={8}>
      Create New EHR
    </Button>}
    <Box mb='30px' />
    <TableContainer px="40px">
  <Table variant='simple'>
    <Thead>
      <Tr>
        <Th>ID</Th>
        <Th>Name</Th>
        <Th>Gender</Th>
        <Th>Nationality</Th>
        {(organizationType == 'hospital') && <Th></Th>}
        <Th></Th>
      </Tr>
    </Thead>
    <Tbody>
        {ehrData != [] && ehrData.map( (element, index) => <Tr key={element['Key']}>
          <Td>{element['Key']}</Td>
          <Td>{element['Record'].name}</Td>
          <Td>{element['Record'].gender}</Td>
          <Td>{element['Record'].nationality}</Td>
          {(organizationType == 'hospital') && <Td onClick={()=> router.push(`update/${element['Key']}`)}>update</Td>}
          <Td onClick={()=> showModal(element['Key'])}>detail</Td>
        </Tr> )}
       
    </Tbody>
  </Table>
</TableContainer>
{ehrDetail.result != undefined && ehrHistory != undefined && <Modal onClose={onClose} isOpen={isOpen} size={'6xl'} scrollBehavior={'inside'}>
          <ModalOverlay />
          <ModalContent p="10px">
            <ModalCloseButton mr={'10px'} />
            <ModalBody>
              <div>
                 <Box>
                    <div>ID: {ehrId} </div> 
                    <div>Name: {ehrDetail.result.name} </div>
                    <div>Date of Birth: {ehrDetail.result.dateOfBirth} </div>
                    <div>Gender: {ehrDetail.result.gender} </div>
                    <div>Phone Number: {ehrDetail.result.phoneNumber} </div>
                    <div>Nationality: {ehrDetail.result.nationality} </div>
                    <div>Insurance Name: {ehrDetail.result.insuranceName} </div>
                    
                </Box>
                <Box mb='24px' />
                <Text mb='20px' >Data History: </Text>

                <TableContainer px="40px">
                  <Table variant='simple'>
                    <Thead>
                      <Tr>
                        <Th>Tx ID</Th>
                        <Th>Timestamp</Th>
                        <Th>Nama</Th>
                        <Th>Blood Type</Th>
                        <Th>Height</Th>
                        <Th>Weight</Th>
                        <Th>Pulse Rate</Th>
                        <Th>Blood Pressure</Th>
                        <Th>Respiratory Rate</Th>
                        <Th>Medical History</Th>
                        <Th>Diagnose</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                        {ehrHistory != [] && ehrHistory.map( (element, index) => <Tr key={element['txId']}>

                          <Td>{element['txId']}</Td>
                          <Td>{new Date(element['timestamp']).toISOString()}</Td>
                          <Td>{element['value'].name}</Td>
                          <Td>{element['value'].bloodType}</Td>
                          <Td>{element['value'].height}</Td>
                          <Td>{element['value'].weight}</Td>
                          <Td>{element['value'].pulseRate}</Td>
                          <Td>{element['value'].bloodPressure}</Td>
                          <Td>{element['value'].respiratoryRate}</Td>
                          
                          <Td>
                            <ul>
                              {element['value'].medicalHistory.map((element,index) => 
                                <li key={index}>{element.date}: {element.description}</li>
                              )}
                            </ul>
                          </Td>
                          <Td>
                            <ul>
                              {element['value'].diagnose.map((element,index) => 
                                <li key={index}>{element.date}: {element.description}</li>
                              )}
                            </ul>
                          </Td>
                          
                        </Tr> )}
                      
                    </Tbody>
                  </Table>
                </TableContainer>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>}
        </>
  )
  )
}
