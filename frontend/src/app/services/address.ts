import axios from "axios";

export default async function getAddress(cep: string) {
  const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

  if (data.erro) {
    return null;
  }

  return data;
}

export async function getStates() {
  const { data } = await axios.get(`https://brasilapi.com.br/api/ibge/uf/v1`);

  if (data.erro) {
    return null;
  }

  return data;
}

export async function getCities(state: string) {
  const { data } = await axios.get(`https://brasilapi.com.br/api/ibge/municipios/v1/${state}`);

  if (data.erro) {
    return null;
  }

  return data;
}
