// Import Prisma Client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch products.' });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { ProductID: parseInt(id) }
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch product.' });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  const { Name, PurchasePrice, SalePrice, MarginRate, Dimension, Size } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        Name,
        PurchasePrice,
        SalePrice,
        MarginRate,
        Dimension,
        Size
      }
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create product.' });
  }
};

// Update an existing product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { Name, PurchasePrice, SalePrice, MarginRate, Dimension, Size } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { ProductID: parseInt(id) },
      data: {
        Name,
        PurchasePrice,
        SalePrice,
        MarginRate,
        Dimension,
        Size
      }
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update product.' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { ProductID: parseInt(id) }
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete product.' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
