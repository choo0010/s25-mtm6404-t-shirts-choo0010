const initialTshirts = [
  {
    title: 'Blue T-Shirt',
    image: 'blue-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Bright Purple T-Shirt',
    image: 'bright-purple-t-shirt.jpg',
    price: 5.99,
    stock: 1,
    quantity: 1
  },
  {
    title: 'Cobalt Blue T-Shirt',
    image: 'cobalt-blue-t-shirt.jpg',
    price: 9.99,
    stock: 5,
    quantity: 1
  },
  {
    title: 'Green T-Shirt',
    image: 'green-t-shirt.jpg',
    price: 6.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Grey T-Shirt',
    image: 'blue-t-shirt.jpg',
    price: 4.99,
    stock: 2,
    quantity: 1
  },
  {
    title: 'Light Green T-Shirt',
    image: 'light-green-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Purple T-Shirt',
    image: 'purple-t-shirt.jpg',
    price: 7.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Red T-Shirt',
    image: 'red-t-shirt.jpg',
    price: 6.99,
    stock: 3,
    quantity: 1
  },
  {
    title: 'Teal T-Shirt',
    image: 'teal-t-shirt.jpg',
    price: 7.99,
    stock: 2,
    quantity: 1
  }
];

function TShirtCard({ tshirt, onBuy, onQuantityChange }) {
  return (
    <div style={{ border: '1px solid gray', padding: 10, margin: 10, width: 220 }}>
      <img src={tshirt.image} alt={tshirt.title} width="200" height="200" />
      <h3>{tshirt.title}</h3>
      <p>Price: ${tshirt.price.toFixed(2)}</p>
      <p>Stock: {tshirt.stock}</p>

      {tshirt.stock === 0 ? (
        <p style={{ color: 'red' }}><strong>Out of Stock</strong></p>
      ) : (
        <React.Fragment>
          <label>
            Quantity:
            <select
              value={tshirt.quantity}
              onChange={(e) => onQuantityChange(tshirt.title, parseInt(e.target.value))}
            >
              {Array.from({ length: tshirt.stock }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </label>
          <br />
          <button onClick={() => onBuy(tshirt.title)}>Buy</button>
        </React.Fragment>
      )}
    </div>
  );
}

function App() {
  const [tshirts, setTshirts] = React.useState(() => {
    const stored = localStorage.getItem('tshirts');
    return stored ? JSON.parse(stored) : initialTshirts;
  });

  React.useEffect(() => {
    localStorage.setItem('tshirts', JSON.stringify(tshirts));
  }, [tshirts]);

  const handleBuy = (title) => {
    setTshirts(tshirts.map(t =>
      t.title === title && t.stock >= t.quantity
        ? { ...t, stock: t.stock - t.quantity }
        : t
    ));
  };

  const handleQuantityChange = (title, quantity) => {
    setTshirts(tshirts.map(t =>
      t.title === title ? { ...t, quantity } : t
    ));
  };

  return (
    <div>
      <h1>T-Shirt Store</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {tshirts.map(tshirt => (
          <TShirtCard
            key={tshirt.title}
            tshirt={tshirt}
            onBuy={handleBuy}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
