import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Container,
  Button,
  Link as LinkChakra,
  Box,
  Heading,
} from '@chakra-ui/react'
import { parseCookies } from 'nookies';

export default function Home() {

  const { signIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { erros }
  } = useForm();
  console.log(erros)

  const onSubmit = async (data) => {
    await signIn(data)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      });
  }
  return (
    <Container display={"flex"} flexDirection="column" justifyContent={"center"} alignItems="center" minH={"100vh"} minW={"100vw"}>
      <Box borderRadius={"10"} p="20" w={"100%"} maxW={"610px"} border={"1px"} borderColor="gray.200">

        <Heading size='lg' textAlign={"center"}>Acesse sua conta</Heading>
        <form onSubmit={handleSubmit(onSubmit)} width={"100%"}>
          <FormControl marginTop={"5"}>
            <FormLabel>Email</FormLabel>
            <Input
              {...register("email", { required: true, })}
              type='text'
              placeholder="seumelhor@email.com"
              background={"white"}
              required
            />
          </FormControl>

          <FormControl marginTop={"5"}>
            <FormLabel>Senha</FormLabel>
            <Input
              {...register("password", { required: true, })}
              type='password'
              placeholder="**********"
              background={"white"}
              required
            />
          </FormControl>

          <FormControl m="5" flexDirection={"row"} display="flex" alignItems={"center"} justifyContent={"space-between"}>
            <div></div>
            <Link href="/forgout-password">
              <LinkChakra color="blue">Esqueceu sua senha ?</LinkChakra>
            </Link>
          </FormControl>
          <FormControl>
            <Button type="submit" colorScheme={"blue"} w={"100%"}>Entrar</Button>
          </FormControl>
        </form>
      </Box>
    </Container >
  )
}


export const getServerSideProps = async (ctx) => {
  const { ['nextauth.token']: token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false
      }
    }
  }



  return {
    props: {}
  }
}
