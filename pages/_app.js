import '../styles/globals.css'
import { Box, ChakraProvider } from '@chakra-ui/react';
import theme from '../config/theme';
import Navbar from '../components/navbar';

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
