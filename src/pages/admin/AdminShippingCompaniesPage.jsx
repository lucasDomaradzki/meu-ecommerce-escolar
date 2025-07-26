import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import ShippingCompanyForm from '../../components/admin/ShippingCompanyForm';
import { v4 as uuidv4 } from 'uuid';

const mockShippingCompanies = [
  { id: 'SHP001', name: 'Correios BR', contactPerson: 'Fernanda Lima', phone: '08001234567', email: 'contato@correios.com.br', serviceAreas: 'Nacional' },
  { id: 'SHP002', name: 'Entrega Rápida', contactPerson: 'Gustavo Santos', phone: '11998877665', email: 'sac@entregarapida.com.br', serviceAreas: 'São Paulo, Rio de Janeiro' },
  { id: 'SHP003', name: 'Loggi Prime', contactPerson: 'Helena Costa', phone: '21911223344', email: 'atendimento@loggiprime.com', serviceAreas: 'Grandes Cidades' },
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

const TableContainer = styled(Card)`
  padding: 20px;
  overflow-x: auto; /* Permite rolagem horizontal em telas pequenas */

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

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
    }

    tr:hover {
      background-color: var(--color-background-light);
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

const AdminShippingCompaniesPage = () => {
  const [shippingCompanies, setShippingCompanies] = useState(mockShippingCompanies);
  const [showModal, setShowModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const handleAddCompany = () => {
    setEditingCompany(null);
    setShowModal(true);
  };

  const handleEditCompany = (company) => {
    setEditingCompany(company);
    setShowModal(true);
  };

  const handleDeleteCompany = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta empresa de entrega?')) {
      setShippingCompanies(shippingCompanies.filter(company => company.id !== id));
      alert('Empresa de entrega excluída com sucesso (simulado)!');
    }
  };

  const handleSaveCompany = (newCompany) => {
    if (editingCompany) {
      setShippingCompanies(shippingCompanies.map(comp => comp.id === newCompany.id ? newCompany : comp));
      alert('Empresa de entrega atualizada com sucesso (simulado)!');
    } else {
      const id = uuidv4();
      setShippingCompanies([...shippingCompanies, { ...newCompany, id }]);
      alert('Empresa de entrega cadastrada com sucesso (simulado)!');
    }
    setShowModal(false);
  };

  return (
    <PageContainer>
      <Header>
        <h1>Gestão de Empresas de Entrega</h1>
        <Button $primary onClick={handleAddCompany}>Adicionar Empresa</Button>
      </Header>

      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Pessoa de Contato</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Áreas de Atuação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {shippingCompanies.map(company => (
              <tr key={company.id}>
                <td>{company.id}</td><td>{company.name}</td><td>{company.contactPerson}</td><td>{company.phone}</td><td>{company.email}</td><td>{company.serviceAreas}</td>
                <td className="actions">
                  <Button $outline $small="true" onClick={() => handleEditCompany(company)}>Editar</Button>
                  <Button $danger $small="true" onClick={() => handleDeleteCompany(company.id)}>Excluir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>

      {showModal && (
        <Modal 
          title={editingCompany ? "Editar Empresa de Entrega" : "Adicionar Nova Empresa de Entrega"} 
          onClose={() => setShowModal(false)}
        >
          <ShippingCompanyForm 
            company={editingCompany} 
            onSave={handleSaveCompany} 
            onClose={() => setShowModal(false)} 
          />
        </Modal>
      )}
    </PageContainer>
  );
};

export default AdminShippingCompaniesPage;
