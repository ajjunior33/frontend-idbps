import { useState } from 'react'
import { useForm } from 'react-hook-form'
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
} from '@chakra-ui/react'
import { FiSave } from 'react-icons/fi'
import { parseCookies } from 'nookies';

function TransferInChurchComponent({ change, onChange }) {

  const { register, handleSubmit, watch, formState: { erros } } = useForm();


  const onSubmit = data => {
    localStorage.setItem("previusChurchData", JSON.stringify(data));
    onChange(true)
    onClose();
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (

    <>

      <Button size={"sm"} colorScheme="facebook" onClick={onOpen}>Dados de tranferência entre igrejas</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>

            <ModalBody>
              <FormControl my={5}>
                <FormLabel>Data de saida da igreja anterior</FormLabel>
                <Input
                  {...register("exitChurchPrevious", { required: true })}
                  type='date'
                  required
                />
              </FormControl>

              <FormControl my={5}>
                <FormLabel>Data de entrada na igreja atual</FormLabel>
                <Input
                  {...register("startChurchCurrent", { required: true })}
                  type='date'
                  required
                />
              </FormControl>

              <FormControl my={5}>
                <FormLabel>Nome da Igreja anterior</FormLabel>
                <Input
                  {...register("churchPrevius", { required: true })}
                  type='text'
                  required
                />
              </FormControl>

              <FormControl my={5}>
                <FormLabel>Cargo caso tenha tido na igreja anterior</FormLabel>
                <Input
                  {...register("chargeInPreviusChurch", { required: true })}
                  type='text'
                  required
                />
              </FormControl>

              <FormControl my={5}>
                <FormLabel>Descrição de trabalhos desempenhados</FormLabel>
                <Textarea
                  {...register("descriptionWorkInChurch", { required: true })}
                  required
                />
              </FormControl>


            </ModalBody>

            <ModalFooter display={'flex'} alignItems="center" justifyContent="space-between">
              <Button colorScheme='red' mr={3} onClick={onClose}>
                Fechar
              </Button>
              <Button colorScheme='blue' type={"submit"} color="white">
                <FiSave style={{ marginRight: 10 }} />
                Salvar
              </Button>
            </ModalFooter>
          </form>
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