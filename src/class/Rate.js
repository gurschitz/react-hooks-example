import React from "react";
import axios from "axios";
import getRate from "../getRate";

class Rate extends React.Component {
  delay = 5000;
  state = {
    lastUpdated: null,
    source: null
  };

  componentDidMount() {
    this.initializeRateInterval();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.currency !== this.props.currency ||
      prevProps.baseCurrency !== this.props.baseCurrency
    ) {
      this.cancelRateRequest();
      clearInterval(this.interval);
      this.initializeRateInterval();
    }
  }

  componentWillUnmount() {
    this.cancelRateRequest();
    clearInterval(this.interval);
  }

  initializeRateInterval() {
    this.loadRate();
    this.interval = setInterval(() => this.loadRate(), this.delay);
  }

  cancelRateRequest() {
    if (this.state.source) {
      this.state.source.cancel();
    }
  }

  async loadRate() {
    const { currency, baseCurrency } = this.props;
    const source = axios.CancelToken.source();
    const cancelToken = source.token;
    const result = await getRate({ currency, baseCurrency, cancelToken });
    const rate = result.data.rates[currency];
    const lastUpdated = new Date();
    this.setState({ rate, lastUpdated, source });
  }

  render() {
    const { currency, baseCurrency } = this.props;
    const { rate, lastUpdated } = this.state;
    return (
      <div className="rate">
        <span className="rate__value">
          1 {baseCurrency} = {rate} {currency}
        </span>
        {lastUpdated && (
          <div className="rate__date">
            updated at {lastUpdated.toTimeString()}
          </div>
        )}
      </div>
    );
  }
}

export default Rate;
