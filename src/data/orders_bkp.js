// src/data/orders.js
import { products } from './products'; // Assumindo que você tem dados de produtos

// Função auxiliar para encontrar um produto pelo ID
const getProductById = (id) => products.find(p => p.id === id);

export const orders = [
  {
    id: 'ORD001',
    userId: 'user123', // ID do usuário associado
    orderDate: '2024-07-01',
    status: 'Entregue',
    totalAmount: 380.00,
    shippingAddress: {
      street: 'Rua Principal',
      number: '123',
      complement: 'Apto 101',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zip: '01000-000',
    },
    items: [
      {
        productId: 'kit-fundamental-ii', // ID do Kit Escolar Completo - Fundamental II
        name: 'Kit Escolar Completo - Fundamental II',
        quantity: 1,
        price: getProductById('kit-fundamental-ii')?.price || 280.00,
        imageUrl: getProductById('kit-fundamental-ii')?.imageUrl,
      },
      {
        productId: 'mochila-reforcada',
        name: 'Mochila Escolar Reforçada',
        quantity: 1,
        price: getProductById('mochila-reforcada')?.price || 95.00,
        imageUrl: getProductById('mochila-reforcada')?.imageUrl,
      },
      {
        productId: 'caneta-azul',
        name: 'Caneta Esferográfica Azul',
        quantity: 2,
        price: getProductById('caneta-azul')?.price || 2.50,
        imageUrl: getProductById('caneta-azul')?.imageUrl,
      },
    ],
  },
  {
    id: 'ORD002',
    userId: 'user123',
    orderDate: '2024-07-05',
    status: 'Processando',
    totalAmount: 120.50,
    shippingAddress: {
      street: 'Av. Secundária',
      number: '456',
      complement: '',
      neighborhood: 'Bairro Novo',
      city: 'Campinas',
      state: 'SP',
      zip: '13000-000',
    },
    items: [
      {
        productId: 'kit-basico-fundamental-i',
        name: 'Pacote de Material Básico - Fundamental I',
        quantity: 1,
        price: getProductById('kit-basico-fundamental-i')?.price || 120.50,
        imageUrl: getProductById('kit-basico-fundamental-i')?.imageUrl,
      },
    ],
  },
  {
    id: 'ORD003',
    userId: 'user123',
    orderDate: '2024-07-10',
    status: 'Cancelado',
    totalAmount: 15.00,
    shippingAddress: {
      street: 'Rua da Saudade',
      number: '789',
      complement: '',
      neighborhood: 'Vila Antiga',
      city: 'São Paulo',
      state: 'SP',
      zip: '01000-000',
    },
    items: [
      {
        productId: 'caderno-a5',
        name: 'Caderno A5 (8 Matérias)',
        quantity: 1,
        price: getProductById('caderno-a5')?.price || 15.00,
        imageUrl: getProductById('caderno-a5')?.imageUrl,
      },
    ],
  },
  // Mais alguns pedidos para testes, se desejar
  {
    id: 'ORD004',
    userId: 'user123',
    orderDate: '2024-06-20',
    status: 'Entregue',
    totalAmount: 30.00,
    shippingAddress: {
      street: 'Rua das Flores',
      number: '10',
      complement: 'Casa',
      neighborhood: 'Jardim Botânico',
      city: 'Belo Horizonte',
      state: 'MG',
      zip: '30000-000',
    },
    items: [
      {
        productId: 'lapis-de-cor',
        name: 'Lápis de Cor (12 Cores)',
        quantity: 1,
        price: getProductById('lapis-de-cor')?.price || 20.00,
        imageUrl: getProductById('lapis-de-cor')?.imageUrl,
      },
      {
        productId: 'borracha-escolar',
        name: 'Borracha Escolar',
        quantity: 2,
        price: getProductById('borracha-escolar')?.price || 5.00,
        imageUrl: getProductById('borracha-escolar')?.imageUrl,
      },
    ],
  },
];
