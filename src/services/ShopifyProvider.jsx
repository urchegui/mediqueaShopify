import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import React, { createContext, useState, useContext, useEffect } from "react";

const client = createStorefrontApiClient({
  storeDomain: `${import.meta.env.VITE_STORE_DOMAIN}`,
  apiVersion: "2024-04",
  publicAccessToken: `${import.meta.env.VITE_PUBLIC_ACCESS_TOKEN}`,
});

const ShopifyContext = createContext();

const GET_ARTICLES_QUERY = `
  query getArticles {
    articles(sortKey: PUBLISHED_AT, first: 250) {
      edges {
        node {
          contentHtml
          tags
          title
          image {
            src
          }
        }
      }
    }
  }
`;
const GET_CATEGORIES_QUERY = `
  query getCategories{
    blogs(first: 20, sortKey: TITLE) {
      edges {
        node {
          title
          seo {
            title
          }
        }
      }
    }
  }
`;

const GET_PRODUCTS = `query getAnkis {
  collections(first: 10) {
    edges {
      node {
        title
        description
        products(first: 100) {
          edges {
            node {
              title
              id
              tags
              images(first: 100) {
                edges {
                  node {
                    src
                  }
                }
              }
              priceRange {
                maxVariantPrice {
                  amount
                  currencyCode
                }
                minVariantPrice {
                  currencyCode
                  amount
                }
              }
              compareAtPriceRange {
                maxVariantPrice {
                  amount
                  currencyCode
                }
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              variants(first: 50) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;

const createCart = `
mutation createCart {
  cartCreate(
    input: {
      lines: [
      ]
    }
  ) {
    cart {
      id
      createdAt
      updatedAt
      lines(first: 10) {
        edges {
          node {
            id
            merchandise {
              ... on ProductVariant {
                id
              }
            }
          }
        }
      }
      	cost {
        totalAmount {
          amount
          currencyCode
        }        
      }
    }
  }
}`;

const addItemToCartMutation = `
mutation addItemToCART($cartId: ID!, $variantId: ID!){
  cartLinesAdd(
    cartId: $cartId
    lines: {
      merchandiseId: $variantId
      quantity: 1
    }
  ) {
    cart {
      id
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
              }
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
    }
  }
}
`;
const retrieveCart = `
query retrieveCart($cartId: ID!){
   cart(
    id: $cartId
  ) {
    id
    createdAt
    updatedAt
    lines(first: 10) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              image {
                src
              }
              price {
                amount
                currencyCode
              }
              product {
                title
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
    }
  }
}
`;

const deleteItem = `
mutation deleteItem($cartId: ID!, $variantId: ID!){
  cartLinesUpdate(
    cartId: $cartId
    lines: {
      id: $variantId
      quantity: 0
    }
  ) {
    cart {
      id
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
              }
            }
          }
        }
      }
    }
  }
}
`
const updateItem = `
mutation updateItem($cartId: ID!, $variantId: ID!, $quantity: Int!){
  cartLinesUpdate(
    cartId: $cartId
    lines: {
      id: $variantId
      quantity: $quantity
    }
  ) {
    cart {
      id
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                image {
                  src
                }
                price {
                  amount
                  currencyCode
                }
                product {
                  title
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
}
`

const checkoutURL =`
  query checkoutURL ($cartId: ID!){
    cart(id: $cartId) {
      checkoutUrl
    }
  }
`

export const ShopifyProvider = ({ children }) => {
  const [state, setState] = useState({
    products: [],
    product: {},
    checkout: {},
    checkoutUrl: null,
    cartPrice: 0,
    productQuantity: [],
    cartID: null,
    cartQuantity: 0,
    isCartOpen: false,
    articles: [],
    categories: [],
    loadingArticles: true,
    loadingProducts: true,
    loadingCategories: true,
    error: null,
  });

  const fetchArticles = async (props) => {
    try {
      const { data } = await client.request(GET_ARTICLES_QUERY);

      const articles = data.articles.edges.map((edge) => edge.node);
      const filtered = articles.filter((article) =>
        article.tags.includes(props)
      );
      setState((prevState) => ({
        ...prevState,
        articles: filtered,
        loadingArticles: false,
      }));
    } catch (error) {
      console.log("fetch wrong: " + error);
      setState((prevState) => ({
        ...prevState,
        error,
        loadingArticles: false,
      }));
    }
  };
  const fetchCategories = async () => {
    try {
      const { data } = await client.request(GET_CATEGORIES_QUERY);
      const categories = data.blogs.edges.map((edge) => edge.node);
      setState((prevState) => ({
        ...prevState,
        categories,
        loadingCategories: false,
      }));
    } catch (error) {
      console.log("fetch wrong: " + error);
      setState((prevState) => ({
        ...prevState,
        error,
        loadingCategories: false,
      }));
    }
  };
  const fetchProducts = async () => {
    try {
      const { data } = await client.request(GET_PRODUCTS);
      const products = data.collections.edges.map((edge) => edge.node);
      setState((prevState) => ({
        ...prevState,
        products,
        loadingProducts: false,
      }));
    } catch (error) {
      console.log("fetch wrong: " + error);
      setState((prevState) => ({
        ...prevState,
        error,
        loadingProducts: false,
      }));
    }
  };

  const initializeCart = async () => {
    try {
      const { data } = await client.request(createCart);
      const cartID = data.cartCreate.cart.id;
      localStorage.setItem("cartId", cartID);
      setState((prevState) => ({
        ...prevState,
        cartID,
      }));
    } catch (error) {
      console.log("fetch error:  " + error);
      setState((prevState) => ({
        ...prevState,
        error,
      }));
    }  
  };

  const addItemToCheckout = async (variantID) => {
    try {
      const { cartID } = state;

      const variables = {
        cartId: cartID,
        variantId: variantID,
      };

      const { data } = await client.request(addItemToCartMutation, {
        variables,
      });
      let cartQuantity = data.cartLinesAdd.cart.lines.edges;
      cartQuantity = cartQuantity.length;

      setState((prevState) => ({
        ...prevState,
        cartQuantity,
      }));
    } catch (error) {
      console.log("fetch error:  " + error);
      setState((prevState) => ({
        ...prevState,
        error,
      }));
    }
  };

  const showCartItems = async () => {
    try {
      const { cartID } = state;

      const variables = {
        cartId: cartID,
      };

      const { data } = await client.request(retrieveCart, { variables });
      const checkout = data.cart.lines.edges;
      const cartPrice = data.cart.cost;

      setState((prevState) => ({
        ...prevState,
        checkout,
        cartPrice,
      }));
    } catch (error) {
      console.log("fetch error:  " + error);
      setState((prevState) => ({
        ...prevState,
        error,
      }));
    }
  };

  const getCartItemsQuantity = async () => {
    try {
      const variables = {
        cartId: localStorage.getItem("cartId"),
      };

      const { data } = await client.request(retrieveCart, { variables });
      const cartQuantity = data.cart.lines.edges.length;

      setState((prevState) => ({
        ...prevState,
        cartQuantity,
      }));
    } catch (error) {
      console.log("fetch error:  " + error);
      setState((prevState) => ({
        ...prevState,
        error,
        loading: false,
      }));
    }
  };

  const handleCartToggle = async () => {
    setState((prevState) => ({
      ...prevState,
      isCartOpen: !prevState.isCartOpen,
    }));
  };

  const deleteItemFromCheckout = async (id) => {
    try {

      const { cartID } = state;

      const variables = {
        cartId: cartID,
        variantId: id
      };

      const { data } = await client.request(deleteItem, { variables });
      const cartQuantity = data.cartLinesUpdate.cart.lines.edges.length;
      const cartPrice = data.cartLinesUpdate.cart.cost;

      setState((prevState) => ({
        ...prevState,
        cartQuantity,
        cartPrice,
      }));
    } catch (error) {
      console.log("fetch error:  " + error);
      setState((prevState) => ({
        ...prevState,
        error,
        loading: false,
      }));
    }
  };

  const checkouturl = async () => {
    try {

      let { cartID } = state;
      cartID = cartID == null ? localStorage.getItem("cartId") : cartID

      const variables = {
        cartId: cartID
      };

      const { data } = await client.request(checkoutURL, { variables });
      const checkoutUrl = data.cart.checkoutUrl;

      setState((prevState) => ({
        ...prevState,
        checkoutUrl,
      }));
    } catch (error) {
      console.log("fetch error:  " + error);
      setState((prevState) => ({
        ...prevState,
        error,
        loading: false,
      }));
    }
  };

  const updateItemQuantity = async (quantity, id) => {
    try {

      const { cartID } = state;

      const variables = {
        cartId: cartID,
        variantId: id,
        quantity: quantity
      };

      const { data } = await client.request(updateItem, { variables });
      const checkout = data.cartLinesUpdate.cart.lines.edges;
      const cartPrice = data.cartLinesUpdate.cart.cost;

      let productQuantity = [];
      
      data.cartLinesUpdate.cart.lines.edges.map((element)=>{
        const id = element.node.id
        const quantity = element.node.quantity
        productQuantity.push({"id": id, "quantity":quantity})
      })

      setState((prevState) => ({
        ...prevState,
        productQuantity: productQuantity,
        checkout,
        cartPrice,
      }));
      setState((prevState) => ({
        ...prevState,
        checkout,
      }));
    } catch (error) {
      console.log("fetch error:  " + error);
      setState((prevState) => ({
        ...prevState,
        error,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchArticles();
    fetchProducts();  
    if (localStorage.getItem("cartId") == null) {
      initializeCart();
    } else {
      setState((prevState) => ({
        ...prevState,
        cartID: localStorage.getItem("cartId"),
      }));
      getCartItemsQuantity(localStorage.getItem("cartId"));
    }   
    checkouturl();   
  }, []);

  return (
    <ShopifyContext.Provider
      value={{
        state,
        setState,
        fetchArticles,
        fetchProducts,
        addItemToCheckout,
        handleCartToggle,
        showCartItems,
        deleteItemFromCheckout,
        updateItemQuantity,
        checkouturl
      }}
    >
      {children}
    </ShopifyContext.Provider>
  );
};

export const useShopifyContext = () => {
  return useContext(ShopifyContext);
};
