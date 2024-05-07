// Import Prisma Client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all purchase orders
const getAllPurchaseOrders = async (req, res) => {
  try {
    const purchaseOrders = await prisma.purchaseorder.findMany();
    res.status(200).json(purchaseOrders);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch purchase orders.' });
  }
};

// Get purchase order by ID
const getPurchaseOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const purchaseOrder = await prisma.purchaseorder.findUnique({
      where: { OrderID: parseInt(id) }
    });
    if (!purchaseOrder) {
      return res.status(404).json({ error: 'Purchase order not found.' });
    }
    res.status(200).json(purchaseOrder);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch purchase order.' });
  }
};

// Create a new purchase order
const createPurchaseOrder = async (req, res) => {
  const { SupplierID, ProductID, Quantity, OrderDate } = req.body;
  try {
    const newPurchaseOrder = await prisma.purchaseorder.create({
      data: {
        SupplierID,
        ProductID,
        Quantity,
        OrderDate
      }
    });
    res.status(201).json(newPurchaseOrder);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create purchase order.' });
  }
};

// Update an existing purchase order
const updatePurchaseOrder = async (req, res) => {
  const { id } = req.params;
  const { SupplierID, ProductID, Quantity, OrderDate } = req.body;
  try {
    const updatedPurchaseOrder = await prisma.purchaseorder.update({
      where: { OrderID: parseInt(id) },
      data: {
        SupplierID,
        ProductID,
        Quantity,
        OrderDate
      }
    });
    res.status(200).json(updatedPurchaseOrder);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update purchase order.' });
  }
};

// Delete a purchase order
const deletePurchaseOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.purchaseorder.delete({
      where: { OrderID: parseInt(id) }
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete purchase order.' });
  }
};

module.exports = {
  getAllPurchaseOrders,
  getPurchaseOrderById,
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder
};
