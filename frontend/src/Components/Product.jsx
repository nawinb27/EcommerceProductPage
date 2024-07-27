import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import Store from '../Store';

function Product() {
  const [quantity, setQuantity] = useState(0);
  const [productData, setProductData] = useState({});
  const [activeImg, setActiveImg] = useState(null);

  const { state, dispatch } = useContext(Store);
  // const cart = { state };

  // console.log(cart);

  const plusHandler = () => {
    setQuantity((q) => q + 1);
  };

  const minusHandler = () => {
    setQuantity((q) => q - 1);
  };

  const [productImage, setProductImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get('http://localhost:3000/api/data');
        setProductData(data.data);
        setProductImage(data.data.image1);
        setActiveImg('image1');
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  const productImageHandler = (image, imageKey) => {
    setRotate('main-image');
    setProductImage((p) => image);
    setActiveImg(imageKey);
  };

  function addToCartHandler(item) {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...item, quantity },
    });
  }

  const [rotate, setRotate] = useState('main-image');

  useEffect(() => {
    setTimeout(() => {
      setRotate('main-image-active');
    }, 10);
    setRotate('main-image');
  }, [productImage]);

  return (
    <div className="product-container">
      <div className="product-snaps">
        <div className="image">
          <img className={rotate} src={productImage}></img>
        </div>
        <div className="images-slideshow">
          <img
            onClick={() => productImageHandler(productData.image1, 'image1')}
            src="/images/image-product-1-thumbnail.jpg"
            alt="sneaker"
            className={`slide-img ${activeImg === 'image1' ? 'active' : ''}`}
          />
          <img
            onClick={() => productImageHandler(productData.image2, 'image2')}
            src="/images/image-product-2-thumbnail.jpg"
            alt=""
            className={`slide-img ${activeImg === 'image2' ? 'active' : ''}`}
          />
          <img
            onClick={() => productImageHandler(productData.image3, 'image3')}
            src="/images/image-product-3-thumbnail.jpg"
            alt=""
            className={`slide-img ${activeImg === 'image3' ? 'active' : ''}`}
          />
          <img
            onClick={() => productImageHandler(productData.image4, 'image4')}
            src="/images/image-product-4-thumbnail.jpg"
            alt=""
            className={`slide-img ${activeImg === 'image4' ? 'active' : ''}`}
          />
        </div>
      </div>
      <div className="product-desc">
        <div className="company-name">SNEAKER COMPANY</div>
        <div className="product-heading">
          <h1>Fall Limited Edition Sneakers</h1>
        </div>
        <div className="description">
          <p>
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they’ll withstand everything
            the weather can offer.
          </p>
        </div>

        <div className="product-price">
          <h2>
            $125.00 <span className="discount">50%</span>
          </h2>
        </div>
        <div className="actual-price">
          <p>$250.00</p>
        </div>
        <div className="cart-handler">
          <div className="handler">
            <div onClick={minusHandler} className="minus">
              -
            </div>
            <div className="quan">{quantity}</div>
            <div onClick={plusHandler} className="plus">
              +
            </div>
          </div>
          <div className="add-to-cart-btn">
            <button
              onClick={() => addToCartHandler(productData)}
              className="add-to-cart"
            >
              <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                  fill="#fff"
                />
              </svg>{' '}
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
