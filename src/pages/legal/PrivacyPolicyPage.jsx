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

const PrivacyPolicyPage = () => {
  return (
    <LegalContainer>
      <Title>Política de Privacidade</Title>

      <Paragraph>
        Esta Política de Privacidade descreve como o E-commerce Escolar coleta, usa e protege suas informações pessoais ao utilizar nosso site.
      </Paragraph>

      <Section>
        <SectionTitle>1. Informações Coletadas</SectionTitle>
        <Paragraph>
          Coletamos informações para fornecer e melhorar nossos serviços para você. Os tipos de informações que coletamos incluem:
        </Paragraph>
        <List>
          <ListItem>
            <strong>Informações Pessoais:</strong> Nome, endereço de e-mail, endereço de entrega, número de telefone, informações de pagamento (via processadores de pagamento seguros de terceiros).
          </ListItem>
          <ListItem>
            <strong>Dados de Uso:</strong> Informações sobre como você acessa e usa o serviço, como endereço IP, tipo de navegador, páginas visitadas, tempo gasto nessas páginas e outras estatísticas de diagnóstico.
          </ListItem>
          <ListItem>
            <strong>Dados de Cookies:</strong> Utilizamos cookies e tecnologias de rastreamento semelhantes para rastrear a atividade em nosso Serviço e manter certas informações.
          </ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>2. Como Usamos Suas Informações</SectionTitle>
        <Paragraph>
          As informações que coletamos são usadas para diversas finalidades:
        </Paragraph>
        <List>
          <ListItem>Para fornecer e manter nosso Serviço.</ListItem>
          <ListItem>Para notificar você sobre alterações em nosso Serviço.</ListItem>
          <ListItem>Para permitir que você participe de recursos interativos do nosso Serviço quando você optar por fazê-lo.</ListItem>
          <ListItem>Para fornecer suporte ao cliente.</ListItem>
          <ListItem>Para monitorar o uso do nosso Serviço.</ListItem>
          <ListItem>Para detectar, prevenir e resolver problemas técnicos.</ListItem>
          <ListItem>Para processar suas transações e gerenciar seus pedidos.</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>3. Compartilhamento de Dados</SectionTitle>
        <Paragraph>
          Podemos compartilhar suas informações pessoais com terceiros apenas nas seguintes circunstâncias:
        </Paragraph>
        <List>
          <ListItem>Com provedores de serviços para realizar funções em nosso nome (ex: processamento de pagamentos, entrega).</ListItem>
          <ListItem>Para conformidade legal, como responder a intimações ou ordens judiciais.</ListItem>
          <ListItem>Em caso de fusão, aquisição ou venda de ativos, suas informações pessoais podem ser transferidas.</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>4. Segurança dos Dados</SectionTitle>
        <Paragraph>
          A segurança dos seus dados é importante para nós, mas lembre-se que nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro. Embora nos esforcemos para usar meios comercialmente aceitáveis para proteger suas Informações Pessoais, não podemos garantir sua segurança absoluta.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>5. Seus Direitos</SectionTitle>
        <Paragraph>
          Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Por favor, entre em contato conosco se desejar exercer esses direitos.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>6. Alterações Nesta Política de Privacidade</SectionTitle>
        <Paragraph>
          Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova Política de Privacidade nesta página.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>7. Contato</SectionTitle>
        <Paragraph>
          Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco:
          <br />
          Por e-mail: <a href="mailto:suporte@ecommerceescolar.com.br" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>suporte@ecommerceescolar.com.br</a>
        </Paragraph>
      </Section>

      <LastUpdated>Última atualização: 15 de julho de 2025</LastUpdated>
    </LegalContainer>
  );
};

export default PrivacyPolicyPage;
