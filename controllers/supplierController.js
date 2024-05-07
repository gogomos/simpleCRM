// Import Prisma Client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all suppliers
const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await prisma.supplier.findMany();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch suppliers.' });
  }
};

// Get supplier by ID
const getSupplierById = async (req, res) => {
  const { id } = req.params;
  try {
    const supplier = await prisma.supplier.findUnique({
      where: { SupplierID: parseInt(id) }
    });
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found.' });
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch supplier.' });
  }
};

// Create a new supplier
const createSupplier = async (req, res) => {
  const { Name, Address, City, Phone, Email } = req.body;
  try {
    const newSupplier = await prisma.supplier.create({
      data: {
        Name,
        Address,
        City,
        Phone,
        Email
      }
    });
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create supplier.' });
  }
};

// Update an existing supplier
const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { Name, Address, City, Phone, Email } = req.body;
  try {
    const updatedSupplier = await prisma.supplier.update({
      where: { SupplierID: parseInt(id) },
      data: {
        Name,
        Address,
        City,
        Phone,
        Email
      }
    });
    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update supplier.' });
  }
};

// Delete a supplier
const deleteSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.supplier.delete({
      where: { SupplierID: parseInt(id) }
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete supplier.' });
  }
};

module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier
};
