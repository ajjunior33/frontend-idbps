import { useEffect, useState } from 'react'
import { FiEye, FiPlus } from 'react-icons/fi'
import Link from 'next/link'
import Router from 'next/router'
import { parseCookies } from 'nookies'
import { format } from 'date-fns'

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Button,
} from '@chakra-ui/react'

import DefaultLayout from '../layout/DefaultLayout'
import { api } from '../service/api'

export default function Members() {
  const goToMember = (id) => {
    return Router.push(`/membro-detalhes/${id}`);
  }
  const goToNewMember = () => Router.push("/novo-membro")
  const [listUsers, setListUsers] = useState([]);
  useEffect(() => {
    api.get("/members")
      .then(response => {
        setListUsers(response.data);
      });
  }, []);

  return (
    <>
      <DefaultLayout>
        <Box bg={"white"} p="8">


          <Button colorScheme={'cyan'} color="white" onClick={goToNewMember}>
            <FiPlus />
            Novo membro
          </Button>
          <TableContainer>
            <Table variant='simple'>
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th>Nome</Th>
                  <Th>Email</Th>
                  <Th>Data de nascimento</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  listUsers.map(user => (
                    <Tr key={user.id}>
                      <Td>{user.name}</Td>
                      <Td>{user.email}</Td>
                      <Td>{format(new Date(user.birthday), "dd/MM/yyyy")}</Td>
                      <Td>
                        <Button colorScheme={"blue"} onClick={() => goToMember(user.id)}>
                          <FiEye />
                        </Button>
                      </Td>
                    </Tr>
                  ))
                }
              </Tbody>

            </Table>
          </TableContainer>
        </Box>
      </DefaultLayout>
    </>
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