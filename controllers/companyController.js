// Import Prisma Client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await prisma.company.findMany();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch companies.' });
  }
};

// Get company by ID
const getCompanyById = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await prisma.company.findUnique({
      where: { CompanyID: parseInt(id) }
    });
    if (!company) {
      return res.status(404).json({ error: 'Company not found.' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch company.' });
  }
};

// Create a new company
const createCompany = async (req, res) => {
  const { Name, Address, CreationDate, FiscalIdentifier, Capital, NumberOfEmployees, City, Responsible, Phone, Email } = req.body;
  try {
    const newCompany = await prisma.company.create({
      data: {
        Name,
        Address,
        CreationDate,
        FiscalIdentifier,
        Capital,
        NumberOfEmployees,
        City,
        Responsible,
        Phone,
        Email
      }
    });
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create company.' });
  }
};

// Update an existing company
const updateCompany = async (req, res) => {
  const { id } = req.params;
  const { Name, Address, CreationDate, FiscalIdentifier, Capital, NumberOfEmployees, City, Responsible, Phone, Email } = req.body;
  try {
    const updatedCompany = await prisma.company.update({
      where: { CompanyID: parseInt(id) },
      data: {
        Name,
        Address,
        CreationDate,
        FiscalIdentifier,
        Capital,
        NumberOfEmployees,
        City,
        Responsible,
        Phone,
        Email
      }
    });
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update company.' });
  }
};

// Delete a company
const deleteCompany = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.company.delete({
      where: { CompanyID: parseInt(id) }
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete company.' });
  }
};

module.exports = {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
};
