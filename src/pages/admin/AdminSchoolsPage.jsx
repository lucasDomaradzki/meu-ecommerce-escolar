import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import SchoolForm from '../../components/admin/SchoolForm';
import { v4 as uuidv4 } from 'uuid';

const mockSchools = [
  { id: 'SCH001', name: 'Escola Modelo Ltda', address: 'Rua das Acácias, 100', phone: '1123456789', email: 'contato@escolamodelo.com.br', contactPerson: 'Diretora Maria' },
  { id: 'SCH002', name: 'Colégio Futuro', address: 'Av. Liberdade, 500', phone: '21987654321', email: 'secretaria@colegiofuturo.com', contactPerson: 'Coordenador Pedro' },
  { id: 'SCH003', name: 'Centro Educacional Saber', address: 'Praça da Luz, 25', phone: '3133334444', email: 'adm@saber.org', contactPerson: 'Secretária Ana' },
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

const AdminSchoolsPage = () => {
  const [schools, setSchools] = useState(mockSchools);
  const [showModal, setShowModal] = useState(false);
  const [editingSchool, setEditingSchool] = useState(null);

  const handleAddSchool = () => {
    setEditingSchool(null);
    setShowModal(true);
  };

  const handleEditSchool = (school) => {
    setEditingSchool(school);
    setShowModal(true);
  };

  const handleDeleteSchool = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta escola?')) {
      setSchools(schools.filter(school => school.id !== id));
      alert('Escola excluída com sucesso (simulado)!');
    }
  };

  const handleSaveSchool = (newSchool) => {
    if (editingSchool) {
      setSchools(schools.map(sch => sch.id === newSchool.id ? newSchool : sch));
      alert('Escola atualizada com sucesso (simulado)!');
    } else {
      const id = uuidv4();
      setSchools([...schools, { ...newSchool, id }]);
      alert('Escola cadastrada com sucesso (simulado)!');
    }
    setShowModal(false);
  };

  return (
    <PageContainer>
      <Header>
        <h1>Gestão de Escolas</h1>
        <Button $primary onClick={handleAddSchool}>Adicionar Escola</Button>
      </Header>

      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Pessoa de Contato</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {schools.map(school => (
              <tr key={school.id}>
                <td>{school.id}</td><td>{school.name}</td><td>{school.address}</td><td>{school.phone}</td><td>{school.email}</td><td>{school.contactPerson}</td>
                <td className="actions">
                  <Button $outline $small="true" onClick={() => handleEditSchool(school)}>Editar</Button>
                  <Button $danger $small="true" onClick={() => handleDeleteSchool(school.id)}>Excluir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>

      {showModal && (
        <Modal 
          title={editingSchool ? "Editar Escola" : "Adicionar Nova Escola"} 
          onClose={() => setShowModal(false)}
        >
          <SchoolForm 
            school={editingSchool} 
            onSave={handleSaveSchool} 
            onClose={() => setShowModal(false)} 
          />
        </Modal>
      )}
    </PageContainer>
  );
};

export default AdminSchoolsPage;
