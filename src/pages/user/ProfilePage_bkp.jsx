// src/pages/user/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal'; // Se você tiver um Modal, caso contrário, precisará criar
import UserContactForm from '../../components/user/UserContactForm'; // Importa o novo componente
import { users as mockUsers } from '../../data/users'; // Importa os usuários mockados

// --- Styled Components (Mantenha como estão, ajuste se necessário) ---
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  background-color: var(--color-background-light);
`;

const ProfileContent = styled.div`
  background-color: var(--color-background);
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;

  @media (max-width: var(--breakpoint-tablet)) {
    padding: 20px;
  }
`;

const SectionHeader = styled.h2`
  font-size: 1.8rem;
  color: var(--color-primary);
  margin-bottom: 20px;
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 10px;

  @media (max-width: var(--breakpoint-tablet)) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const UserInfo = styled.div`
  margin-bottom: 30px;
  p {
    font-size: 1.1rem;
    color: var(--color-text);
    margin-bottom: 8px;
    strong {
      color: var(--color-primary-dark);
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: flex-start; /* Alinha à esquerda para botões de edição */

  @media (max-width: var(--breakpoint-mobile)) {
    flex-direction: column;
    width: 100%;
    button {
      width: 100%;
    }
  }
`;

const AddressList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const AddressItem = styled.li`
  background-color: var(--color-light);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  p {
    margin: 0;
    font-size: 0.95rem;
    color: var(--color-text-light);
  }
  strong {
    color: var(--color-primary);
  }
`;

