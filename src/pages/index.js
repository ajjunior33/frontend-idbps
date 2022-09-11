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
import Link from 'next/link'

export default function Home() {
  return (
    <Container display={"flex"} flexDirection="column" justifyContent={"center"} alignItems="center" minH={"100vh"} minW={"100vw"}>
      <Box borderRadius={"10"} p="20" w={"100%"} maxW={"610px"} border={"1px"} borderColor="gray.200">

        <Heading size='lg' textAlign={"center"}>Acesse sua conta</Heading>
        <form action="" width={"100%"}>
          <FormControl marginTop={"5"}>
            <FormLabel>Email</FormLabel>
            <Input type='email' placeholder="seumelhor@email.com" background={"white"} />
          </FormControl>

          <FormControl marginTop={"5"}>
            <FormLabel>Senha</FormLabel>
            <Input type='password' placeholder="**********" background={"white"} />
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
