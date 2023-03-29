import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [coin, setCoin] = useState({});
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((respnse) => respnse.json())
      .then((json) => {
        setCoins(json);
        setCoin(json[0]);
        setLoading(false);
      });
  }, []);

  const exChange = (budget) => {
    return budget * (1 / coin?.quotes?.USD?.price) || 0;
  };

  const selectCoin = (event) => {
    let selectedCoin = event.target.selectedOptions[0].dataset.coin;
    let coinObj = coins.find((d) => d.id === selectedCoin);
    setCoin(coinObj);
  };

  const changeBudget = (event) => {
    setBudget(event.target.value);
  };

  return (
    <div>
      <h1>The Coins {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={selectCoin}>
          {coins.map((coin) => (
            <option data-coin={coin.id}>
              {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <div>
        <label htmlFor="bucks">달러 : </label>
        <input
          value={budget}
          onChange={changeBudget}
          id="bucks"
          placeholder="달러 > 비트코인"
        />
      </div>
      <div>
        <label htmlFor="coin">코인 : </label>
        <input value={exChange(budget)} id="coin" disabled />
      </div>
    </div>
  );
}

export default App;
