
import { Button } from '@chakra-ui/button';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import Icon from '@chakra-ui/icon';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import Asterisk from '../asterisk/index.js';

const PasswordInput = (props) => {
  const { id, errors, rules, register, title, placeholder, ...rest } = props;

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl {...rest} isInvalid={errors[id]}>
      <FormLabel htmlFor={id} fontWeight='semibold'>
        {title} <Asterisk isRequired={rules?.['required']} />
      </FormLabel>
    
        <InputGroup size='md'>
        <Input
            type={show ? 'text' : 'password'}
            id={id}
            bgColor='#F4F5F9'
            placeholder={placeholder}
            borderRadius={8}

            {...register(id, rules)}
          />
          <InputRightElement mr={3}>
              <Button id='bsEye' h='1.75rem' size='sm' onClick={handleClick}>
                <Icon h={4} w={4} as={show ? BsFillEyeFill : BsFillEyeSlashFill} />
              </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors[id] && errors[id].message}</FormErrorMessage>
      
    </FormControl>
  );
}

export default PasswordInput;