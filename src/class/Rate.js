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
    this.loadRate();
    this.initializeRateInterval();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.currency !== this.props.currency ||
      prevProps.baseCurrency !== this.props.baseCurrency
    ) {
      this.cancelRateRequest();
      clearInterval(this.interval);
      this.loadRate();
      this.initializeRateInterval();
    }
  }

  componentWillUnmount() {
    this.cancelRateRequest();
    clearInterval(this.interval);
  }

  cancelRateRequest() {
    if (this.state.source) {
      this.state.source.cancel();
    }
  }

  initializeRateInterval() {
    this.interval = setInterval(() => this.loadRate(), this.delay);
  }

  async loadRate() {
    const source = axios.CancelToken.source();
    this.setState({ source });
    const result = await getRate({
      currency: this.props.currency,
      baseCurrency: this.props.baseCurrency,
      cancelToken: source.token
    });
    this.setState({
      rate: result.data.rates[this.props.currency],
      lastUpdated: new Date()
    });
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
