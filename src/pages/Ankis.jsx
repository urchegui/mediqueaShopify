/* eslint-disable react/prop-types */
import { useOutletContext } from 'react-router-dom';
import { useShopifyContext } from '../services/ShopifyProvider';
import Product from "./Product"
import "./product.scss";
import { useEffect, useState } from 'react';

const Ankis = () => {
  const selectedOption = useOutletContext();
  const { state } = useShopifyContext();
  const { products, loadingProducts } = state;
  const [matchingProduct, setMatchingProduct] = useState(null);
  const [featuredProduct, setFeaturedProduct] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const foundProduct = products.find(product => product.title === selectedOption);
    const foundFeaturedProduct = products.flatMap(product =>
      product.products.edges.filter(element =>
        element?.node?.tags?.[0] === selectedOption
      )
    )[0];   

    setFeaturedProduct(foundFeaturedProduct)
    setMatchingProduct(foundProduct);
  }, [selectedOption, products]);

  return (
    <>
      {matchingProduct ? (
        <div className="product-page">
          <div className='product-page_top'>
            <div className='collection-info'>
              <div className="collection-title">
                <h1>{matchingProduct.title}</h1>
              </div>
              <div className="collection-description">
                <p>{matchingProduct.description}</p>
              </div>
            </div>
            <div className="complete-pack">
            {featuredProduct && (
              <Product productData={featuredProduct} />
            )}
            </div>
          </div>
          <div className="product_list">
          {loadingProducts ? (
            <Product loaded={loadingProducts} />
          ) : (
            matchingProduct.products.edges.map((product, idx) => (          
                <Product key={idx} productData={product} loaded={loadingProducts} />
            ))
          )}
          </div>
        </div>
      ) : (
        <p>No product matches the selected option.</p>
      )}
    </>
  );
};

export default Ankis;
