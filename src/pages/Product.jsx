/* eslint-disable react/prop-types */
import { useShopifyContext } from "../services/ShopifyProvider";

const Product = (props) => {
    let product = props.productData.node;
    let loading = props.loaded
    const {addItemToCheckout } = useShopifyContext()

    if (loading) {
        return (
            <>
                <div className="category">
                    <div className="textLoading"></div>
                    <div className="imageLoading"></div>
                </div>
            </>
        );
    } else {
        const hasDiscount =
            product.compareAtPriceRange.maxVariantPrice.amount != 0 &&  product.compareAtPriceRange.maxVariantPrice.amount !==
            product.priceRange.maxVariantPrice.amount;
        return (
            <>
                <div className="product-wrapper" id={product.id}>
                    <div className="product_image">
                        <img src={product.images.edges[0].node.src} alt={product.title} />
                    </div>
                    <div className="product_detail">
                        <div className="product_title">
                            <p>{product.title}</p>
                        </div>
                        <div className="product_price">
                            {hasDiscount ? (
                                <>
                                    <p className="original-price">
                                        {product.compareAtPriceRange.maxVariantPrice.amount} {product.priceRange.maxVariantPrice.currencyCode}
                                    </p>
                                    <p className="discounted-price">
                                        {product.priceRange.maxVariantPrice.amount} {product.priceRange.maxVariantPrice.currencyCode}
                                    </p>
                                </>
                            ) : (
                                <p className="price">{product.priceRange.maxVariantPrice.amount} {product.priceRange.maxVariantPrice.currencyCode}</p>
                            )}
                        </div>
                    </div>
                        <button className={"add_to_cart " + product.variants.edges[0].node.id} onClick={() => addItemToCheckout(product.variants.edges[0].node.id, 1)}>Añadir al carrito</button>
                </div>
            </>
        );
    }
}

export default Product;