// --- NOVO: Styled Components para Contatos ---
const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ContactItem = styled.li`
  background-color: var(--color-light);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  p {
    margin: 0;
    font-size: 0.95rem;
    color: var(--color-text-light);
  }
  strong {
    color: var(--color-primary);
  }
`;
// --- FIM NOVO: Styled Components para Contatos ---

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showAddContactForm, setShowAddContactForm] = useState(false); // Novo estado
  const [editingContact, setEditingContact] = useState(null); // Estado para edição de contato

  useEffect(() => {
    // Simula o carregamento do usuário logado
    // Em uma aplicação real, isso viria do contexto de autenticação ou API
    const loggedInUser = mockUsers[0]; // Usando o primeiro usuário mockado
    setCurrentUser(loggedInUser);
  }, []);

  const handleAddAddress = (newAddress) => {
    console.log('Adicionar novo endereço:', newAddress);
    // Lógica para adicionar endereço (simulação)
    // Em uma aplicação real: chamar API e atualizar estado
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        addresses: [...currentUser.addresses, { ...newAddress, id: `addr-${Date.now()}` }]
      };
      setCurrentUser(updatedUser);
    }
    setShowAddAddressModal(false);
  };

  // --- NOVO: Funções para Contatos ---
  const handleAddContact = (newContact) => {
    console.log('Adicionar novo contato:', newContact);
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        contacts: [...currentUser.contacts, { ...newContact, id: `contact-${Date.now()}` }]
      };
      setCurrentUser(updatedUser);
    }
    setShowAddContactForm(false); // Esconde o formulário após adicionar
  };

  const handleEditContact = (contactToEdit) => {
    setEditingContact(contactToEdit);
    setShowAddContactForm(true); // Reutiliza o formulário para edição
  };

  const handleSaveEditedContact = (updatedContact) => {
    console.log('Salvar contato editado:', updatedContact);
    if (currentUser) {
      const updatedContacts = currentUser.contacts.map(c =>
        c.id === updatedContact.id ? updatedContact : c
      );
      setCurrentUser({ ...currentUser, contacts: updatedContacts });
    }
    setEditingContact(null); // Limpa o contato em edição
    setShowAddContactForm(false); // Esconde o formulário
  };

  const handleDeleteContact = (contactId) => {
    if (window.confirm('Tem certeza que deseja excluir este contato?')) {
      console.log('Excluir contato:', contactId);
      if (currentUser) {
        const updatedContacts = currentUser.contacts.filter(c => c.id !== contactId);
        setCurrentUser({ ...currentUser, contacts: updatedContacts });
      }
    }
  };

  const handleCancelContactForm = () => {
    setShowAddContactForm(false);
    setEditingContact(null); // Limpa o estado de edição
  };
  // --- FIM NOVO: Funções para Contatos ---

  if (!currentUser) {
    return <ProfileContainer>Carregando perfil...</ProfileContainer>;
  }

  return (
    <ProfileContainer>
      <ProfileContent>
        <SectionHeader>Informações da Conta</SectionHeader>
        <UserInfo>
          <p>Bem-vindo(a), <strong>{currentUser.name}</strong>!</p>
          <p>Seu e-mail: {currentUser.email}</p>
          <p>Apelido: {currentUser.nickname || 'Não definido'}</p>
          <p>Data de Nascimento: {currentUser.birthdate || 'Não definida'}</p>
          <p>Aqui você poderá gerenciar seus dados pessoais e configurações de conta.</p>
        </UserInfo>
        <ButtonGroup>
          <Button $primary>Editar Perfil</Button> {/* Funcionalidade para o futuro */}
          <Button $outline>Alterar Senha</Button> {/* Funcionalidade para o futuro */}
        </ButtonGroup>

        <SectionHeader style={{ marginTop: '40px' }}>Endereços Salvos</SectionHeader>
        <AddressList>
          {currentUser.addresses.length > 0 ? (
            currentUser.addresses.map((address) => (
              <AddressItem key={address.id}>
                <p><strong>{address.label}</strong> {address.isprimary && '(Principal)'}</p>
                <p>{address.streetname}, {address.address_number}</p>
                <p>{address.neighborhood}, {address.zipcode}</p>
                <p>{address.point_of_reference && `Ponto de referência: ${address.point_of_reference}`}</p>
                <ButtonGroup>
                  <Button $small $outline>Editar</Button> {/* Adicionado $small */}
                  <Button $small $outline>Excluir</Button> {/* Adicionado $small */}
                </ButtonGroup>
              </AddressItem>
            ))
          ) : (
            <p>Você ainda não tem nenhum endereço salvo. Adicione um endereço para agilizar suas futuras compras!</p>
          )}
        </AddressList>
        <Button onClick={() => setShowAddAddressModal(true)}>+ Adicionar Novo Endereço</Button>

        {/* --- NOVO: Seção de Contatos --- */}
        <SectionHeader style={{ marginTop: '40px' }}>Meus Contatos</SectionHeader>
        <ContactList>
          {currentUser.contacts.length > 0 ? (
            currentUser.contacts.map((contact) => (
              <ContactItem key={contact.id}>
                <p><strong>Nome: {contact.name}</strong></p>
                {contact.relationship && <p>Relação: {contact.relationship}</p>}
                {contact.primary_phone && <p>Telefone: {contact.primary_phone}</p>}
                {contact.whats_app && <p>WhatsApp: {contact.whats_app}</p>}
                {contact.email && <p>Email: {contact.email}</p>}
                {contact.preferable_contact_time && <p>Melhor Horário: {contact.preferable_contact_time}</p>}
                <ButtonGroup>
                  <Button $small $outline onClick={() => handleEditContact(contact)}>Editar</Button>
                  <Button $small $outline onClick={() => handleDeleteContact(contact.id)}>Excluir</Button>
                </ButtonGroup>
              </ContactItem>
            ))
          ) : (
            <p>Você ainda não tem nenhum contato cadastrado.</p>
          )}
        </ContactList>
        <Button onClick={() => { setShowAddContactForm(true); setEditingContact(null); }}>+ Adicionar Novo Contato</Button>
        {/* --- FIM NOVO: Seção de Contatos --- */}


        <SectionHeader style={{ marginTop: '40px' }}>Meus Pedidos</SectionHeader>
        <p>Você ainda não fez nenhum pedido conosco.</p>
        <p>Comece a comprar agora e encontre os pacotes ideais para você!</p>
        <Button $primary style={{ marginTop: '20px' }}>Ver Todos os Pedidos</Button> {/* Funcionalidade para o futuro */}
      </ProfileContent>

      {/* MODAL para Adicionar Endereço - reutilizado do que você já tinha */}
      {showAddAddressModal && (
        <Modal
          title="Adicionar Novo Endereço"
          onClose={() => setShowAddAddressModal(false)}
        >
          {/* Este é um placeholder. Você precisaria de um componente AddAddressForm aqui */}
          <form onSubmit={(e) => { e.preventDefault(); handleAddAddress({
            label: e.target.label.value,
            zipcode: e.target.zipcode.value,
            streetname: e.target.streetname.value,
            address_number: e.target.address_number.value,
            neighborhood: e.target.neighborhood.value,
            point_of_reference: e.target.point_of_reference.value,
            active: true,
            isprimary: false // Novo endereço não é primary por padrão
          }); }}>
            <div style={{ marginBottom: '10px' }}>
              <label>Rótulo:</label>
              <input type="text" name="label" required style={{ width: '100%', padding: '8px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>CEP:</label>
              <input type="text" name="zipcode" required style={{ width: '100%', padding: '8px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Rua/Avenida:</label>
              <input type="text" name="streetname" required style={{ width: '100%', padding: '8px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Número:</label>
              <input type="text" name="address_number" required style={{ width: '100%', padding: '8px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Bairro:</label>
              <input type="text" name="neighborhood" required style={{ width: '100%', padding: '8px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Ponto de Referência (opcional):</label>
              <input type="text" name="point_of_reference" style={{ width: '100%', padding: '8px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <Button $outline type="button" onClick={() => setShowAddAddressModal(false)}>Cancelar</Button>
              <Button type="submit">Adicionar</Button>
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL/FORMULÁRIO para Adicionar/Editar Contato */}
      {showAddContactForm && (
        <Modal
          title={editingContact ? "Editar Contato" : "Adicionar Novo Contato"}
          onClose={handleCancelContactForm}
        >
          <UserContactForm
            contact={editingContact}
            onSave={editingContact ? handleSaveEditedContact : handleAddContact}
            onCancel={handleCancelContactForm}
          />
        </Modal>
      )}
    </ProfileContainer>
  );
};

export default ProfilePage;
