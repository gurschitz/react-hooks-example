import axios from "axios";

function getRate({ baseCurrency, currency, cancelToken }) {
  return axios.get("https://api.exchangeratesapi.io/latest", {
    params: {
      base: baseCurrency,
      symbols: currency
    },
    cancelToken
  });
}

export default getRate;
