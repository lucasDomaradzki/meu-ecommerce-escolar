// src/data/adminEntities.js

// Dados mockados de Distribuidores (simplificados para seleção)
export const mockSuppliers = [
  { id: 'SUP001', name: 'Distribuidora Alfa', type: 'supplier' },
  { id: 'SUP002', name: 'Beta Suprimentos', type: 'supplier' },
  { id: 'SUP003', name: 'Comércio Gama', type: 'supplier' },
];

// Dados mockados de Empresas de Entrega (simplificados para seleção)
export const mockShippingCompanies = [
  { id: 'SHP001', name: 'Correios BR', type: 'shippingCompany' },
  { id: 'SHP002', name: 'Entrega Rápida', type: 'shippingCompany' },
  { id: 'SHP003', name: 'Loggi Prime', type: 'shippingCompany' },
];

// Dados mockados de Escolas (simplificados para seleção)
export const mockSchools = [
  { id: 'SCH001', name: 'Escola Modelo Ltda', type: 'school' },
  { id: 'SCH002', name: 'Colégio Futuro', type: 'school' },
  { id: 'SCH003', name: 'Centro Educacional Saber', type: 'school' },
];

// Dados mockados de Usuários (simplificados para seleção de contato)
// Usamos o ID 'user-1' que já está no seu mock de usuários
export const mockUsers = [
  { id: 'user-1', name: 'Nome do Usuário (Comprador)', type: 'user' },
  { id: 'user-2', name: 'Outro Usuário (Comprador)', type: 'user' },
];

// Objeto combinado para fácil acesso no formulário de contato
export const allEntities = {
  supplier: mockSuppliers,
  shippingCompany: mockShippingCompanies,
  school: mockSchools,
  user: mockUsers, // Adicionado a nova entidade 'user'
};
