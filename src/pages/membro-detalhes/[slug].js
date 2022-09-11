import {
  Box, Heading, Spinner, Text, Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
} from '@chakra-ui/react';
import { format } from 'date-fns'
import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { api } from '../../service/api';
import Router from 'next/router';

export default function MemberDetails({ memberId }) {
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(`/members/${memberId}`)
      .then(response => {
        setDetails(response.data)
        setInterval(() => {
          setLoading(false)
        }, 3000)
      })
  }, [memberId]);

  const goToBack = () => Router.push("/membros")

  return (
    <DefaultLayout>
      <Box bg={"white"} p="8" minH={"100vh"}>

        {loading === true && (
          <Box display={'flex'} justifyContent="center" alignItems={"center"} flexDirection="column">
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
            Carregando...
          </Box>
        )}
        {loading === false && (
          <>
            <Button colorScheme={"red"} mb={5} onClick={goToBack}>Voltar</Button>
            <Text>Nome: {details.name}</Text>
            <Text>Email: {details.email}</Text>
            <Text>CPF: {details.document}</Text>
            <Text> Data de Nascimento: {format(new Date(details.birthday), "dd/MM/yyyy")}</Text>
            <Text>Batizado ? {details.baptized === false ? "Não" : "Sim"} </Text>
            {details.baptized === true && (
              <Text>Data de Batismo: {format(new Date(details.baptism_date), 'dd/MM/yyyy')}</Text>
            )}
            <Text>Gênero: {details.geneder}</Text>
            {details.Transfer.length === 0 && (
              <Box p={3} w="100%" display={'flex'} justifyContent="center" alignItems={"center"} flexDirection="column">
                <Heading size={"md"}>
                  Não há detalhes cadastrados
                </Heading>
              </Box>
            )}

            {details.Transfer.length > 0 && (
              <Accordion allowToggle mt={10}>
                <AccordionItem>
                  <h2>
                    <AccordionButton bg={"blue.100"}>
                      <Box flex='1' textAlign='left'>
                        Transferência de igreja
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Text><strong>Saída da antiga igreja: </strong> {format(new Date(details.Transfer[0].exitChurchPrevious), 'dd/MM/yyyy')}</Text>
                    <Text><strong>Entrada na igreja: </strong> {format(new Date(details.Transfer[0].startChurchCurrent), 'dd/MM/yyyy')}</Text>
                    <Text><strong>Antiga Igreja: </strong> {details.Transfer[0].churchPrevius}</Text>
                    <Text><strong>Antigo Cargo: </strong> {details.Transfer[0].chargeInPreviusChurch}</Text>
                    <Text><strong>Descrição de trabalhos anteriores: </strong> {details.Transfer[0].descriptionWorkInChurch}</Text>

                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            )}

          </>
        )}
      </Box>
    </DefaultLayout>
  )

}


export const getStaticPaths = ({ ctx }) => {
  console.log(ctx);
  return {
    paths: [],
    fallback: "blocking",
  }
}

export const getStaticProps = async ({ params }) => {
  const slug = params?.slug;


  return {
    props: {
      memberId: slug
    },
    revalidate: 60 * 30 // 30 minutes
  }
}