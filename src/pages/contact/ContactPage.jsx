// src/pages/contact/ContactPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';

// ... (seus Styled Components aqui) ...

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulário de Contato Enviado:', formData);
    alert('Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <ContactContainer>
      <Title>Entre em Contato</Title>

      <Section>
        <SectionTitle>Envie-nos uma Mensagem</SectionTitle>
        <Form onSubmit={handleSubmit}>
          {/* ... seus FormGroups ... */}

          <Button $primary type="submit">Enviar Mensagem</Button> {/* Usar $primary */}
        </Form>
      </Section>

      {/* ... ContactInfo ... */}
    </ContactContainer>
  );
};

export default ContactPage;
