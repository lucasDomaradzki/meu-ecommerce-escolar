// src/pages/admin/AdminContactsPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import ContactForm from '../../components/admin/ContactForm';
import { v4 as uuidv4 } from 'uuid'; // Para gerar IDs únicos
import { allEntities } from '../../data/adminEntities'; // Importa todas as entidades mockadas
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'; // Importa ícones de ordenação

// Dados mockados de contatos
const initialMockContacts = [
  { id: uuidv4(), name: 'João Silva', email: 'joao.silva@alfa.com', phone: '11911112222', role: 'Gerente Comercial', entityId: 'SUP001', entityType: 'supplier' },
  { id: uuidv4(), name: 'Maria Souza', email: 'maria.souza@correios.com.br', phone: '08009998888', role: 'Atendimento', entityId: 'SHP001', entityType: 'shippingCompany' },
  { id: uuidv4(), name: 'Carlos Santos', email: 'carlos.santos@escolamodelo.com.br', phone: '11933334444', role: 'Secretário', entityId: 'SCH001', entityType: 'school' },
  { id: uuidv4(), name: 'Contato do Comprador', email: 'comprador.contato@example.com', phone: '11955556666', role: 'Contato Pessoal', entityId: 'user-1', entityType: 'user' },
  { id: uuidv4(), name: 'Pedro Alves', email: 'pedro.alves@betasup.com', phone: '21987654321', role: 'Vendedor', entityId: 'SUP002', entityType: 'supplier' },
  { id: uuidv4(), name: 'Ana Costa', email: 'ana.costa@loggiprime.com', phone: '21912345678', role: 'Logística', entityId: 'SHP003', entityType: 'shippingCompany' },
];

const PageContainer = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  h1 {
    font-size: 2.2rem;
    color: var(--color-primary-dark);
  }
`;

const FilterSortContainer = styled(Card)`
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: flex-end;

  .filter-group {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 180px; /* Largura mínima para os campos de filtro */
  }

  label {
    font-weight: bold;
    color: var(--color-text);
    margin-bottom: 5px;
  }

  input, select {
    padding: 8px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    font-size: 0.9rem;
    background-color: var(--color-white);
  }

  button {
    height: 38px; /* Alinha com os inputs */
  }
`;

const TableContainer = styled(Card)`
  padding: 20px;
  overflow-x: auto; /* Permite rolagem horizontal em telas pequenas */

  table {
    width: 100%; /* A tabela ocupa 100% da largura disponível do container */
    border-collapse: collapse;
    margin-top: 20px;
    table-layout: fixed; /* Isso é crucial para controlar larguras de coluna */

    th, td {
      text-align: left;
      padding: 12px 15px;
      border-bottom: 1px solid var(--color-border);
      font-size: 0.95rem;
    }

    th {
      background-color: var(--color-background-light);
      color: var(--color-primary-dark);
      font-weight: bold;
      text-transform: uppercase;
      cursor: pointer; /* Indica que é clicável para ordenar */
      
      /* Mantemos white-space e overflow para garantir que o texto não quebre */
      white-space: nowrap; 
      overflow: hidden; 
      text-overflow: ellipsis; 

      &:hover {
        background-color: var(--color-border);
      }

      /* Estilo para o conteúdo interno do th, que terá o flexbox */
      & > div { /* Criamos um div dentro do th para o flexbox */
          display: flex;
          align-items: center;
          gap: 5px;
          height: 100%; /* Garante que o div ocupe a altura total do th */
      }
    }

    td {
        white-space: nowrap; /* Evita que o texto quebre em várias linhas */
        overflow: hidden; /* Esconde o texto que excede */
        text-overflow: ellipsis; /* Adiciona '...' se o texto for cortado */
        max-width: 150px; /* Limita a largura da célula para o ellipsis funcionar */
    }

    /* Definindo larguras para colunas específicas para garantir alinhamento */
    /* Mantenha as larguras fixas para th e td para garantir o table-layout: fixed; */
    th:nth-child(1), td:nth-child(1) { /* ID */
        width: 80px; 
        max-width: 80px;
    }
    th:nth-child(2), td:nth-child(2) { /* Nome */
        width: 180px; 
        max-width: 180px;
    }
    th:nth-child(3), td:nth-child(3) { /* Email */
        width: 250px; 
        max-width: 250px;
    }
    th:nth-child(4), td:nth-child(4) { /* Telefone */
        width: 120px; 
        max-width: 120px;
    }
    th:nth-child(5), td:nth-child(5) { /* Função */
        width: 150px; 
        max-width: 150px;
    }
    th:nth-child(6), td:nth-child(6) { /* Entidade Vinculada */
        width: 200px; 
        max-width: 200px;
    }
    th:nth-child(7), td:nth-child(7) { /* Ações */
        width: 150px; /* Suficiente para os botões */
        max-width: 150px;
        min-width: 150px; /* Garante que ações não encolham demais */
    }

    .actions {
      display: flex;
      gap: 10px;
      button {
        padding: 6px 10px;
        font-size: 0.8rem;
      }
    }
  }
