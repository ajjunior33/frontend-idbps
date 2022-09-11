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

export default function ForgoutPassword() {
  return (
    <Container display={"flex"} flexDirection="column" justifyContent={"center"} alignItems="center" minH={"100vh"} minW={"100vw"}>
      <Box borderRadius={"10"} p="20" w={"100%"} maxW={"610px"} border={"1px"} borderColor="gray.200">

        <Heading size='lg' textAlign={"center"}>Recuperar senha</Heading>
        <form action="" width={"100%"}>
          <FormControl mt={"5"} mb={"5"}>
            <FormLabel>Email</FormLabel>
            <Input type='email' placeholder="seumelhor@email.com" background={"white"} />
          </FormControl>


          <FormControl>
            <Button type="submit" colorScheme={"blue"} w={"100%"}>Solicitar nova senha</Button>
          </FormControl>

          <FormControl m="5" flexDirection={"row"} display="flex" alignItems={"center"} justifyContent={"center"}>

            <Link href="/">
              <LinkChakra color="blue">{"< Voltar"}</LinkChakra>
            </Link>
          </FormControl>


        </form>
      </Box>
    </Container >
  )
}
