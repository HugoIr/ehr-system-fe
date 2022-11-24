import { FormControl, FormErrorMessage, FormLabel, Grid, GridItem, Textarea } from '@chakra-ui/react';
import { Input } from '@chakra-ui/input';
import Asterisk from '../asterisk';

const MedicalHistoryInput = (props) => {
  const { id, errors, rules, register, defaultValue } = props;

  return ( <>      
    <Grid h='full' w='full' templateColumns={'repeat(8, 1fr)'} gap="20px">
          <GridItem colSpan={3}>
            <FormControl isInvalid={errors && errors['key']}>
              <Input
                  bgColor='#F4F5F9'
                  borderRadius={8}
                  defaultValue={defaultValue}
                  type="datetime-local"
                  my="10px"
                  name={`${id}.date`}
                  {...register(`${id}.date`, rules)}
              />
              <FormErrorMessage>{errors && errors[`key`] && errors[`key`].message}</FormErrorMessage>
            </FormControl>
          </GridItem>
          <GridItem colSpan={5}>
              <FormControl isInvalid={errors && errors['key']}>
                <Textarea
                    bgColor='#F4F5F9'
                    borderRadius={8}
                    defaultValue={defaultValue}
                    name={`${id}.description`}
                    {...register(`${id}.description`, rules)}
                />
                <FormErrorMessage>{errors && errors[`value`] && errors[`value`].message}</FormErrorMessage>
              </FormControl>
            </GridItem> 
    </Grid>
    </>
  );
  
}

export default MedicalHistoryInput;