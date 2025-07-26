import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import AddressFormModal from '../../components/user/AddressFormModal'; 
import EditProfileModal from '../../components/user/EditProfileModal'; 
import ChangePasswordModal from '../../components/user/ChangePasswordModal'; 
import { users as mockUsers } from '../../data/users'; 
import { orders as mockOrders } from '../../data/orders'; 
import OrderCard from '../../components/user/OrderCard'; 
import { useNavigate } from 'react-router-dom'; 

const ProfilePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  background-color: var(--color-background-light);
`;

const Section = styled(Card)`
  margin-bottom: 30px;
  width: 100%;
  max-width: 800px;
  padding: 30px;
  box-sizing: border-box;

  h2 {
    font-size: 2rem;
    color: var(--color-primary);
    margin-bottom: 25px;
    text-align: center;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 15px;
  }

  p {
    font-size: 1.1rem;
    color: var(--color-text);
    line-height: 1.6;
    margin-bottom: 15px;
    text-align: center;
  }

  @media (max-width: var(--breakpoint-tablet)) {
    padding: 20px;
    h2 {
      font-size: 1.8rem;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  justify-content: center;
  flex-wrap: wrap;

  button {
    flex: 1;
    min-width: 150px;
    max-width: 200px;
  }
`;

const AddressList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

const AddressCard = styled(Card)`
  padding: 20px;
  text-align: left;
  border: 1px solid var(--color-border);
  /* Removido position: relative; do pai para evitar problemas com children posicionados absolutamente */
  /* position: relative; */ 

  h3 {
    font-size: 1.2rem;
    color: var(--color-primary);
    margin-bottom: 10px;
  }
  p {
    font-size: 0.95rem;
    color: var(--color-text);
    margin-bottom: 5px;
    line-height: 1.4;
    text-align: left;
  }

  .address-actions {
    /* CORREÇÃO AQUI: Não usar absolute position para evitar sobreposição */
    display: flex;
    gap: 10px;
    margin-top: 15px; /* Adiciona um espaço acima dos botões */
    justify-content: flex-end; /* Alinha os botões à direita */

    button {
      padding: 8px 12px;
      font-size: 0.85rem;
    }
  }

  @media (max-width: var(--breakpoint-tablet)) {
    .address-actions {
      /* Em telas menores, eles já estarão empilhados ou justificados */
      justify-content: flex-end; 
    }
  }
`;

const OrderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
  width: 100%;
`;


const ProfilePage = () => {
  const [loggedInUser, setLoggedInUser] = useState(null); 
  const userOrders = mockOrders.filter(order => order.userId === 'user-1'); 

  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false); 
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null); 

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = mockUsers.find(user => user.id === 'user-1'); 
    if (currentUser) {
      setLoggedInUser(currentUser);
    }
  }, []);

  const handleEditProfile = () => {
    setShowEditProfileModal(true);
  };

  const handleChangePassword = () => { 
    setShowChangePasswordModal(true);
  };

  const handleAddAddress = () => {
    setEditingAddress(null);
    setShowAddressModal(true);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowAddressModal(true);
  };

  const handleDeleteAddress = (addressId) => {
    if (window.confirm('Tem certeza que deseja excluir este endereço?')) {
      console.log(`Endereço ${addressId} excluído.`);
      alert('Endereço excluído com sucesso (simulado)!');
    }
  };

  const handleSaveProfile = (updatedProfile) => {
    console.log('Perfil atualizado (simulado):', updatedProfile);
    setLoggedInUser(prevUser => ({ ...prevUser, ...updatedProfile })); 
    setShowEditProfileModal(false);
    alert('Perfil atualizado com sucesso!');
  };

  const handlePasswordChange = (newPasswordData) => { 
    console.log('Senha alterada (simulada):', newPasswordData);
    setShowChangePasswordModal(false);
    alert('Senha alterada com sucesso!');
  };

  const handleSaveAddress = (newAddress) => {
    console.log('Endereço salvo (simulado):', newAddress);
    setShowAddressModal(false);
    alert('Endereço salvo com sucesso!');
  };

  const latestOrders = userOrders.slice(0, 3);

  return (
    <ProfilePageContainer>
      <Section>
        <h2>Informações da Conta</h2>
        {loggedInUser ? (
          <>
            <p>Bem-vindo(a), <strong>{loggedInUser.name}</strong></p>
            <p>Seu e-mail: {loggedInUser.email}</p>
            <ButtonGroup>
              <Button $primary onClick={handleEditProfile}>Editar Perfil</Button>
              <Button $outline onClick={handleChangePassword}>Alterar Senha</Button> 
            </ButtonGroup>
          </>
        ) : (
          <p>Carregando informações do usuário...</p>
        )}
      </Section>

      <Section>
        <h2>Meus Pedidos</h2>
        {latestOrders.length > 0 ? (
          <>
            <p>Aqui estão seus últimos pedidos. Clique em qualquer um para ver os detalhes completos.</p>
            <OrderGrid>
              {latestOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </OrderGrid>
            <ButtonGroup>
              <Button $outline onClick={() => navigate('/meus-pedidos')}>
                Ver Todos os Pedidos
              </Button>
            </ButtonGroup>
          </>
        ) : (
          <>
            <p>Você ainda não fez nenhum pedido conosco.</p>
            <p>Comece a comprar agora e encontre os pacotes ideais para você!</p>
            <ButtonGroup>
              <Button $primary onClick={() => navigate('/pacotes')}>Ver Todos os Pacotes</Button>
            </ButtonGroup>
          </>
        )}
      </Section>

      <Section>
        <h2>Endereços Salvos</h2>
        {loggedInUser && loggedInUser.addresses && loggedInUser.addresses.length > 0 ? (
          <AddressList>
            {loggedInUser.addresses.map((address) => (
              <AddressCard key={address.id}>
                <h3>{address.label}</h3> 
                <p>
                  {address.streetname}, {address.address_number}
                  {address.point_of_reference && `, ${address.point_of_reference}`} 
                </p>
                <p>{address.neighborhood}</p> 
                <p>CEP: {address.zipcode}</p> 
                <div className="address-actions">
                  <Button $outline $small="true" onClick={() => handleEditAddress(address)}>Editar</Button> 
                  <Button $danger $small="true" onClick={() => handleDeleteAddress(address.id)}>Excluir</Button> 
                </div>
              </AddressCard>
            ))}
          </AddressList>
        ) : (
          <p>Você não tem nenhum endereço salvo. Adicione um endereço para agilizar suas futuras compras!</p>
        )}
        <ButtonGroup>
          <Button $primary onClick={handleAddAddress}>Adicionar Novo Endereço</Button>
        </ButtonGroup>
      </Section>

      {showEditProfileModal && (
        <Modal title="Editar Informações do Perfil" onClose={() => setShowEditProfileModal(false)}>
          <EditProfileModal user={loggedInUser} onSave={handleSaveProfile} onClose={() => setShowEditProfileModal(false)} />
        </Modal>
      )}

      {showChangePasswordModal && (
        <Modal title="Alterar Senha" onClose={() => setShowChangePasswordModal(false)}>
          <ChangePasswordModal onSave={handlePasswordChange} onClose={() => setShowChangePasswordModal(false)} />
        </Modal>
      )}

      {showAddressModal && (
        <Modal title={editingAddress ? "Editar Endereço" : "Adicionar Novo Endereço"} onClose={() => setShowAddressModal(false)}>
          <AddressFormModal address={editingAddress} onSave={handleSaveAddress} onClose={() => setShowAddressModal(false)} />
        </Modal>
      )}
    </ProfilePageContainer>
  );
};

export default ProfilePage;
