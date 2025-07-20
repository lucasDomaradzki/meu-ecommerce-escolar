// src/data/adminEntities.js

// Mock de dados para os produtos
const mockProducts = [
    {
        id: 'PROD001',
        name: 'Caderno Universitário 10 Matérias',
        category: 'Material Escolar',
        price: 35.00,
        description: 'Caderno espiral com capa dura, 200 folhas.',
        imageUrl: '/images/caderno.jpg'
    },
    {
        id: 'PROD002',
        name: 'Mochila Escolar Reforçada',
        category: 'Acessório',
        price: 120.00,
        description: 'Mochila resistente com múltiplos compartimentos.',
        imageUrl: '/images/mochila.jpg'
    },
    {
        id: 'PROD003',
        name: 'Caneta Esferográfica Azul',
        category: 'Material de Escrita',
        price: 2.50,
        description: 'Caneta esferográfica de ponta fina, tinta azul.',
        imageUrl: '/images/caneta.jpg'
    },
    {
        id: 'PROD004',
        name: 'Lápis de Cor (12 cores)',
        category: 'Material de Desenho',
        price: 15.00,
        description: 'Conjunto de 12 lápis de cor vibrantes.',
        imageUrl: '/images/lapis_cor.jpg'
    }
];

// ... (seus outros mocks para suppliers, shippingCompanies, schools, contacts, inventory, orders) ...

export const allEntities = {
    products: mockProducts, // <--- GARANTA QUE ISSO EXISTE E É UM ARRAY
    suppliers: [
        // seus dados de fornecedores
        { id: 'SUP001', name: 'Distribuidora Alfa', contactPerson: 'Ana Silva', phone: '11987654321', email: 'contato@alfa.com', address: 'Rua das Flores, 123' },
        { id: 'SUP002', name: 'Beta Suprimentos', contactPerson: 'Bruno Costa', phone: '21912345678', email: 'vendas@beta.com', address: 'Av. Central, 456' },
        { id: 'SUP003', name: 'Comércio Gama', contactPerson: 'Carla Dias', phone: '31998765432', email: 'comercial@gama.com', address: 'Praça da Matriz, 78' },
    ],
    shippingCompanies: [
        // seus dados de empresas de entrega
        { id: 'SHIP001', name: 'Loggi Prime', contactPerson: 'João Pedro', phone: '11998887777', email: 'contato@loggiprime.com', address: 'Rua das Entregas, 10' },
        { id: 'SHIP002', name: 'Correios BR', contactPerson: 'Maria Antunes', phone: '08009999999', email: 'atendimento@correios.com', address: 'Av. Correios, 500' },
    ],
    schools: [
        // seus dados de escolas
        { id: 'SCH001', name: 'Escola Modelo Ltda', contactPerson: 'Carlos Santos', phone: '11933334444', email: 'contato@escola.com', address: 'Rua do Saber, 1' },
        { id: 'SCH002', name: 'Colégio Futuro', contactPerson: 'Fernanda Lima', phone: '21987651234', email: 'contato@colegiofuturo.com', address: 'Av. Progresso, 20' },
    ],
    contacts: [
        // seus dados de contatos
        { id: '04167d40-48b4-439d-a8b7-b3f7fc3b803', name: 'Ana Costa', email: 'ana.costa@loggiprime.com', phone: '21912345678', role: 'Logística', entityId: 'SHIP001', entityName: 'Loggi Prime (shippingCompany)' },
        { id: '3802de0a-d3d0-4995-b2b-0f922fb7d3c0', name: 'Carlos Santos', email: 'carlos.santos@escola.com', phone: '11933334444', role: 'Secretário', entityId: 'SCH001', entityName: 'Escola Modelo Ltda (school)' },
        { id: '03b95fde-dc49-4d21-b72b-2e90369f3d0a', name: 'Contato do Comprador', email: 'comprador.contato@example.com', phone: '11955556666', role: 'Contato Pessoal', entityId: null, entityName: 'Nome do Usuário (Comprador)' },
        { id: 'c1ee52c9-5f89-4b10-ac58-712d6feadfdb', name: 'João Silva', email: 'joao.silva@alfa.com', phone: '11911112222', role: 'Gerente Comercial', entityId: 'SUP001', entityName: 'Distribuidora Alfa (supplier)' },
        { id: '4b25b600-7083-4d7d-a9dd-e943311c5d6b', name: 'Maria Souza', email: 'maria.souza@correios.com', phone: '08009998888', role: 'Atendimento', entityId: 'SHIP002', entityName: 'Correios BR (shippingCompany)' },
        { id: 'c4790ff-ac0d-41cb-b571-07cff4e9a685', name: 'Pedro Alves', email: 'pedro.alves@betasup.com', phone: '21987654321', role: 'Vendedor', entityId: 'SUP002', entityName: 'Beta Suprimentos (supplier)' },
    ],
    inventory: [
      { id: '7e7c8289-c5c8-4e89-b1d8-a0c3b018b10f', productId: 'PROD001', locationId: 'LOC001', status: 'IN_STOCK', availableQuantity: 100, reservedQuantity: 10, lastUpdated: '14/07/2024, 06:00:00' },
      { id: '0b907fa2-1f7c-4a3d-b4e8-a1d2c0b8e9f0', productId: 'PROD003', locationId: 'LOC002', status: 'AVAILABLE', availableQuantity: 500, reservedQuantity: 0, lastUpdated: '15/07/2024, 11:30:00' },
      { id: '1a1e68f3-f2a1-4e7b-8c9d-a2b1c0d4e5f6', productId: 'PROD002', locationId: 'LOC003', status: 'OUT_OF_STOCK', availableQuantity: 0, reservedQuantity: 20, lastUpdated: '15/07/2024, 13:00:00' },
      { id: '63cbfa08-e8a2-4d2b-b9c1-d0e3b0f7a1e2', productId: 'PROD001', locationId: 'LOC004', status: 'LOW_STOCK', availableQuantity: 5, reservedQuantity: 0, lastUpdated: '14/07/2024, 06:00:00' },
    ],
    orders: [
      { id: 'ORD001', items: [{ productId: 'PROD001', quantity: 2 }, { productId: 'PROD003', quantity: 5 }], status: 'pending', total: 100.00, orderDate: '2024-07-10', expectedDelivery: '2024-07-15', distributorId: 'SUP001', shippingCompanyId: 'SHIP001' },
      { id: 'ORD002', items: [{ productId: 'PROD002', quantity: 1 }], status: 'completed', total: 120.00, orderDate: '2024-07-05', expectedDelivery: '2024-07-10', distributorId: 'SUP002', shippingCompanyId: 'SHIP002' },
      { id: 'ORD003', items: [{ productId: 'PROD001', quantity: 3 }, { productId: 'PROD004', quantity: 10 }], status: 'cancelled', total: 125.00, orderDate: '2024-07-12', expectedDelivery: '2024-07-18', distributorId: 'SUP001', shippingCompanyId: 'SHIP001' },
    ]
};
