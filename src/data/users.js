// src/data/users.js
export const users = [
  {
    id: 'user-1',
    name: 'Nome do Usuário',
    email: 'usuario@example.com',
    nickname: 'User',
    birthdate: '2000-01-15', // Exemplo de data
    addresses: [
      {
        id: 'addr-1',
        label: 'Casa',
        active: true,
        isprimary: true,
        zipcode: '13870000',
        streetname: 'Avenida Brasil',
        address_number: '1000',
        neighborhood: 'Bloco A',
        point_of_reference: 'Apto 101',
      },
      {
        id: 'addr-2',
        label: 'Trabalho',
        active: true,
        isprimary: false,
        zipcode: '13870000',
        streetname: 'Rua das Empresas',
        address_number: '500',
        neighborhood: 'Centro',
        point_of_reference: 'Sala 302',
      },
    ],
    // <<<<<< NOVO: Contatos associados a este usuário
    contacts: [
      {
        id: 'contact-1',
        name: 'Maria Silva',
        primary_phone: '(19)98765-4321',
        whats_app: '(19)98765-4321',
        email: 'maria.silva@example.com',
        preferable_contact_time: 'Manhã',
        relationship: 'Vizinha', // Adicionei um campo para dar contexto
      },
      {
        id: 'contact-2',
        name: 'João Pereira',
        primary_phone: '(19)91234-5678',
        whats_app: '',
        email: 'joao.pereira@example.com',
        preferable_contact_time: 'Tarde',
        relationship: 'Porteiro',
      },
    ],
  },
  // Você pode adicionar mais usuários se necessário
];
