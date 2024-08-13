import axios from "axios";

async function getAddress(cep: string) {
  const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

  if (data.erro) {
    return null;
  }

  return data;
}

export default getAddress;
