// src/pages/admin/AdminContactsPage.jsx
import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrash } from 'react-icons/fa'; // Adicione FaEdit e FaTrash para os botões de ação
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal'; // Se você usa modal para Adicionar/Editar
import { allEntities } from '../../data/adminEntities'; // Importa os dados mockados

// Você precisará criar esses componentes para o modal
// import ContactForm from '../../components/admin/ContactForm'; // Para adicionar/editar contatos
// import ContactDetails from '../../components/admin/ContactDetails'; // Para visualizar detalhes

const TableContainer = styled.div`
  background-color: var(--color-white);
  padding: 20px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-small);
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: var(--color-text-dark);
  font-size: 1.8em;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    padding: 12px 15px;
    border-bottom: 1px solid var(--color-border);
    text-align: left;
  }

  th {
    background-color: var(--color-gray-light);
    color: var(--color-text-dark);
    font-weight: bold;
    cursor: pointer;
    svg {
      margin-left: 5px;
    }
  }

  tr:hover {
    background-color: var(--color-background);
  }
`;

const ActionsCell = styled.td`
  display: flex;
  gap: 10px;
  button {
    padding: 8px 12px;
  }
`;

const AdminContactsPage = () => {
  // Inicializa o estado com os contatos do mock
  const [contacts, setContacts] = useState(allEntities.contacts || []);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Lógica de ordenação da tabela
  const sortedContacts = useMemo(() => {
    let sortableItems = [...contacts];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key] || ''; // Tratar valores null/undefined
        const bValue = b[sortConfig.key] || '';

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [contacts, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort />;
    if (sortConfig.direction === 'ascending') return <FaSortUp />;
    return <FaSortDown />;
  };

  // Funções de CRUD (Adicionar, Editar, Excluir) - Mockadas por enquanto
  const handleAddItem = () => {
    setModalTitle("Adicionar Novo Contato");
    // Você precisará criar o ContactForm para isso
    // setModalContent(<ContactForm onSubmitSuccess={(newContact) => {
    //   setContacts([...contacts, { ...newContact, id: `NEW-${Date.now()}` }]);
    //   setShowModal(false);
    // }} />);
    // Por enquanto, apenas abre o modal vazio
    setModalContent(<div>Formulário para adicionar contato (ainda não implementado)</div>);
    setShowModal(true);
  };

  const handleEditItem = (item) => {
    setModalTitle("Editar Contato");
    // Você precisará criar o ContactForm para isso e passar o item
    // setModalContent(<ContactForm contact={item} onSubmitSuccess={(updatedContact) => {
    //   setContacts(contacts.map(c => (c.id === updatedContact.id ? updatedContact : c)));
    //   setShowModal(false);
    // }} />);
    // Por enquanto, apenas abre o modal com dados mockados
    setModalContent(<div>Formulário para editar contato (ainda não implementado) para: {item.name}</div>);
    setShowModal(true);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm(`Tem certeza que deseja excluir o contato com ID: ${id}?`)) {
      // Lógica para deletar contato
      setContacts(contacts.filter(contact => contact.id !== id));
      alert("Contato excluído com sucesso!");
    }
  };

  // Se você tiver uma função para visualizar detalhes, seria algo como:
  // const handleViewDetails = (item) => {
  //   setModalTitle("Detalhes do Contato");
  //   setModalContent(<ContactDetails contact={item} />);
  //   setShowModal(true);
  // };

  return (
    <TableContainer>
      <HeaderContainer>
        <Title>Gestão de Contatos</Title>
        <Button onClick={handleAddItem}>Adicionar Contato</Button>
      </HeaderContainer>

      <StyledTable>
        <thead>
          <tr>
            <th onClick={() => requestSort('id')}>ID {getSortIcon('id')}</th>
            <th onClick={() => requestSort('name')}>Nome {getSortIcon('name')}</th>
            <th onClick={() => requestSort('email')}>Email {getSortIcon('email')}</th>
            <th onClick={() => requestSort('phone')}>Telefone {getSortIcon('phone')}</th>
            <th onClick={() => requestSort('role')}>Função {getSortIcon('role')}</th>
            <th onClick={() => requestSort('entityName')}>Entidade Vinculada {getSortIcon('entityName')}</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* IMPORTANTE: Sem espaços ou quebras de linha extras entre <tbody> e a primeira <tr> do map */}
          {sortedContacts.length > 0 ? (
            sortedContacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.role}</td>
                <td>{contact.entityName || 'N/A'}</td> {/* 'N/A' para caso entityName seja nulo */}
                <ActionsCell>
                  {/* <Button variant="secondary" onClick={() => handleViewDetails(contact)}>
                    <FaEye />
                  </Button> */}
                  <Button onClick={() => handleEditItem(contact)}><FaEdit /></Button>
                  <Button variant="danger" onClick={() => handleDeleteItem(contact.id)}><FaTrash /></Button>
                </ActionsCell>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Nenhum contato encontrado.</td>
            </tr>
          )}
        </tbody>
      </StyledTable>

      {showModal && (
        <Modal title={modalTitle} onClose={() => setShowModal(false)}>
          {modalContent}
        </Modal>
      )}
    </TableContainer>
  );
};

export default AdminContactsPage;
