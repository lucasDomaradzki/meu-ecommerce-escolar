// src/data/adminEntities.js

// Função para gerar um ID único simples (para mocks)
const generateUniqueId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Dados mockados de produtos
const mockProducts = [
  { id: 'PROD001', name: 'Caderno Universitário 10 Matérias', description: 'Caderno de capa dura com 10 matérias.', price: 25.00, stock: 150, category: 'Material Escolar' },
  { id: 'PROD002', name: 'Lápis de Cor (12 cores)', description: 'Conjunto de lápis de cor vibrantes.', price: 18.50, stock: 200, category: 'Material Escolar' },
  { id: 'PROD003', name: 'Mochila Escolar Reforçada', description: 'Mochila durável com vários compartimentos.', price: 120.00, stock: 80, category: 'Acessórios' },
  { id: 'PROD004', name: 'Caneta Esferográfica Azul', description: 'Caneta esferográfica padrão azul.', price: 2.50, stock: 500, category: 'Material Escolar' },
  { id: 'PROD005', name: 'Borracha Branca', description: 'Borracha macia de alta qualidade.', price: 1.50, stock: 300, category: 'Material Escolar' },
];

// Dados mockados de fornecedores (distribuidores) - Mantidos para consistência geral
const mockSuppliers = [
  { id: 'SUP001', name: 'Distribuidora Alfa', contactPerson: 'Ana Silva', phone: '11987654321', email: 'contato@alfa.com', address: 'Rua das Flores, 123' },
  { id: 'SUP002', name: 'Beta Suprimentos', contactPerson: 'Bruno Costa', phone: '21912345678', email: 'vendas@beta.com', address: 'Av. Central, 456' },
];

// Dados mockados de empresas de entrega - Mantidos para consistência geral
const mockShippingCompanies = [
  { id: 'SHIP001', name: 'Loggi Prime', contactPerson: 'João Pedro', phone: '11998887777', email: 'contato@loggiprime.com', address: 'Rua das Entregas, 10' },
];

// Dados mockados de escolas - Mantidos para consistência geral
const mockSchools = [
  { id: 'SCH001', name: 'Escola Modelo Ltda', contactPerson: 'Carlos Santos', phone: '11933334444', email: 'contato@escola.com', address: 'Rua do Saber, 1' },
];

// Dados mockados de contatos - Mantidos para consistência geral
const mockContacts = [
  { id: 'c-abc-1', name: 'Ana Costa', email: 'ana.costa@loggiprime.com', phone: '21912345678', role: 'Logística', entityType: 'shippingCompany', entityId: 'SHIP001', entityName: 'Loggi Prime' },
  { id: 'c-def-2', name: 'João Silva', email: 'joao.silva@alfa.com', phone: '11911112222', role: 'Gerente Comercial', entityType: 'supplier', entityId: 'SUP001', entityName: 'Distribuidora Alfa' },
];

// Dados mockados de inventário
const mockInventory = [
  { id: 'INV001', productId: 'PROD001', location: 'Armazém A1', quantityAvailable: 50, quantityReserved: 10, status: 'AVAILABLE', lastUpdate: '10/07/2024, 11:30:00' },
  { id: 'INV002', productId: 'PROD002', location: 'Armazém B2', quantityAvailable: 80, quantityReserved: 5, status: 'AVAILABLE', lastUpdate: '10/07/2024, 12:00:00' },
  { id: 'INV003', productId: 'PROD003', location: 'Loja Principal', quantityAvailable: 10, quantityReserved: 2, status: 'LOW_STOCK', lastUpdate: '10/07/2024, 13:00:00' },
  { id: 'INV004', productId: 'PROD004', location: 'Armazém A1', quantityAvailable: 200, quantityReserved: 0, status: 'AVAILABLE', lastUpdate: '11/07/2024, 09:00:00' },
];

// Dados mockados de pedidos (exemplo simples) - Mantidos para consistência geral
const mockOrders = [
  {
    id: 'ORD001',
    distributorId: 'SUP001',
    distributorName: 'Distribuidora Alfa',
    contactPersonId: 'c-def-2', // João Silva
    contactPersonName: 'João Silva',
    deliveryAddress: 'Rua das Flores, 123 - Centro, São Paulo - SP',
    shippingCompanyId: 'SHIP001',
    shippingCompanyName: 'Loggi Prime',
    status: 'PENDING',
    orderDate: '2024-07-01',
    deliveryDate: '2024-07-10',
    items: [
      { productId: 'PROD001', productName: 'Caderno Universitário 10 Matérias', quantity: 20, price: 25.00 },
    ],
    total: 20 * 25.00,
    trackingCode: 'LP12345ABC',
  },
];


// Objeto principal que exporta todas as entidades mockadas
export const allEntities = {
  products: mockProducts,
  suppliers: mockSuppliers,
  shippingCompanies: mockShippingCompanies,
  schools: mockSchools,
  contacts: mockContacts,
  inventory: mockInventory,
  orders: mockOrders,
};
