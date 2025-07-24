import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchProductData = () => {
    const item = products.find((item) => item._id === productId);
    if (item) {
      setProductData(item);

      // Make sure all images are available, otherwise use a placeholder image
      const allImages = item.images && item.images.length > 0 ? item.images : [assets.placeholder_image];
      
      setImage(allImages[0]);  // Set the first image by default
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return isLoading ? (
    <div className="spinner">Loading...</div>
  ) : productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto justify-between sm:justify-normal w-full sm:w-[18.7%]">
            {/* Displaying all images dynamically */}
            {productData.images && productData.images.length > 0 ? (
              productData.images.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  src={item || assets.placeholder_image}
                  key={index}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                  alt={`Product image ${index + 1}`}
                />
              ))
            ) : (
              <img
                src={assets.placeholder_image}
                alt="No Image Available"
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0"
              />
            )}
          </div>
          <div className="w-full sm:w-[80%]">
            {/* Main image */}
            <img
              src={image}
              className="w-full h-auto transition-image"
              alt="Main Product"
            />
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {/* Rating Section */}
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency} {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5 ">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.size.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? "border-orange-500" : ""}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange within 7 days</p>
          </div>
        </div>
      </div>
      {/* Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border py-3 px-5 text-sm">Description</b>
          <p className="border py-3 px-5 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates buying
            and selling products globally.
          </p>
          <p>
            Each product typically has its own dedicated page with relevant
            information.
          </p>
        </div>
      </div>
      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div>No product found</div>
  );
};

export default Product;
