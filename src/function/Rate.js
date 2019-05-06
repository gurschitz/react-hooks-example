import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import getRate from "../getRate";

function Rate({ baseCurrency, currency }) {
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

  return (
    <div className="rate-fc">
      <span className="rate-fc__value">
        1 {baseCurrency} = {rate} {currency}
      </span>
      {lastUpdated && (
        <div className="rate-fc__date">
          updated at {lastUpdated.toTimeString()}
        </div>
      )}
    </div>
  );
}

export default Rate;
