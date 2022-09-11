import { getAPIClient } from './axios';


const api = getAPIClient();
const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount));
export async function signInRequest(data) {
  await delay(1000)

  const request = await api.post("/session", data, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const { user, token } = request.data
  return {
    token,
    user
  }

}

export async function recoverUserInformation(token) {
  await delay(1000);

  const request = await api.post("/session/refresh", {}, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  const { user } = request.data;
  console.log(user);
  return {
    token,
    user
  }
}
