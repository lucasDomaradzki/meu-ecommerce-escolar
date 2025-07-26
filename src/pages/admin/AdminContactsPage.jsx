import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrash } from 'react-icons/fa';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { allEntities } from '../../data/adminEntities';

import ContactForm from '../../components/admin/ContactForm';

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
  const [contacts, setContacts] = useState(allEntities.contacts || []);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const sortedContacts = useMemo(() => {
    let sortableItems = [...contacts];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key] || '';
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

  const handleSaveContact = (newOrUpdatedContact) => {
    if (newOrUpdatedContact.id && contacts.some(c => c.id === newOrUpdatedContact.id)) {
      setContacts(prevContacts =>
        prevContacts.map(c => (c.id === newOrUpdatedContact.id ? newOrUpdatedContact : c))
      );
    } else {
      setContacts(prevContacts => [...prevContacts, newOrUpdatedContact]);
    }
    setShowModal(false);
  };

  const handleAddContact = () => {
    setModalTitle("Adicionar Novo Contato");
    setModalContent(
      <ContactForm
        onSave={handleSaveContact}
        onClose={() => setShowModal(false)}
      />
    );
    setShowModal(true);
  };

  const handleEditContact = (contactToEdit) => {
    setModalTitle("Editar Contato");
    setModalContent(
      <ContactForm
        contact={contactToEdit}
        onSave={handleSaveContact}
        onClose={() => setShowModal(false)}
      />
    );
    setShowModal(true);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm(`Tem certeza que deseja excluir o contato com ID: ${id}?`)) {
      setContacts(contacts.filter(contact => contact.id !== id));
      alert("Contato excluído com sucesso!");
    }
  };

  return (
    <TableContainer>
      <HeaderContainer>
        <Title>Gestão de Contatos</Title>
        <Button onClick={handleAddContact}>Adicionar Contato</Button>
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
          {sortedContacts.length > 0 ? (
            sortedContacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.role}</td>
                <td>{contact.entityName || 'N/A'}</td>
                <ActionsCell>
                  <Button onClick={() => handleEditContact(contact)}><FaEdit /></Button>
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
