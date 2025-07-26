import React from 'react';
import styled from 'styled-components';

const LegalContainer = styled.div`
  padding: 40px 0;
  color: var(--color-text);
  max-width: 900px;
  margin: 0 auto;
  text-align: justify;
  line-height: 1.7;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  color: var(--color-primary);
  margin-bottom: 30px;
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: var(--color-accent);
  margin-bottom: 15px;
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 5px;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
  color: var(--color-text-light);
`;

const List = styled.ul`
  list-style: disc;
  margin-left: 25px;
  margin-bottom: 15px;
`;

const ListItem = styled.li`
  font-size: 1rem;
  margin-bottom: 5px;
  color: var(--color-text-light);
`;

const LastUpdated = styled.p`
  font-size: 0.9rem;
  color: var(--color-text-light);
  text-align: right;
  margin-top: 50px;
`;

const TermsOfUsePage = () => {
  return (
    <LegalContainer>
      <Title>Termos de Uso</Title>

      <Paragraph>
        Bem-vindo ao E-commerce Escolar. Ao acessar ou usar nosso site, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Por favor, leia-os atentamente.
      </Paragraph>

      <Section>
        <SectionTitle>1. Aceitação dos Termos</SectionTitle>
        <Paragraph>
          Ao utilizar este site, você concorda com estes Termos de Uso e com nossa Política de Privacidade. Se você não concorda com qualquer um dos termos, não use este site.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>2. Uso do Serviço</SectionTitle>
        <List>
          <ListItem>Você deve ter pelo menos 18 anos de idade ou ter a supervisão de um adulto para usar este site.</ListItem>
          <ListItem>Você concorda em usar o site apenas para fins legítimos e de maneira que não infrinja os direitos de, ou restrinja ou iniba o uso e desfrute do site por terceiros.</ListItem>
          <ListItem>Reservamo-nos o direito de recusar o serviço, encerrar contas ou cancelar pedidos a nosso exclusivo critério.</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>3. Conta do Usuário</SectionTitle>
        <List>
          <ListItem>Você é responsável por manter a confidencialidade da sua conta e senha e por restringir o acesso ao seu computador.</ListItem>
          <ListItem>Você concorda em aceitar a responsabilidade por todas as atividades que ocorram em sua conta ou senha.</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>4. Produtos e Preços</SectionTitle>
        <List>
          <ListItem>Fazemos todos os esforços para exibir com a maior precisão possível as cores e imagens de nossos produtos.</ListItem>
          <ListItem>Todos os preços estão sujeitos a alterações sem aviso prévio.</ListItem>
          <ListItem>Reservamo-nos o direito de descontinuar qualquer produto a qualquer momento.</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>5. Propriedade Intelectual</SectionTitle>
        <Paragraph>
          Todo o conteúdo presente neste site, incluindo textos, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais e compilações de dados, é propriedade do E-commerce Escolar ou de seus fornecedores de conteúdo e é protegido por leis de direitos autorais.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>6. Limitação de Responsabilidade</SectionTitle>
        <Paragraph>
          O E-commerce Escolar não será responsável por quaisquer danos diretos, indiretos, incidentais, especiais ou consequenciais que resultem do uso ou da incapacidade de usar os materiais neste site ou do desempenho dos produtos.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>7. Lei Aplicável</SectionTitle>
        <Paragraph>
          Estes Termos de Uso serão regidos e interpretados de acordo com as leis do Brasil.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>8. Alterações nos Termos de Uso</SectionTitle>
        <Paragraph>
          Podemos revisar e atualizar estes Termos de Uso a qualquer momento, publicando as alterações neste site. Seu uso continuado do site após quaisquer alterações significa sua aceitação dessas alterações.
        </Paragraph>
      </Section>

      <LastUpdated>Última atualização: 15 de julho de 2025</LastUpdated>
    </LegalContainer>
  );
};

export default TermsOfUsePage;
