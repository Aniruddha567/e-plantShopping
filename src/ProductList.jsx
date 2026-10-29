import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night and improves air quality.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from indoor air.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes mold spores and purifies air indoor.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Acts as a natural humidifier and air purifier.", cost: "$14" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/03/rubber-plant-4850669_1280.jpg", description: "Large shiny leaves that effectively absorb toxins.", cost: "$20" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/17/44/aloe-vera-3284523_1280.jpg", description: "Clears toxins and offers soothing skin gel.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2015/07/02/10/22/lavender-828841_1280.jpg", description: "Calming aroma that aids relaxation and sleep.", cost: "$22" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2019/08/08/11/33/jasmine-4392723_1280.jpg", description: "Sweet floral fragrance that fills room.", cost: "$25" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating scent used in culinary arts.", cost: "$15" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/19/17/56/mint-1149971_1280.jpg", description: "Fresh minty fragrance and great for teas.", cost: "$10" },
        { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2016/11/29/03/53/eucalyptus-1867185_1280.jpg", description: "Refreshing medicinal fragrance.", cost: "$18" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2017/05/11/19/44/lemon-balm-2305192_1280.jpg", description: "Citrus aroma that relieves stress.", cost: "$12" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://cdn.pixabay.com/photo/2021/01/15/18/12/zz-plant-5919982_1280.jpg", description: "Thrives in low light with minimal watering.", cost: "$20" },
        { name: "Pothos", image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/pothos-3816922_1280.jpg", description: "Fast-growing vine extremely resilient.", cost: "$12" },
        { name: "Cast Iron Plant", image: "https://cdn.pixabay.com/photo/2020/05/11/15/10/plant-5158674_1280.jpg", description: "Virtually indestructible indoor plant.", cost: "$24" },
        { name: "Succulent Collection", image: "https://cdn.pixabay.com/photo/2016/11/21/16/06/succulents-1846147_1280.jpg", description: "Requires minimal water and attention.", cost: "$16" },
        { name: "Jade Plant", image: "https://cdn.pixabay.com/photo/2020/03/09/17/41/jade-plant-4916524_1280.jpg", description: "Succulent with thick woody stems.", cost: "$15" },
        { name: "Chinese Evergreen", image: "https://cdn.pixabay.com/photo/2020/03/17/14/08/aglaonema-4940502_1280.jpg", description: "Tolerates low light and dry indoor air.", cost: "$22" }
      ]
    }
  ];

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true,
    }));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-logo" onClick={() => setShowCart(false)}>
          <h3>Paradise Nursery</h3>
        </div>
        <div className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Plants</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(true); }} className="cart-icon">
            🛒 <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid-container">
          {plantsArray.map((categoryObj, index) => (
            <div key={index} className="category-section">
              <h2 className="category-title">{categoryObj.category}</h2>
              <div className="product-list">
                {categoryObj.plants.map((plant, plantIdx) => (
                  <div key={plantIdx} className="product-card">
                    <img src={plant.image} alt={plant.name} className="product-image" />
                    <h3 className="product-name">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <p className="product-cost">{plant.cost}</p>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)}
                    >
                      {addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)
                        ? "Added to Cart"
                        : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;