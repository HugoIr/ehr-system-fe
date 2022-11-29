
import { FormControl, FormLabel, FormErrorMessage, Box } from '@chakra-ui/react';
import { Input } from '@chakra-ui/input';
import Asterisk from '../asterisk';

const DateInput = (props) => {
  const { id, errors, rules, register, title, placeholder, defaultValue, hasLabel = true, mb, w, testId, ...rest } = props;

  return (
    <Box w={w}>
      <FormControl {...rest} isInvalid={errors[id]} mb={mb}>
        {hasLabel && <FormLabel htmlFor={id} fontWeight='semibold'>
          {title} <Asterisk isRequired={rules?.['required']} />
        </FormLabel>}

        <Input
          bgColor='#F4F5F9'
          borderRadius={8}
          defaultValue={defaultValue}
          type="datetime-local"
          name={`${id}.date`}
          {...register(`${id}.date`, rules)}
        />
        <FormErrorMessage>{errors[id] && errors[id].message}</FormErrorMessage>
      </FormControl>
    </Box>
  );
  
}

export default DateInput;