import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import { ShopContext } from '../Context/ShopContext';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Products = () => {
  const { products, getCartItemsByUserId } = useContext(ShopContext);
  const location = useLocation();
  const productId = location.pathname.split('/').pop(); // Extract productId from the last part of the path
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getCartItemsByUserId();
      setLoading(false);
    };

    fetchData();
  }, [getCartItemsByUserId]);

  // Log productId from URL parameters
  console.log("ProductId from URL parameters:", productId);

  // Find product from products array based on productId
  const product = products.find((product) => product.productId === Number(productId));

  // Log products and retrieved product
  console.log("All products:", products);
  console.log("Retrieved product:", product);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!product) {
    // Log an error if product is not found
    console.error("Error: Product not found");
    return <div>Error: Product not found</div>;
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts product={product} />
    </div>
  );
}

export default Products;
