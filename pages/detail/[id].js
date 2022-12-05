import { Box } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import BASE_URL from "../../config/api/constant";

const Detail = () => {

    const { id } = useRouter().query;    
    const [ehrData, setEhrData] = useState([]);

    const getEhrById = async (id) => {
        await axios.get(`${BASE_URL}/ehr/${id}`).then( async (res) => {
        setEhrData(res['data']['result'])
        })
    }
    useEffect(() => {
        getEhrById(id)
    }, [])  
    return (
        <Box px="40px">
            <div>ID: {id} </div>
            <div>Name: {ehrData.name} </div>
            <div>Gender: {ehrData.gender} </div>
            <div>Nationality: {ehrData.nationality} </div>
            <div>Medical History:  </div>
            
        </Box>
    );
}

export default Detail;