import axios from "axios";

export const productApi = axios.create({
  baseURL: "http://localhost:9000",
});

export const getProducts = () => {
  return productApi.get(`/products/`);
};

export const deleteProducts = (product) => {
  return productApi.delete(`/products/${product.id}`);
};

export const getProduct = (id) => {
  return productApi.get(`/products/${id}`);
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
