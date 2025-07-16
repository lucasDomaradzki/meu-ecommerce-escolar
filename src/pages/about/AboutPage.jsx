// src/pages/about/AboutPage.jsx
import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  padding: 40px 0;
  color: var(--color-text);
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  line-height: 1.6;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  color: var(--color-primary);
  margin-bottom: 30px;
`;

const Section = styled.section`
  margin-bottom: 40px;
  text-align: left;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: var(--color-accent);
  margin-bottom: 15px;
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 5px;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: var(--color-text-light);
`;

const Highlight = styled.span`
  color: var(--color-primary);
  font-weight: bold;
`;

const AboutPage = () => {
  return (
    <AboutContainer>
      <Title>Sobre Nós</Title>

      <Section>
        <SectionTitle>Nossa Missão</SectionTitle>
        <Paragraph>
          Na <Highlight>E-commerce Escolar</Highlight>, nossa missão é simplificar a volta às aulas para pais e alunos, oferecendo uma vasta gama de materiais escolares de alta qualidade, desde livros didáticos a artigos de papelaria criativos, tudo em um só lugar. Acreditamos que o acesso fácil a materiais educacionais é fundamental para o sucesso de cada estudante.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Nossos Valores</SectionTitle>
        <Paragraph>
          Nossos valores fundamentais guiam cada decisão que tomamos:
        </Paragraph>
        <ul>
          <Paragraph>
            <li><Highlight>Qualidade:</Highlight> Selecionamos cuidadosamente cada produto para garantir durabilidade e excelência.</li>
            <li><Highlight>Conveniência:</Highlight> Oferecemos uma experiência de compra online intuitiva e eficiente.</li>
            <li><Highlight>Acessibilidade:</Highlight> Trabalhamos para ter preços justos e opções para todos os orçamentos.</li>
            <li><Highlight>Comprometimento:</Highlight> Nos dedicamos ao sucesso educacional de nossos clientes.</li>
          </Paragraph>
        </ul>
      </Section>

      <Section>
        <SectionTitle>Nossa História</SectionTitle>
        <Paragraph>
          Fundada em 2025, a <Highlight>E-commerce Escolar</Highlight> nasceu da percepção da dificuldade que muitas famílias enfrentam ao organizar os materiais escolares a cada ano. Com o objetivo de transformar essa tarefa em algo prazeroso e sem estresse, criamos uma plataforma completa, pensando em cada detalhe para atender às necessidades de escolas, pais e, principalmente, dos estudantes.
        </Paragraph>
        <Paragraph>
          Desde o início, nos empenhamos em construir relações de confiança com nossos fornecedores e clientes, garantindo não apenas produtos, mas soluções que facilitam a vida e apoiam o aprendizado.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Por Que Nos Escolher?</SectionTitle>
        <Paragraph>
          Escolher a <Highlight>E-commerce Escolar</Highlight> significa optar por:
        </Paragraph>
        <ul>
          <Paragraph>
            <li>Variedade incomparável de produtos escolares.</li>
            <li>Qualidade garantida e marcas confiáveis.</li>
            <li>Preços competitivos e promoções especiais.</li>
            <li>Entrega rápida e segura em todo o país.</li>
            <li>Atendimento ao cliente dedicado e eficiente.</li>
          </Paragraph>
        </ul>
      </Section>
    </AboutContainer>
  );
};

export default AboutPage;
