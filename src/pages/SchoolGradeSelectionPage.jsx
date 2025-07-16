// src/pages/SchoolGradeSelectionPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getSchools, getGrades } from '../data/schoolsAndGrades';
import Button from '../components/common/Button';
// Importe Input se você tiver um componente Input genérico, caso contrário, remova.
// import Input from '../components/common/Input';

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* Garante que ocupe a altura restante, menos header e footer */
  min-height: calc(100vh - var(--header-height, 80px) - var(--footer-height, 60px));
  padding: 20px;
  background-color: var(--color-background-light, #f4f7f6);
  text-align: center;
  box-sizing: border-box; /* Garante que padding não adicione à largura total */

  @media (max-width: 768px) {
    padding: 15px; /* Menor padding em telas menores */
    min-height: calc(100vh - var(--header-height-mobile, 60px) - var(--footer-height-mobile, 50px));
  }
`;

const SelectionBox = styled.div`
  background-color: var(--color-background, #ffffff);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 500px; /* Limita a largura máxima em telas maiores */
  width: 90%; /* Ocupa 90% da largura disponível em telas menores */
  box-sizing: border-box; /* Inclui padding e border na largura total */
  margin: auto; /* Centraliza a caixa horizontalmente */

  @media (max-width: 768px) {
    padding: 30px 20px; /* Ajusta o padding para telas menores */
    width: 95%; /* Ocupa mais largura em telas muito pequenas */
  }

  @media (orientation: landscape) and (max-height: 500px) {
    padding: 20px; /* Ajusta o padding para landscape em telas pequenas */
    max-width: 400px; /* Reduz max-width para não ficar muito largo */
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--color-primary, #0056b3);
  margin-bottom: 25px;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: var(--color-text-light, #555);
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 25px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid var(--color-border, #ddd);
  border-radius: 8px;
  font-size: 1rem;
  color: var(--color-text, #333);
  background-color: white;
  appearance: none; /* Remove seta padrão em alguns navegadores */
  -webkit-appearance: none; /* Para Safari */
  -moz-appearance: none; /* Para Firefox */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23444%22%20d%3D%22M7%209.414l3.707-3.707a1%201%200%2000-1.414-1.414L6%207.586%202.707%204.293a1%201%200%2000-1.414%201.414z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
  cursor: pointer;

  &:focus {
    border-color: var(--color-primary, #0056b3);
    outline: none;
    box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb, 0, 86, 179), 0.2);
  }

  @media (max-width: 768px) {
    padding: 10px; /* Menor padding para selects em telas menores */
    font-size: 0.9rem;
  }
`;

const SchoolGradeSelectionPage = () => {
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const navigate = useNavigate();

  const schools = getSchools();
  const grades = getGrades();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSchool && selectedGrade) {
      navigate('/pacotes', { state: { schoolId: selectedSchool, gradeId: selectedGrade } });
    } else {
      alert('Por favor, selecione a escola e a série.');
    }
  };

  return (
    <SelectionContainer>
      <SelectionBox>
        <Title>Bem-vindo!</Title>
        <Subtitle>Para encontrar os materiais certos, por favor, selecione a escola e a série do aluno.</Subtitle>
        <Form onSubmit={handleSubmit}>
          <Select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            required
          >
            <option value="">Selecione a Escola</option>
            {schools.map((school) => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
          </Select>

          <Select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            required
          >
            <option value="">Selecione a Série</option>
            {grades.map((grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.name}
              </option>
            ))}
          </Select>

          <Button $primary type="submit">
            Buscar Pacotes
          </Button>
        </Form>
      </SelectionBox>
    </SelectionContainer>
  );
};

export default SchoolGradeSelectionPage;
