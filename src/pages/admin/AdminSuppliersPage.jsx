// src/pages/admin/AdminSuppliersPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import SupplierForm from '../../components/admin/SupplierForm';
import { v4 as uuidv4 } from 'uuid'; // Importa a função v4 para gerar UUIDs

// Dados mockados de distribuidores
const mockSuppliers = [
  { id: 'SUP001', name: 'Distribuidora Alfa', contactPerson: 'Ana Silva', phone: '11987654321', email: 'contato@alfa.com', address: 'Rua das Flores, 123' },
  { id: 'SUP002', name: 'Beta Suprimentos', contactPerson: 'Bruno Costa', phone: '21912345678', email: 'vendas@beta.com', address: 'Av. Central, 456' },
  { id: 'SUP003', name: 'Comércio Gama', contactPerson: 'Carla Dias', phone: '31998765432', email: 'comercial@gama.com', address: 'Praça da Matriz, 78' },
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

const AdminSuppliersPage = () => {
  const [suppliers, setSuppliers] = useState(mockSuppliers);
  const [showModal, setShowModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null); // Para armazenar o distribuidor sendo editado

  const handleAddSupplier = () => {
    setEditingSupplier(null); // Garante que é um novo cadastro
    setShowModal(true);
  };

  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier);
    setShowModal(true);
  };

  const handleDeleteSupplier = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este distribuidor?')) {
      setSuppliers(suppliers.filter(supplier => supplier.id !== id));
      alert('Distribuidor excluído com sucesso (simulado)!');
    }
  };

  const handleSaveSupplier = (newSupplier) => {
    if (editingSupplier) {
      // Edição
      setSuppliers(suppliers.map(sup => sup.id === newSupplier.id ? newSupplier : sup));
      alert('Distribuidor atualizado com sucesso (simulado)!');
    } else {
      // Novo cadastro - ID gerado com uuidv4()
      const id = uuidv4(); // Gerar um ID único universal
      setSuppliers([...suppliers, { ...newSupplier, id }]);
      alert('Distribuidor cadastrado com sucesso (simulado)!');
    }
    setShowModal(false);
  };

  return (
    <PageContainer>
      <Header>
        <h1>Gestão de Distribuidores</h1>
        <Button $primary onClick={handleAddSupplier}>Adicionar Distribuidor</Button>
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
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {/* Remova espaços ou quebras de linha extra entre <td> e seus conteúdos aqui */}
            {/* A alteração mais provável é apenas a formatação do código, mas deixarei o snippet abaixo mais compacto */}
            {suppliers.map(supplier => (
              <tr key={supplier.id}>
                <td>{supplier.id}</td><td>{supplier.name}</td><td>{supplier.contactPerson}</td><td>{supplier.phone}</td><td>{supplier.email}</td><td>{supplier.address}</td>
                <td className="actions">
                  <Button $outline $small="true" onClick={() => handleEditSupplier(supplier)}>Editar</Button>
                  <Button $danger $small="true" onClick={() => handleDeleteSupplier(supplier.id)}>Excluir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>

      {showModal && (
        <Modal 
          title={editingSupplier ? "Editar Distribuidor" : "Adicionar Novo Distribuidor"} 
          onClose={() => setShowModal(false)}
        >
          <SupplierForm 
            supplier={editingSupplier} 
            onSave={handleSaveSupplier} 
            onClose={() => setShowModal(false)} 
          />
        </Modal>
      )}
    </PageContainer>
  );
};

export default AdminSuppliersPage;
