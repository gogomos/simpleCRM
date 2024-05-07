// Import Prisma Client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all invoices
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch invoices.' });
  }
};

// Get invoice by ID
const getInvoiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { InvoiceID: parseInt(id) }
    });
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found.' });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch invoice.' });
  }
};

// Create a new invoice
const createInvoice = async (req, res) => {
  const { ClientID, Date, TotalAmount } = req.body;
  try {
    const existingClient = await prisma.client.findUnique({
      where: {
        ClientID: parseInt(ClientID)
      }
    });

    if (!existingClient) {
      return res.status(404).json({ error: 'Client not found.' });
    }
    const newInvoice = await prisma.invoice.create({
      data: {
        ClientID,
        Date,
        TotalAmount
      }
    });
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create invoice.' });
  }
};

// Update an existing invoice
const updateInvoice = async (req, res) => {
  const { id } = req.params;
  const { ClientID, Date, TotalAmount } = req.body;
  try {
    const updatedInvoice = await prisma.invoice.update({
      where: { InvoiceID: parseInt(id) },
      data: {
        ClientID,
        Date,
        TotalAmount
      }
    });
    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update invoice.' });
  }
};

// Delete an invoice
const deleteInvoice = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.invoice.delete({
      where: { InvoiceID: parseInt(id) }
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete invoice.' });
  }
};

module.exports = {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice
};
