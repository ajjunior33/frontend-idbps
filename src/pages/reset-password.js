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

export default function ResetPassword() {
  return (
    <Container display={"flex"} flexDirection="column" justifyContent={"center"} alignItems="center" minH={"100vh"} minW={"100vw"}>
      <Box borderRadius={"10"} p="20" w={"100%"} maxW={"610px"} border={"1px"} borderColor="gray.200">

        <Heading size='lg' textAlign={"center"}>Cadastrar nova senha</Heading>
        <form action="" width={"100%"}>
          <FormControl mt={"5"} mb={"5"}>
            <FormLabel>Nova senha</FormLabel>
            <Input type='password' placeholder="*******" background={"white"} />
          </FormControl>
          <FormControl mt={"5"} mb={"5"}>
            <FormLabel>Repita sua nova senha</FormLabel>
            <Input type='password' placeholder="*******" background={"white"} />
          </FormControl>


          <FormControl>
            <Button type="submit" colorScheme={"blue"} w={"100%"}>Salvar senha</Button>
          </FormControl>

        </form>
      </Box>
    </Container >
  )
}
