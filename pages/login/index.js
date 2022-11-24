import TextInput from '../../components/forms/textinput/index.js';
import PasswordInput from '../../components/forms/passwordinput/index.js';
import { Button, Spinner, Text,Box, Flex, Grid, GridItem  } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { setOrganization, setUserToken } from '../../config/api/auth.js';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticate } from '../../config/middleware/middleware.js';
import ROUTE from '../../config/api/route.js';
import axios from 'axios';
import BASE_URL from '../../config/api/constant.js';

const Login = () => {
    
    const [isLoading, setIsLoading] = useState(false)
    const route = useRouter();
    useEffect(() => {
        if (isAuthenticate()) {
            route.push(ROUTE.HOME)
        } 
    })
    
    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm();

    const [responseMessage, setResponseMessage] = useState('')

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            // setUserToken(data['email'])
            // setOrganization('hospital')

            console.log("req DATA for login ", data)
            data['organizationType'] = 'hospital'
            await axios.post(`${BASE_URL}/login/`, data)
            .then((response) => {
                console.log("RESPONSE login ", response)
                setUserToken(response['data']['email'])
                setOrganization(response['data']['organizationType'])
                setIsLoading(false)
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
                    Login
                </Text>
                <Box as='form' onSubmit={handleSubmit(onSubmit)} id="form-login">
                    <TextInput 
                        id="email"
                        title='Email' 
                        placeholder='example@mail.com' 
                        errors={errors}
                        rules={{
                            required: 'Required',
                            minLength: { value: 3, message: 'Minimum length should be 3' },
                        }}
                        register={register}
                    />
                    <Box mb='20px' />
                    
                    <PasswordInput
                        id="password"
                        register={register}
                        errors={errors}
                        title="Password"
                        placeholder='************'
                        rules={{
                            required: 'Required',
                            minLength: { value: 4, message: 'Minimum length should be 4' },
                        }}
                    />
                    <Box mb='10px' />

                    {responseMessage.length != 0 && (
                         <div>
                         <Text color='red'>Error: {responseMessage}</Text>
                         </div>
                     )}

                    <Box mb={responseMessage ? '10px' : '20px'} />

                    <Button form="form-login" id='signInButton' colorScheme='green' type='submit' width='12em' borderRadius={8}>
                        {isLoading ? <Spinner /> : "Sign In"}
                    </Button>
                    
                </Box>
                
            </Box>
                 
            );
        
        
}


export default Login;