import { Box } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/router';
import axios from "axios";

const Detail = () => {
    // const ehrData = {
    //       id: "EHR1",
    //       name: "Budi Badu",
    //       gender: "Male",
    //       nationality: "Indonesia",
    //     };

    const { id } = useRouter().query;    
    const [ehrData, setEhrData] = useState([]);

    const getEhrById = async (id) => {
        await axios.get(`http://localhost:8000/ehr/${id}`).then( async (res) => {
        console.log("res ", res['data']['result'])
        // ehrData.push(res['data']['result'])
        // console.log("EHR data " , ehrData )
        setEhrData(res['data']['result'])
        })
    }
    useEffect(() => {
        console.log("ID ", id)
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