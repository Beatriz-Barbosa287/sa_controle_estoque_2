import Product from "../models/produtos";

export async function getProducts() {
  return await Product.find();
}

export async function createProduct(data: any) {
  const product = new Product(data);
  return await product.save();
}