`;

const AdminContactsPage = () => {
  const [contacts, setContacts] = useState(initialMockContacts);
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  // Estados para Filtragem
  const [filterName, setFilterName] = useState('');
  const [filterEmail, setFilterEmail] = useState('');
  const [filterEntityType, setFilterEntityType] = useState('');

  // Estados para Ordenação
  const [sortColumn, setSortColumn] = useState('name'); // Coluna padrão para ordenar
  const [sortDirection, setSortDirection] = useState('asc'); // Direção padrão: ascendente

  // Função para buscar o nome da entidade pelo ID e Tipo
  const getEntityName = (entityId, entityType) => {
    // allEntities é um objeto onde as chaves são os tipos de entidade (supplier, school, etc.)
    // e os valores são arrays de entidades.
    const entityList = allEntities ? allEntities[entityType] : [];
    const entity = entityList ? entityList.find(e => e.id === entityId) : null;
    return entity ? entity.name : 'N/A';
  };

  // Lógica de Filtragem
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const matchesName = contact.name.toLowerCase().includes(filterName.toLowerCase());
      const matchesEmail = contact.email.toLowerCase().includes(filterEmail.toLowerCase());
      const matchesEntityType = filterEntityType === '' || contact.entityType === filterEntityType;
      return matchesName && matchesEmail && matchesEntityType;
    });
  }, [contacts, filterName, filterEmail, filterEntityType]);

  // Lógica de Ordenação
  const sortedContacts = useMemo(() => {
    const sortableContacts = [...filteredContacts]; // Cria uma cópia para não mutar o array original

    if (sortColumn) {
      sortableContacts.sort((a, b) => {
        let valA, valB;

        if (sortColumn === 'entity') {
          // Para ordenar por entidade, pega o nome da entidade
          valA = getEntityName(a.entityId, a.entityType)?.toLowerCase() || '';
          valB = getEntityName(b.entityId, b.entityType)?.toLowerCase() || '';
        } else {
          // Para ordenar por nome ou email
          valA = String(a[sortColumn])?.toLowerCase() || '';
          valB = String(b[sortColumn])?.toLowerCase() || '';
        }
        
        if (valA < valB) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (valA > valB) {
          return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableContacts;
  }, [filteredContacts, sortColumn, sortDirection, getEntityName]);

  const handleAddContact = () => {
    setEditingContact(null);
    setShowModal(true);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setShowModal(true);
  };

  const handleDeleteContact = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este contato?')) {
      setContacts(contacts.filter(contact => contact.id !== id));
      alert('Contato excluído com sucesso (simulado)!');
    }
  };

  const handleSaveContact = (newContact) => {
    if (editingContact) {
      setContacts(contacts.map(cont => cont.id === newContact.id ? newContact : cont));
      alert('Contato atualizado com sucesso (simulado)!');
    } else {
      const id = uuidv4();
      setContacts([...contacts, { ...newContact, id }]);
      alert('Contato cadastrado com sucesso (simulado)!');
    }
    setShowModal(false);
  };

  const handleSort = (column) => {
    // Apenas permite ordenar as colunas específicas
    if (['name', 'email', 'entity'].includes(column)) {
      if (sortColumn === column) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(column);
        setSortDirection('asc');
      }
    }
  };

  // Retorna o ícone de ordenação apropriado
  const getSortIcon = (column) => {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  return (
    <PageContainer>
      <Header>
        <h1>Gestão de Contatos</h1>
        <Button $primary onClick={handleAddContact}>Adicionar Contato</Button>
      </Header>

      <FilterSortContainer>
        <div className="filter-group">
          <label htmlFor="filterName">Filtrar por Nome:</label>
          <input
            type="text"
            id="filterName"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            placeholder="Nome do contato"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="filterEmail">Filtrar por Email:</label>
          <input
            type="text"
            id="filterEmail"
            value={filterEmail}
            onChange={(e) => setFilterEmail(e.target.value)}
            placeholder="Email do contato"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="filterEntityType">Filtrar por Tipo de Entidade:</label>
          <select
            id="filterEntityType"
            value={filterEntityType}
            onChange={(e) => setFilterEntityType(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="supplier">Distribuidor</option>
            <option value="shippingCompany">Empresa de Entrega</option>
            <option value="school">Escola</option>
            <option value="user">Usuário</option>
          </select>
        </div>
      </FilterSortContainer>

      <TableContainer>
        <table>
          <thead>
            <tr>
              <th><div>ID</div></th> {/* ID não é ordenável por padrão no exemplo */}
              <th onClick={() => handleSort('name')}><div>Nome {getSortIcon('name')}</div></th>
              <th onClick={() => handleSort('email')}><div>Email {getSortIcon('email')}</div></th>
              <th><div>Telefone</div></th> {/* Telefone não é ordenável no exemplo */}
              <th><div>Função</div></th> {/* Função não é ordenável no exemplo */}
              <th onClick={() => handleSort('entity')}><div>Entidade Vinculada {getSortIcon('entity')}</div></th>
              <th><div>Ações</div></th>
            </tr>
          </thead>
          <tbody>
            {sortedContacts.map(contact => (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.role}</td>
                <td>{getEntityName(contact.entityId, contact.entityType)} ({contact.entityType})</td>
                <td className="actions">
                  <Button $outline $small onClick={() => handleEditContact(contact)}>Editar</Button>
                  <Button $danger $small onClick={() => handleDeleteContact(contact.id)}>Excluir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>

      {showModal && (
        <Modal 
          title={editingContact ? "Editar Contato" : "Adicionar Novo Contato"} 
          onClose={() => setShowModal(false)}
        >
          <ContactForm 
            contact={editingContact} 
            entities={allEntities} // Passa todas as entidades mockadas para o formulário
            onSave={handleSaveContact} 
            onClose={() => setShowModal(false)} 
          />
        </Modal>
      )}
    </PageContainer>
  );
};

export default AdminContactsPage;
