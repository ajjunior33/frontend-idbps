import {
  Box,
} from '@chakra-ui/react'
import { parseCookies } from 'nookies';
import DefaultLayout from '../layout/DefaultLayout'
function Dashboard() {
  return (
    <>
      <DefaultLayout>
        <Box bg={"white"} p="8">

        </Box>
      </DefaultLayout>
    </>
  )
}

export default Dashboard;

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