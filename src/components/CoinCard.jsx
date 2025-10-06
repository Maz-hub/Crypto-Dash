// Displays the information for a single cryptocurrency
// Receives the "coin" object as a prop from the parent component (App.jsx)

const CoinCard = ({ coin }) => {
  return (
    <>
      {/* Each card shows a coin's image, name, symbol, price, and market data */}
      <div className="coin-card">
        {/* Header section: coin image + basic info */}
        <div className="coin-header">
          <img
            src={coin.image} // coin logo from API
            alt={coin.name} // accessible alt text
            className="coin-image"
          />
          <div>
            <h2>{coin.name}</h2> {/* Full coin name (e.g., Bitcoin) */}
            <p className="symbol">
              {coin.symbol.toUpperCase()}{" "}
              {/* Symbol in uppercase (e.g., BTC) */}
            </p>
          </div>
        </div>

        {/* Show current price formatted with commas (e.g., 54,000) */}
        <p>Price: ${coin.current_price.toLocaleString()}</p>

        {/* Price change in the last 24h — color changes based on positive or negative value */}
        <p
          className={
            coin.price_change_percentage_24h >= 0 ? "positive" : "negative"
          }
        >
          {/* Format the 24h price change to show only 2 decimal places (e.g., 3.45%) */}
          {coin.price_change_percentage_24h} %
        </p>

        {/* Market capitalization formatted with commas */}
        <p>Market Cap: {coin.market_cap.toLocaleString()}</p>
      </div>
    </>
  );
};

export default CoinCard;
