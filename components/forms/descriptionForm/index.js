import { Button, Box, Flex, HStack, Input } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useFieldArray } from 'react-hook-form';


const DescriptionForm = ({ errors, register, keyName, control, buttonAddText }) => {
    const {fields, append, remove} = useFieldArray({ control, name: keyName });

    return (
        <Box>
            {fields.map((_, index) => (
                <Box key={`${keyName}[${index}]`}>
                    <HStack w='full' key={`${keyName}[${index}]`} align="top">
                        <Input
                            bgColor='#F4F5F9'
                            id={`${keyName}[${index}]`}
                            errors={errors[keyName] && errors[keyName][index]}
                            name={`${keyName}[${index}].description`}
                            {...register(`${keyName}[${index}].description`)}
                        />
                        <Box ml='10px'/>
                        <Box onClick={()=>{remove(index)}}>
                            <CloseIcon color='gray' />
                        </Box>
                    </HStack>
                    
                    <Box mb='12px'/>
                </Box>
            ))}

            <Box mb='20px' />

            <Button onClick={()=>{append({description: ''})}} form="add" colorScheme='green' variant='outline'  type='submit' width='auto' borderRadius={8}>
                {buttonAddText}
            </Button>

        </Box>
    );
}

export default DescriptionForm;