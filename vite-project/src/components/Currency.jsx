import { useState, useEffect } from 'react';
import '../css/currency.css';
import axios from 'axios';

const Currency = () => {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("TRY");
  const [result, setResult] = useState(0);
  const BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
  const API_KEY = "fca_live_6Vt66KE4n7JMCo4VuIJ5zalu3NE311kKuOQCdGEB";

  const exchange = async () => {
    try {
      if (isNaN(amount)) {
        throw new Error("Lütfen geçerli bir miktar girin!");
      }

      const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`);
      const result = (response.data.data[toCurrency] * amount).toFixed(2);
      setResult(result);
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    exchange();
  }, []);

  return (
    <div className="currency-div">
      <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className="amount" />
      <select onChange={(e) => setFromCurrency(e.target.value)}>
        <option>USD</option>
        <option>EUR</option>
        <option>TRY</option>
      </select>
      <select onChange={(e) => setToCurrency(e.target.value)}>
        <option>TRY</option>
        <option>EUR</option>
        <option>USD</option>
      </select>
      <input value={result} readOnly type="number" className="result" />
      <button onClick={exchange} className='exchange-button'>ÇEVİR</button>
    </div>
  )
}

export default Currency;
