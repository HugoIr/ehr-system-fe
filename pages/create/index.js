import TextInput from '../../components/forms/textinput/index.js';
import { Button, Spinner, Text,Box, Flex, Grid, GridItem, FormLabel  } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { getUserToken, setOrganization, setUserToken } from '../../config/api/auth.js';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticate } from '../../config/middleware/middleware.js';
import ROUTE from '../../config/api/route.js';
import axios from 'axios';
import BASE_URL from '../../config/api/constant.js';
import Dropdown from '../../components/forms/dropdown/index.js';
import { nationalityList } from '../../config/data/nationality.js';
import MedicalHistoryForm from '../../components/forms/medicalHistoryForm/index.js';
import DescriptionForm from '../../components/forms/descriptionForm/index.js';

const Create = () => {
    
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();
    useEffect(() => {
        if (!isAuthenticate()) {
            router.push(ROUTE.LOGIN)
        } 
    },[])
    
    const {
      handleSubmit,
      register,
      control,
      formState: { errors },
    } = useForm({
        defaultValues: {
            medicalHistory: [{date: '', description: ''}],
            diagnose: [{description: ''}],
            allergic: [{description: ''}],

    }});

    const [responseMessage, setResponseMessage] = useState('')

    const genderList = [
        {
            key: "male",
            value: "Male",
        },
        {
            key: "female",
            value: "Female",
        },
    ]

    const insuranceList = [
        {
            key: "-",
            value: "None",
        },
        {
            key: "insuranceA",
            value: "Insurance A",
        },
        {
            key: "insuranceB",
            value: "Insurance B",
        },
        {
            key: "insuranceC",
            value: "Insurance C",
        }
    ]

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            console.log("DATA CERAETE ", data)

            await axios.post(`${BASE_URL}/ehr/`, data, {
                headers: {
                  Authorization: getUserToken()
                }
              })
            .then((response) => {
                console.log("RESPONSE create ", response)
                setIsLoading(false)
                router.push(ROUTE.CREATE)
            })
            
        } catch(error) {
            console.log("ERROR ", error)
            console.log('err data', error['response']['data']['result'])
            setResponseMessage(error['response']['data']['result'])
            setIsLoading(false)
        }
    };
    return (
        <>
            <Button onClick={() => router.push(ROUTE.HOME)} ml='24px' id='createNewEhr' colorScheme='gray' width='6em' borderRadius={8}>
                    Back
                </Button>
                
                <Box mb="30px" />
            <Box 
                justify='center' 
                verticalAlign='center'
                px="26%"
            >
            
               
                <Text mb={23} fontSize='32px' fontWeight='semibold' color='black'>
                    Create EHR
                </Text>
                <Box as='form' onSubmit={handleSubmit(onSubmit)} id="form-create">
                    <TextInput 
                        id="name"
                        title='Name' 
                        placeholder='Name' 
                        errors={errors}
                        rules={{
                            required: 'Required',
                            minLength: { value: 1, message: 'Minimum length should be 1' },
                        }}
                        register={register}
                    />
                    <Box mb='20px' />
                    
                    <TextInput 
                        id="age"
                        title='Age' 
                        placeholder='Age' 
                        errors={errors}
                        rules={{
                            required: 'Required',
                            minLength: { value: 1, message: 'Minimum length should be 1' },
                        }}
                        register={register}
                    />
                    <Box mb='20px' />
                    
                    <Dropdown
                        id="gender"
                        title='Gender' 
                        placeholder='gender'
                        errors={errors}
                        register={register}
                        options={genderList}
                        rules = {{
                            required: "Required"
                        }}
                    />
                    <Box mb='20px' />

                    <Dropdown
                        id="nationality"
                        title='Nationality' 
                        placeholder='nationality'
                        errors={errors}
                        register={register}
                        options={nationalityList}
                        rules = {{
                            required: "Required"
                        }}
                    />
                    <Box mb='20px' />

                    <Dropdown
                        id="insurance"
                        title='Insurance' 
                        placeholder='insurance'
                        errors={errors}
                        register={register}
                        options={insuranceList}
                        
                    />
                    <Box mb='20px' />

                    <Box w="full">
                        <FormLabel fontWeight='semibold'>
                            Medical History 
                        </FormLabel>
                        <MedicalHistoryForm
                            errors={errors}
                            register={register}
                            keyName={'medicalHistory'}
                            control={control}
                            buttonAddText={'Add New Medical History'}
                        />
                    </Box>
                    <Box mb='30px' />

                    <Box w="full">
                        <FormLabel fontWeight='semibold'>
                            Diagnose 
                        </FormLabel>
                        <DescriptionForm
                            errors={errors}
                            register={register}
                            keyName={'diagnose'}
                            control={control}
                            buttonAddText={'Add New Diagnose'}
                        />
                    </Box>
                    <Box mb='30px' />

                    <Box w="full">
                        <FormLabel fontWeight='semibold'>
                            Allergic 
                        </FormLabel>
                        <DescriptionForm
                            errors={errors}
                            register={register}
                            keyName={'allergic'}
                            control={control}
                            buttonAddText={'Add New Allergic'}
                        />
                    </Box>
                    <Box mb='30px' />

                    <Box mb='10px' />

                    {responseMessage.length != 0 && (
                         <div>
                         <Text color='red'>Error: {responseMessage}</Text>
                         </div>
                     )}

                    <Box mb={responseMessage ? '10px' : '20px'} />

                    <Button form="form-create" id='createButton' colorScheme='green' type='submit' width='8em' borderRadius={8}>
                        {isLoading ? <Spinner /> : "Create"}
                    </Button>
                    
                    <Box my={20} />
                </Box>
                
            </Box>
        </>
            );
        
        
}


export default Create;