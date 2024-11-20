import axios from "axios";
import { useState } from "react";

export const productApi = axios.create({
  baseURL: "http://localhost:9000",
});

export const getProducts = (keyword="",page=2 ,size=4) => {
  return productApi.get(`/products?name_likes=${keyword}&_pages=${page}&_limit=${size}`);
};

export const deleteProducts = (product) => {
  return productApi.delete(`/products/${product.id}`);
};

export const getProductById = (id) => {
  return productApi.get(`/product/${id}`);
};

export const saveProducts = (product) => {
  return productApi.post(`/products`, product);
};

export const checkProducts = (product) => {
  return productApi.patch(`/products/${product.id}`, { checked: !product.checked });
};

export const updateProduct = (product) => {
  return productApi.put(`/products/${product.id}`, product);
};


export const useAppState = () => {
  const initialStat = {
    keyword: "",
    currentPage: 1,
    pageSize: 4,
    totalPages: 0,
    products: [],
  };
  const appState = useState(initialStat);
  return appState;
};