import {
  Box,
  Heading,
  Spinner,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '@chakra-ui/react';
import { format } from 'date-fns'
import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';

import TransferInChurchComponent from '../../components/TransferInChurchComponent'

import { api } from '../../service/api';

import { FiPlus } from 'react-icons/fi'

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


      {loading === false && (
        <>
          <Button colorScheme={"red"} mb={5} onClick={goToBack}>Voltar</Button>
          <Box padding={10} borderWidth={1} borderColor="gray.300" borderRadius={8}>
            <Heading as="h4" size={"md"}>Dados básicos</Heading>
            <Text>Nome: {details.name}</Text>
            <Text>Email: {details.email}</Text>
            <Text>CPF: {details.document}</Text>
            <Text> Data de Nascimento: {format(new Date(details.birthday), "dd/MM/yyyy")}</Text>
            <Text>Batizado ? {details.baptized === false ? "Não" : "Sim"} </Text>
            {details.baptized === true && (
              <Text>Data de Batismo: {format(new Date(details.baptism_date), 'dd/MM/yyyy')}</Text>
            )}
            <Text>Gênero: {details.geneder}</Text>
          </Box>
          <Tabs mt={10}>
            <TabList>
              <Tab>Histórico de Igrejas</Tab>
              <Tab>Financeiro</Tab>
              <Tab>Agregados</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <TransferInChurchComponent id={memberId}/>
                {details.Transfer.map(detail => (
                  <>
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
                          <Text><strong>Saída da antiga igreja: </strong> {format(new Date(detail.exitChurchPrevious), 'dd/MM/yyyy')}</Text>
                          <Text><strong>Entrada na igreja: </strong> {format(new Date(detail.startChurchCurrent), 'dd/MM/yyyy')}</Text>
                          <Text><strong>Antiga Igreja: </strong> {detail.churchPrevius}</Text>
                          <Text><strong>Antigo Cargo: </strong> {detail.chargeInPreviusChurch}</Text>
                          <Text><strong>Descrição de trabalhos anteriores: </strong> {detail.descriptionWorkInChurch}</Text>

                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </>
                ))}
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      )}


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
  const id = params?.id;


  return {
    props: {
      memberId: id
    },
    revalidate: 60 * 30 // 30 minutes
  }
}
