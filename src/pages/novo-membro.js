import {
  Box, Heading, FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  Switch,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useForm } from 'react-hook-form'
import { FiUserPlus } from 'react-icons/fi'

import DefaultLayout from "../layout/DefaultLayout";
import TransferInChurchComponent from '../components/TransferInChurchComponent';
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { api } from "../service/api";
import Router from 'next/router'


export default function NewMember() {
  const toast = useToast();

  const [transfer, setTransfer] = useState(false);
  useEffect(() => {
    console.log("Houve um alteração na variável transfer", transfer);
    if (transfer === true) {
      const data = JSON.parse(localStorage.getItem("previusChurchData"))
      setExitChurchPrevious(data.exitChurchPrevious)
      setStartChurchCurrent(data.startChurchCurrent)
      setChurchPrevius(data.churchPrevius)
      setChargeInPreviusChurch(data.chargeInPreviusChurch)
      setDescriptionWorkInChurch(data.descriptionWorkInChurch)
    }
  }, [transfer, setTransfer]);

  const [batized, setBatized] = useState(false);
  const [exitChurchPrevious, setExitChurchPrevious] = useState("")
  const [startChurchCurrent, setStartChurchCurrent] = useState("")
  const [churchPrevius, setChurchPrevius] = useState("")
  const [chargeInPreviusChurch, setChargeInPreviusChurch] = useState("")
  const [descriptionWorkInChurch, setDescriptionWorkInChurch] = useState("")

  const {
    register,
    handleSubmit,
    watch,
    formState: { erros }
  } = useForm();


  const onSubmit = (data) => {
    api.post('/members', data)
      .then(response => {
        const id = response.data.id
        if (transfer === true) {
          const data = {
            exitChurchPrevious,
            startChurchCurrent,
            churchPrevius,
            chargeInPreviusChurch,
            descriptionWorkInChurch
          }

          api.post(`/transfer/${id}`, data)
            .then(responseTransfer => {
              toast({
                title: 'Uhuu!!!',
                description: "Membro cadastrado com sucesso.",
                status: 'success',
                duration: 4000,
                isClosable: true,
                onCloseComplete: () => Router.push("/membros")
              })
            })
            .catch(err => {
              toast({
                title: 'Opss!!!',
                description: "Houve um erro ao tentar cadastrar os dados de tranfência do usuário.",
                status: 'error',
                duration: 4000,
                isClosable: true,
              })
            })

        } else {
          toast({
            title: 'Uhuu!!!',
            description: "Membro cadastrado com sucesso.",
            status: 'success',
            duration: 4000,
            isClosable: true,
            onCloseComplete: () => Router.push("/membros")
          })
        }
      }).catch(err => {
        toast({
          title: 'Opss!!!',
          description: "Houve um erro ao tentar cadastrar o usuário.",
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      })
  }


  return (
    <DefaultLayout>
      <Box bg={"white"} p="8">
        <Heading size={"md"}>Cadastro de Novo Membro</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl my={5}>
            <FormLabel>Nome completo</FormLabel>
            <Input
              {...register("name", { required: true })}
              type='text'
              placeholder="João da Silva"
            />
          </FormControl>
          <FormControl my={5}>
            <FormLabel>Email</FormLabel>
            <Input
              {...register("email", { required: true })}
              type='text'
              placeholder="seumelhor@email.com"
            />
          </FormControl>
          <FormControl my={5}>
            <FormLabel>Telefone</FormLabel>
            <Input
              {...register("phone", { required: true })}
              type='text'
              placeholder="+00 00 00000 0000"
            />
          </FormControl>
          <FormControl my={5}>
            <FormLabel>CPF</FormLabel>
            <Input
              {...register("document", { required: true })}
              type='text'
              placeholder="000.000.000-00" />
          </FormControl >
          <FormControl my={5}>
            <FormLabel>Data de nascimento</FormLabel>
            <Input

              {...register("birthday", { required: true })}
              type='date'
              placeholder="00/00/0000"
            />
          </FormControl>
          <FormControl my={5}>
            <FormLabel>Gènero</FormLabel>
            <Select {...register("geneder")}>
              <option selected disabled>Selecione uma opção</option>
              <option value="male">Masculino</option>
              <option value="femele">Feminino</option>
              <option value="others">Outros</option>
              <option value="prefer_not_to_say">Prefiro não dizer</option>
            </Select>
          </FormControl>


          <FormControl display='flex' alignItems='center'>
            <FormLabel htmlFor='batized' my='5'>
              Batizado ?
            </FormLabel>
            <Switch id='batized' {...register("batized")} value={batized} onChange={e => setBatized(!batized)} />
          </FormControl>

          {batized === true && (
            <FormControl my={5}>
              <FormLabel>Data de batismo</FormLabel>
              <Input
                {...register("baptism_date")}
                type='date'
              />
            </FormControl>
          )}

          <TransferInChurchComponent change={transfer} onChange={setTransfer} />

          {transfer === true && (
            <Box p={5} borderWidth="2px" mt={5} borderColor={"gray.300"} borderRadius={5}>
              <Text>Data de saída da igreja antérior: {exitChurchPrevious}</Text>
              <Text>Data de entrada na igreja atual: {startChurchCurrent}</Text>
              <Text>Nome da igreja antérior: {churchPrevius}</Text>
              <Text>Cargo na igreja antérior: {chargeInPreviusChurch}</Text>
              <Text>Descrição de trabalhos desempenhados: {descriptionWorkInChurch} </Text>
            </Box>
          )}

          <FormControl>
            <Button type="submit" colorScheme={"facebook"} mt={3}>
              <FiUserPlus style={{ marginRight: 10 }} />
              Cadastrar membro
            </Button>
          </FormControl>
        </form>


      </Box>
    </DefaultLayout>
  )
}
export const getServerSideProps = async (ctx) => {
  const { ['nextauth.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}