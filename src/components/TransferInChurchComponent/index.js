import { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast
} from '@chakra-ui/react'
import { FiSave, FiPlus } from 'react-icons/fi'
import { parseCookies } from 'nookies';
import {api} from '../../service/api'

function TransferInChurchComponent({id}) {

  const toast = useToast();

  const [exitChurchPrevious, setExitChurchPrevious] = useState("");
  const [startChurchCurrent, setStartChurchCurrent] = useState("");
  const [churchPrevius, setChurchPrevius] = useState("");
  const [chargeInPreviusChurch, setChargeInPreviusChurch] = useState("");
  const [descriptionWorkInChurch, setDescriptionWorkInChurch] = useState("");
  const onSubmitTransfer = () => {
    const data = {
      exitChurchPrevious,
      startChurchCurrent,
      churchPrevius,
      chargeInPreviusChurch,
      descriptionWorkInChurch,
    }

    api.post(`/transfer/${id}`, data)
      .then(responseTransfer => {
        toast({
          title: 'Uhuu!!!',
          description: "Histórico cadastrado com sucesso.",
          status: 'success',
          duration: 4000,
          isClosable: true,
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
      onClose();

  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (

    <>

      <Button colorScheme="green" onClick={onOpen}><FiPlus /> Transferência entre igrejas</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transferência entre igrejas</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl my={5}>
              <FormLabel>Data de saida da igreja anterior</FormLabel>
              <Input
                value={exitChurchPrevious}
                onChange={e => setExitChurchPrevious(e.target.value)}
                type='date'
                required
              />
            </FormControl>

            <FormControl my={5}>
              <FormLabel>Data de entrada na igreja atual</FormLabel>
              <Input
                value={startChurchCurrent}
                onChange={e => setStartChurchCurrent(e.target.value)}
                type='date'
                required
              />
            </FormControl>

            <FormControl my={5}>
              <FormLabel>Nome da Igreja anterior</FormLabel>
              <Input
                value={churchPrevius}
                onChange={e => setChurchPrevius(e.target.value)}
                type='text'
                required
              />
            </FormControl>

            <FormControl my={5}>
              <FormLabel>Cargo caso tenha tido na igreja anterior</FormLabel>
              <Input
                value={chargeInPreviusChurch}
                onChange={e => setChargeInPreviusChurch(e.target.value)}
                type='text'
                required
              />
            </FormControl>

            <FormControl my={5}>
              <FormLabel>Descrição de trabalhos desempenhados</FormLabel>
              <Textarea
                value={descriptionWorkInChurch}
                onChange={e => setDescriptionWorkInChurch(e.target.value)}
                required
              />
            </FormControl>


          </ModalBody>

          <ModalFooter display={'flex'} alignItems="center" justifyContent="space-between">
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button colorScheme='blue' type={"button"} onClick={onSubmitTransfer} color="white">
              <FiSave style={{ marginRight: 10 }} />
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

  )
}
export default TransferInChurchComponent;


export const getServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ['nextauth.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  //await apiClient.get("/users");


  return {
    props: {}
  }
}
