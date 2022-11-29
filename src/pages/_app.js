import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../context/AuthContext'
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Head>
          <title>ChurchSimple</title>
        </Head>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp
