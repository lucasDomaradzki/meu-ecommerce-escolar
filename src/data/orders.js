// src/data/orders.js
export const orders = [
  {
    id: 'ORD001',
    userId: 'user-1', // <--- Importante: Este deve ser 'user-1'
    date: '2024-06-20',
    totalValue: 350.00,
    status: 'Entregue',
    items: [
      { productId: 'kit-fundamental-ii', name: 'Kit Escolar Completo - Fundamental II', quantity: 1, price: 280.00 },
      { productId: 'caneta-esferografica', name: 'Caneta Esferográfica Azul', quantity: 3, price: 2.50 },
      { productId: 'borracha-escolar', name: 'Borracha Escolar', quantity: 2, price: 1.50 },
    ],
    shippingAddress: {
      street: 'Avenida Principal, 123',
      city: 'Cidade Exemplo',
      state: 'UF',
      zip: '12345-678',
    },
  },
  {
    id: 'ORD002',
    userId: 'user-1', // <--- Importante: Este deve ser 'user-1'
    date: '2024-06-15',
    totalValue: 95.00,
    status: 'Processando',
    items: [
      { productId: 'mochila-reforcada', name: 'Mochila Escolar Reforçada', quantity: 1, price: 95.00 },
    ],
    shippingAddress: {
      street: 'Rua Secundária, 45',
      city: 'Outra Cidade',
      state: 'UF',
      zip: '87654-321',
    },
  },
  {
    id: 'ORD003',
    userId: 'user-1', // <--- Importante: Este deve ser 'user-1'
    date: '2024-06-10',
    totalValue: 15.00,
    status: 'Cancelado',
    items: [
      { productId: 'caderno-a5', name: 'Caderno A5 (8 Matérias)', quantity: 1, price: 15.00 },
    ],
    shippingAddress: {
      street: 'Travessa da Esquina, 78',
      city: 'Cidade Vizinha',
      state: 'UF',
      zip: '54321-987',
    },
  },
];
