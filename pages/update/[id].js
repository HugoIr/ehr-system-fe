import TextInput from '../../components/forms/textinput/index.js';
import { Button, Spinner, Text,Box, FormLabel, HStack  } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { getUserToken} from '../../config/api/auth.js';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticate } from '../../config/middleware/middleware.js';
import ROUTE from '../../config/api/route.js';
import axios from 'axios';
import BASE_URL from '../../config/api/constant.js';
import Dropdown from '../../components/forms/dropdown/index.js';
import { nationalityList } from '../../config/data/nationality.js';
import MedicalHistoryForm from '../../components/forms/medicalHistoryForm/index.js';
import DateInput from '../../components/forms/dateInput/index.js';
import NumberInput from '../../components/forms/numberInput/index.js';

const Update = () => {
    
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();
    const [ehrData, setEhrData] = useState()
    const [dateOfBirth, setDateOfBirth] = useState()
    const { id } = useRouter().query;  
    useEffect(() => {
        if (!isAuthenticate()) {
            router.push(ROUTE.LOGIN)
        } 
    },[])

    useEffect(()=>{
        if (id != undefined) {
          axios.get(`http://localhost:8000/ehr/${id}`, {
            headers: {
              Authorization: getUserToken()
            }
          }
          ).then((response)=>{
              setValue('name', "Haaaa")
              
              const fields = ["name","dateOfBirth","address","phoneNumber","gender","nationality","bloodType","height","weight","pulseRate","bloodPressure","respiratoryRate","medicalHistory","diagnose","insuranceName",]
              fields.forEach(field => {
                if (field == "dateOfBirth") {
                    setDateOfBirth(response.data.result[field])
                } else {
                    setValue(field, response.data.result[field])
                  }
                });
            setEhrData(response.data.result)
          })
        }
    },[id])
    
    const {
      handleSubmit,
      register,
      control,
      setValue,
      formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            medicalHistory: [{date: '', description: ''}],
            diagnose: [{description: ''}],

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
            if (data['dateOfBirth'].date != undefined) {
                data['dateOfBirth'] = data['dateOfBirth'].date
            } 
            console.log("DATA ", data)
            
            await axios.put(`${BASE_URL}/ehr/${id}`, data, {
                headers: {
                  Authorization: getUserToken()
                }
              })
            .then((response) => {

                setIsLoading(false)
                router.push(ROUTE.HOME)
            })
            
        } catch(error) {
            console.log("ERROR ", error)
            setResponseMessage(error['response']['data']['result'])
            setIsLoading(false)
        }
    };
    return ehrData != null && (
        <>
            <Button onClick={() => router.push(ROUTE.HOME)} ml='24px' id='updateNewEhr' colorScheme='gray' width='6em' borderRadius={8}>
                    Back
                </Button>
                
                <Box mb="30px" />
            <Box 
                justify='center' 
                verticalAlign='center'
                px="26%"
            >
            
               
                <Text mb={23} fontSize='32px' fontWeight='semibold' color='black'>
                    Update EHR
                </Text>
                <Box as='form' onSubmit={handleSubmit(onSubmit)} id="form-update">
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
                    
                    <HStack>
                        <DateInput
                            id="dateOfBirth"
                            title='Date of Birth' 
                            placeholder='Date of Birth' 
                            defaultValue={dateOfBirth}
                            errors={errors}
                            register={register}
                        />
                        
                        <Box mx="20px" />

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
                    </HStack>

                    <Box mb='20px' />
                    
                    <TextInput 
                        id="address"
                        title='Address' 
                        placeholder='Address' 
                        errors={errors}
                        register={register}
                    />

                    <Box mb='20px' />

                    <NumberInput 
                        id="phoneNumber"
                        title='Phone Number' 
                        placeholder='Phone Number' 
                        errors={errors}
                        rules={{
                            required: 'Required',
                            minLength: { value: 1, message: 'Minimum length should be 1' },
                        }}
                        register={register}
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

                    <NumberInput 
                        id="height"
                        title='Height (cm)'  
                        placeholder='Height' 
                        errors={errors}
                        register={register}
                    />

                    <Box mb='20px' />
                    <NumberInput 
                        id="weight"
                        title='Weight (kg)' 
                        placeholder='Weight' 
                        errors={errors}
                        register={register}
                    />

                    <Box mb='20px' />

                    <TextInput 
                        id="bloodType"
                        title='Blood Type' 
                        placeholder='Blood Type' 
                        errors={errors}
                        register={register}
                    />

                    <Box mb='20px' />

                    <NumberInput 
                        id="pulseRate"
                        title='Pulse Rate (pulse per minute)' 
                        placeholder='Pulse Rate' 
                        errors={errors}
                        register={register}
                    />

                    <Box mb='20px' />
                                        
                    <TextInput 
                        id="bloodPressure"
                        title='Blood Pressure (mmHg)' 
                        placeholder='Blood Pressure' 
                        errors={errors}
                        register={register}
                    />

                    <Box mb='20px' />

                    <NumberInput 
                        id="respiratoryRate"
                        title='Respiratory Rate' 
                        placeholder='Respiratory Rate' 
                        errors={errors}
                        register={register}
                    />

                    <Box mb='20px' />
                    <Dropdown
                        id="insuranceName"
                        title='Insurance Name' 
                        placeholder='insurance Name'
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
                        <MedicalHistoryForm
                            errors={errors}
                            register={register}
                            keyName={'diagnose'}
                            control={control}
                            buttonAddText={'Add New Diagnose'}
                        />
                    </Box>

                    <Box mb='30px' />

                    {responseMessage.length != 0 && (
                         <div>
                         <Text color='red'>Error: {responseMessage}</Text>
                         </div>
                     )}

                    <Box mb={responseMessage ? '10px' : '20px'} />

                    <Button form="form-update" id='updateButton' colorScheme='green' type='submit' width='8em' borderRadius={8}>
                        {isLoading ? <Spinner /> : "Update"}
                    </Button>
                    
                    <Box my={20} />
                </Box>
                
            </Box>
        </>
            );
        
        
}


export default Update;