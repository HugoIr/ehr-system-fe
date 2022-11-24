import TextInput from '../../components/forms/textinput/index.js';
import PasswordInput from '../../components/forms/passwordinput/index.js';
import Dropdown from '../../components/forms/dropdown/index.js';
import { Button, Spinner, Text,Box, Flex, Grid, GridItem  } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import BASE_URL from '../../config/api/constant.js';
import { setOrganization, setUserToken } from '../../config/api/auth.js';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticate } from '../../config/middleware/middleware.js';
import ROUTE from '../../config/api/route.js';

const Register = () => {
    
    const [isLoading, setIsLoading] = useState(false)
    const route = useRouter();

    const hospitalList = [
        {
            key: "hospital.hospitalA",
            value: "Hospital A",
        }
    ]

    useEffect(() => {
        if (isAuthenticate()) {
            route.push(ROUTE.HOME)
        } 
    }, [])
    
    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm();

    const [responseMessage, setResponseMessage] = useState('')

    // const organizationOption = [
    //     {
    //         key: "hospital-admin",
    //         value: "Hospital Admin",
    //     },
    //     {
    //         key: "insurance-auditor",
    //         value: "Insurance Auditor",
    //     }
    //   ]

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            console.log("req DATA for register ", data)
            data['organizationType'] = 'hospital'
            await axios.post(`${BASE_URL}/register/`, data)
            .then((response) => {
                console.log("RESPONSE register ", response)
                setResponseMessage('')
                setUserToken(data['email'])
                setOrganization(data['organizationType'])
                route.push(ROUTE.LOGIN)
            })
        } catch(error) {
            console.log("ERROR ", error)
            console.log('err data', error['response']['data']['result'])
            setResponseMessage(error['response']['data']['result'])
            setIsLoading(false)
        }
    };
    return (
            <Box 
                justify='center' 
                verticalAlign='center'
                px="30%"
            >
                <Text mb={23} fontSize='32px' fontWeight='semibold' color='black'>
                    Register
                </Text>
                <Box as='form' onSubmit={handleSubmit(onSubmit)}>
                    <TextInput 
                        id="email"
                        title='Email' 
                        placeholder='Your Email'
                        errors={errors}
                        register={register}
                        rules = {{
                            required: "Required"
                        }}
                    />
                    <Box mb='20px' />
                    
                    <PasswordInput
                        id="password"
                        title="Password"
                        placeholder='Password'
                        errors={errors}
                        register={register}
                        rules = {{
                            required: "Required"
                        }}
                    />
                    <Box mb='20px' />


                    <Dropdown
                        id="organization"
                        title='Organization' 
                        placeholder='Your Organization'
                        errors={errors}
                        register={register}
                        options={hospitalList}
                        rules = {{
                            required: "Required"
                        }}
                    />
                    <Box mb='20px' />

                     {responseMessage.length != 0 && (
                         <div>
                         <Text color='red'>Error: {responseMessage}</Text>
                         </div>
                     )}
                    <Box mb='20px' />
                    <Button id='signInButton' colorScheme='green' type='submit' width='12em' borderRadius={8}>
                        {isLoading ? <Spinner /> : "Sign Up"}
                    </Button>
                </Box>
                
            </Box>
                 
            );
        
        
}


export default Register;