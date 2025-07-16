// src/data/products.js
import mochilaRosa from '../assets/f59585fa6f5daaefae9aeae538c23cd3-mochila-escolar-rosa-plana.webp';

export const products = [
  {
    id: 'kit-fundamental-ii',
    name: 'Kit Escolar Completo - Fundamental II',
    price: 280.00,
    description: 'Material completo com mochila, estojo, cadernos universitários, kit de geometria e dicionário. Ideal para o Fundamental II.',
    imageUrl: mochilaRosa, // Todas as imageUrl apontam para mochilaRosa
    galleryImages: [ // Todas as galleryImages apontam para mochilaRosa
      mochilaRosa,
      mochilaRosa,
      mochilaRosa
    ],
    stock: 30,
    isKit: true, // É um kit
    items: [
      { name: 'Mochila escolar reforçada', price: 80.00, quantity: 1, link: '/pacotes/mochila-reforcada' },
      { name: 'Estojo grande', price: 25.00, quantity: 1 },
      { name: 'Caderno universitário (10 matérias)', price: 100.00, quantity: 4 },
      { name: 'Kit de geometria (régua, esquadros, transferidor)', price: 20.00, quantity: 1 },
      { name: 'Dicionário de Português', price: 40.00, quantity: 1 },
      { name: 'Caneta esferográfica (azul, preta, vermelha)', price: 9.00, quantity: 3 },
      { name: 'Lápis preto', price: 3.00, quantity: 3 }
    ]
  },
  {
    id: 'mochila-reforcada',
    name: 'Mochila Escolar Reforçada',
    price: 95.00,
    description: 'Mochila resistente e espaçosa, ideal para carregar todos os materiais com conforto.',
    imageUrl: mochilaRosa,
    galleryImages: [
      mochilaRosa,
      mochilaRosa,
      mochilaRosa
    ],
    stock: 25,
    isKit: false, // Não é um kit, é um item individual
    parentPackageId: 'kit-fundamental-ii', // Aponta para o kit ao qual pertence
    items: [] // Itens individuais não possuem 'items'
  },
  {
    id: 'pacote-material-basico-fundamental-i',
    name: 'Pacote de Material Básico - Fundamental I',
    price: 120.50,
    description: 'Inclui cadernos, lápis de cor, canetas, borracha, apontador e régua. Essencial para o aprendizado inicial.',
    imageUrl: mochilaRosa,
    galleryImages: [
      mochilaRosa,
      mochilaRosa
    ],
    stock: 50,
    isKit: true, // É um kit
    items: [
        { name: 'Caderno A5 (8 matérias)', price: 15.00, quantity: 4, link: '/pacotes/caderno-a5-8-materias' }, // Adicionado link para demonstração
        { name: 'Lápis de cor (12 cores)', price: 20.00, quantity: 1, link: '/pacotes/lapis-de-cor-12-cores' }, // Adicionado link
        { name: 'Caneta esferográfica azul', price: 2.50, quantity: 5, link: '/pacotes/caneta-esferografica' }, // Adicionado link
        { name: 'Borracha', price: 1.50, quantity: 2, link: '/pacotes/borracha' }, // Adicionado link
        { name: 'Apontador com depósito', price: 3.00, quantity: 1, link: '/pacotes/apontador' }, // Adicionado link
        { name: 'Régua 30cm', price: 4.00, quantity: 1, link: '/pacotes/regua-30cm' } // Adicionado link
    ]
  },
  {
    id: 'caderno-a5-8-materias',
    name: 'Caderno A5 (8 Matérias)',
    price: 15.00,
    imageUrl: mochilaRosa,
    galleryImages: [
      mochilaRosa,
      mochilaRosa
    ],
    stock: 8,
    isKit: false, // Não é um kit, é um item individual
    parentPackageId: 'pacote-material-basico-fundamental-i',
    items: []
  },
  {
    id: 'lapis-de-cor-12-cores',
    name: 'Lápis de Cor (12 Cores)',
    price: 20.00,
    imageUrl: mochilaRosa,
    galleryImages: [
      mochilaRosa
    ],
    stock: 12,
    isKit: false,
    parentPackageId: 'pacote-material-basico-fundamental-i',
    items: []
  },
  {
    id: 'caneta-esferografica',
    name: 'Caneta Esferográfica Azul',
    price: 2.50,
    imageUrl: mochilaRosa,
    galleryImages: [
      mochilaRosa
    ],
    stock: 5,
    isKit: false,
    parentPackageId: 'pacote-material-basico-fundamental-i',
    items: []
  },
  {
    id: 'borracha',
    name: 'Borracha Escolar',
    price: 1.50,
    imageUrl: mochilaRosa,
    galleryImages: [
      mochilaRosa
    ],
    stock: 0,
    isKit: false,
    parentPackageId: 'pacote-material-basico-fundamental-i',
    items: []
  },
  {
    id: 'apontador',
    name: 'Apontador com Depósito',
    price: 3.00,
    imageUrl: mochilaRosa,
    galleryImages: [
      mochilaRosa
    ],
    stock: 18,
    isKit: false,
    parentPackageId: 'pacote-material-basico-fundamental-i',
    items: []
  },
  {
    id: 'regua-30cm',
    name: 'Régua 30cm Transparente',
    price: 4.00,
    imageUrl: mochilaRosa,
    galleryImages: [
      mochilaRosa
    ],
    stock: 22,
    isKit: false,
    parentPackageId: 'pacote-material-basico-fundamental-i',
    items: []
  },
];
