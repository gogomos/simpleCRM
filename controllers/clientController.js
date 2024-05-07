// Import Prisma Client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all clients
const getAllClients = async (req, res) => {
  try {
    const clients = await prisma.client.findMany();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch clients.' });
  }
};

// Get client by ID
const getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await prisma.client.findUnique({
      where: { ClientID: parseInt(id) }
    });
    if (!client) {
      return res.status(404).json({ error: 'Client not found.' });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch client.' });
  }
};

// Create a new client
const createClient = async (req, res) => {
  const { FirstName, LastName, Address, City, Phone, Email } = req.body;
  try {
    const newClient = await prisma.client.create({
      data: {
        FirstName,
        LastName,
        Address,
        City,
        Phone,
        Email
      }
    });
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create client.' });
  }
};

// Update an existing client
const updateClient = async (req, res) => {
  const { id } = req.params;
  const { FirstName, LastName, Address, City, Phone, Email } = req.body;
  try {
    const updatedClient = await prisma.client.update({
      where: { ClientID: parseInt(id) },
      data: {
        FirstName,
        LastName,
        Address,
        City,
        Phone,
        Email
      }
    });
    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update client.' });
  }
};

// Delete a client
const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.client.delete({
      where: { ClientID: parseInt(id) }
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete client.' });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};
