import { useEffect, useState } from "react";
import axios from "axios";
import getRate from "./getRate";

function useRate(baseCurrency, currency) {
  const delay = 5000;
  const [rate, setRate] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const cancelToken = source.token;

    async function loadRate() {
      const result = await getRate({ currency, baseCurrency, cancelToken });
      setLastUpdated(new Date());
      setRate(result.data.rates[currency]);
    }

    loadRate();
    let interval = setInterval(loadRate, delay);

    return () => {
      source.cancel();
      clearInterval(interval);
    };
  }, [baseCurrency, currency, delay]);

  return { rate, lastUpdated };
}

export default useRate;
