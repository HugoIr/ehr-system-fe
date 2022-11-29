import { Button, Box, Flex, HStack } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useFieldArray } from 'react-hook-form';
import MedicalHistoryInput from '../medicalHistoryInput/index.js'
import { useState } from 'react';

const MedicalHistoryForm = ({ errors, register, keyName, control, buttonAddText }) => {
    const {fields, append, remove} = useFieldArray({ control, name: keyName });
    const [date, setDate] = useState()
    return (
        <Box>
            {fields.map((field, index) =>  {return (
                <Box key={`${keyName}[${index}]`}>
                    
                    <HStack w='full' key={`${keyName}[${index}]`} align="top">
                        <MedicalHistoryInput
                            id={`${keyName}[${index}]`}
                            errors={errors[keyName] && errors[keyName][index]}
                            register={register}
                            value={date}
                        />
                        <Box ml='10px'/>
                        <Box onClick={()=>{remove(index)}}>
                            <CloseIcon color='gray' />
                        </Box>
                    </HStack>
                    
                    <Box mb='12px'/>
                </Box>
            )})}

            <Box mb='20px' />

            <Button onClick={()=>{append({date: '', description: ''})}} form="add" colorScheme='green' variant='outline' type='submit' width='auto' borderRadius={8}>
                {buttonAddText}
            </Button>

        </Box>
    );
}

export default MedicalHistoryForm;