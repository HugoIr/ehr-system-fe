import '../styles/globals.css'
import { Box, ChakraProvider } from '@chakra-ui/react';
import theme from '../config/theme';
import Navbar from '../components/navbar';
import { useEffect} from "react";
import { useRouter } from 'next/router';
import ROUTE from '../config/api/route';
import { isAuthenticate } from '../config/middleware/middleware';

function MyApp({ Component, pageProps }) {
  
  return (
    <ChakraProvider theme={theme}>
      
      <Navbar></Navbar>
      <Box pb="6%" />

        <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
