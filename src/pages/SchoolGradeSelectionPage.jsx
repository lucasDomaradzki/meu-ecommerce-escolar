// src/pages/SchoolGradeSelectionPage.jsx
import React, { useState, useEffect } from 'react'; // Adicionado useEffect
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import { getSchools, getGrades } from '../data/schoolsAndGrades'; // REMOVER este import
import Button from '../components/common/Button';

// Estilos existentes (não alterados)
const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--header-height, 80px) - var(--footer-height, 60px));
  padding: 20px;
  background-color: var(--color-background-light, #f4f7f6);
  text-align: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px;
    min-height: calc(100vh - var(--header-height-mobile, 60px) - var(--footer-height-mobile, 50px));
  }
`;

const SelectionBox = styled.div`
  background-color: var(--color-background, #ffffff);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
  box-sizing: border-box;
  margin: auto;

  @media (max-width: 768px) {
    padding: 30px 20px;
    width: 95%;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    padding: 20px;
    max-width: 400px;
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
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
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
    padding: 10px;
    font-size: 0.9rem;
  }
`;

const SchoolGradeSelectionPage = () => {
  const [selectedSchoolUUID, setSelectedSchoolUUID] = useState(''); // Armazenará o UUID da escola selecionada
  const [selectedGradeUUID, setSelectedGradeUUID] = useState('');   // Armazenará o UUID da série selecionada
  const [schoolsData, setSchoolsData] = useState([]);               // Armazenará os dados da API
  const [availableGrades, setAvailableGrades] = useState([]);       // Armazenará as séries da escola selecionada
  const [loading, setLoading] = useState(true);                     // Estado de carregamento
  const [error, setError] = useState(null);                         // Estado de erro
  const navigate = useNavigate();

  // Função para buscar dados da API
  useEffect(() => {
    const fetchSchoolsAndGrades = async () => {
      try {
        setLoading(true);
        // Substitua 'http://localhost:8080/api/schools-with-grades' pela sua URL da API
        // Certifique-se de que a API retorne o formato JSON que você mostrou
        const response = await fetch('http://localhost:8080/v1/school'); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSchoolsData(data);
        setError(null); // Limpa qualquer erro anterior
      } catch (err) {
        console.error("Erro ao buscar escolas e séries:", err);
        setError("Não foi possível carregar as escolas e séries. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolsAndGrades();
  }, []); // O array vazio [] garante que o useEffect rode apenas uma vez ao montar o componente

  // Atualiza as séries disponíveis quando a escola selecionada muda
  useEffect(() => {
    if (selectedSchoolUUID) {
      const school = schoolsData.find(s => s.schoolId === selectedSchoolUUID);
      if (school) {
        setAvailableGrades(school.grades);
      } else {
        setAvailableGrades([]); // Limpa as séries se a escola não for encontrada (erro ou reset)
      }
      setSelectedGradeUUID(''); // Reseta a série selecionada ao mudar a escola
    } else {
      setAvailableGrades([]); // Nenhuma escola selecionada, nenhuma série disponível
      setSelectedGradeUUID('');
    }
  }, [selectedSchoolUUID, schoolsData]); // Depende de selectedSchoolUUID e schoolsData

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSchoolUUID && selectedGradeUUID) {
      // Passa os UUIDs para a página de pacotes
      navigate('/pacotes', { state: { schoolId: selectedSchoolUUID, gradeId: selectedGradeUUID } });
    } else {
      alert('Por favor, selecione a escola e a série.');
    }
  };

  if (loading) {
    return (
      <SelectionContainer>
        <SelectionBox>
          <p>Carregando escolas e séries...</p>
        </SelectionBox>
      </SelectionContainer>
    );
  }

  if (error) {
    return (
      <SelectionContainer>
        <SelectionBox>
          <p style={{ color: 'red' }}>{error}</p>
          <Button onClick={() => window.location.reload()}>Recarregar Página</Button>
        </SelectionBox>
      </SelectionContainer>
    );
  }

  return (
    <SelectionContainer>
      <SelectionBox>
        <Title>Bem-vindo!</Title>
        <Subtitle>Para encontrar os materiais certos, por favor, selecione a escola e a série do aluno.</Subtitle>
        <Form onSubmit={handleSubmit}>
          <Select
            value={selectedSchoolUUID}
            onChange={(e) => setSelectedSchoolUUID(e.target.value)}
            required
          >
            <option value="">Selecione a Escola</option>
            {schoolsData.map((school) => (
              <option key={school.schoolId} value={school.schoolId}>
                {school.name}
              </option>
            ))}
          </Select>

          <Select
            value={selectedGradeUUID}
            onChange={(e) => setSelectedGradeUUID(e.target.value)}
            required
            disabled={!selectedSchoolUUID} // Desabilita o dropdown de série se nenhuma escola for selecionada
          >
            <option value="">Selecione a Série</option>
            {availableGrades.map((grade) => (
              <option key={grade.gradeId} value={grade.gradeId}>
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