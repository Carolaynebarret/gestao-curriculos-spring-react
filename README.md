# Projeto Final POO

![Java](https://img.shields.io/badge/Java-11-007396?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.5.0-6DB33F?logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-17-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-4.1-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

Projeto final da disciplina de Programação Orientada a Objetos (POO), desenvolvido por
estudantes da UERN (Universidade do Estado do Rio Grande do Norte). A aplicação é dividida
em dois módulos independentes: uma **API REST em Spring Boot** para cadastro de currículos
e uma **aplicação web em React** com um formulário de dados pessoais para geração de
currículo.

> Este README foi revisado para refletir com precisão o estado atual do código-fonte.
> Nem toda funcionalidade descrita abaixo está integrada de ponta a ponta — veja a seção
> [Roadmap](#roadmap--melhorias-futuras) para o que ainda falta.

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como executar o projeto](#como-executar-o-projeto)
- [Como rodar os testes](#como-rodar-os-testes)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Roadmap / melhorias futuras](#roadmap--melhorias-futuras)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Funcionalidades

### Backend (API REST — `/curriculo`)

- **Listar** todos os currículos cadastrados (`GET /curriculo`).
- **Buscar** um currículo por ID (`GET /curriculo/{id}`).
- **Cadastrar** um novo currículo (`POST /curriculo`), com validação de campos
  obrigatórios (Bean Validation) e verificação de e-mail duplicado.
- **Atualizar** um currículo existente (`PUT /curriculo/{id}`).
- **Remover** um currículo (`DELETE /curriculo/{id}`).
- Tratamento centralizado de erros (validação de formulário e regras de negócio),
  retornando um payload padronizado (`Problema`) com mensagens de erro em português
  (`messages.properties`).
- Versionamento do schema do banco de dados com **Flyway** (migração inicial cria a
  tabela `curriculo`).

### Frontend (aplicação web)

- Página inicial (`/`) com apresentação do projeto e link para o formulário.
- Página de formulário (`/Formulario`) com campos de dados pessoais, formação,
  experiência, situação laboral, entre outros, estilizados com Bootstrap.
- Barra de navegação e rodapé compartilhados entre as páginas, com créditos aos
  autores do projeto.

## Tecnologias utilizadas

**Backend**

- Java 11
- Spring Boot 2.5 (Web, Data JPA, Validation)
- Flyway (migrações de banco de dados)
- MySQL (banco de dados principal) e H2 (banco em memória usado nos testes)
- Lombok
- Maven (com Maven Wrapper)

**Frontend**

- React 17 + TypeScript
- React Router DOM 5
- Bootstrap 5
- Create React App (`react-scripts`)

## Pré-requisitos

- **JDK 11** ou superior para compilar e rodar o backend.
- **MySQL** 5.7+ ou 8.x em execução localmente (ou acessível via rede) para o modo de
  desenvolvimento/produção do backend. Não é necessário para rodar os testes, que usam
  um banco H2 em memória.
- **Node.js 16.x** (LTS) e **Yarn** para o frontend. Versões muito recentes do Node
  (20+) podem falhar ao rodar `yarn build`, por uma incompatibilidade conhecida entre
  `react-scripts@4` (Create React App) e o novo sistema de resolução de módulos
  (`exports`) de dependências transitivas do Node.js — o build foi validado com Node
  16 neste repositório.

## Instalação

Clone o repositório:

```bash
git clone https://github.com/Carolaynebarret/Projeto-Final-POO-.git
cd Projeto-Final-POO-
```

### Backend

```bash
cd backend
./mvnw install
```

### Frontend

```bash
cd frontend
yarn install
```

## Como executar o projeto

### Backend

1. Crie um banco MySQL (ou use `createDatabaseIfNotExist=true`, já configurado, para
   que o schema seja criado automaticamente na primeira conexão).
2. Por padrão, a aplicação se conecta em
   `jdbc:mysql://localhost/projetopoo` com usuário `root` e senha `1234567`
   (`backend/src/main/resources/application.properties`). Para usar outras
   credenciais, defina as variáveis de ambiente `DB_URL`, `DB_USERNAME` e
   `DB_PASSWORD` antes de subir a aplicação.
3. Rode a aplicação:

   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

4. A API ficará disponível em `http://localhost:8080/curriculo`.

### Frontend

```bash
cd frontend
yarn start
```

A aplicação ficará disponível em `http://localhost:3000`.

> **Nota:** atualmente o formulário do frontend não envia dados para a API do
> backend — os dois módulos ainda não estão integrados (veja o
> [Roadmap](#roadmap--melhorias-futuras)).

## Como rodar os testes

### Backend

O backend possui um teste de carregamento de contexto do Spring
(`ProjetoApplicationTests`), executado com um banco H2 em memória
(configurado em `backend/src/test/resources/application.properties`), sem
depender de uma instância MySQL local:

```bash
cd backend
./mvnw test
```

### Frontend

**O frontend não possui testes automatizados no momento.** O projeto foi
inicializado a partir do Create React App, que oferece suporte pronto a
testes com Jest e React Testing Library (`yarn test`), mas nenhum arquivo de
teste foi escrito até agora.

## Estrutura de pastas

```
Projeto-Final-POO-/
├── backend/                      API REST em Spring Boot
│   ├── src/main/java/com/projeto/projetofinal/
│   │   ├── api/controller/       Controllers REST (CurriculoController)
│   │   ├── api/model/service/    Regras de negócio (CurriculoService)
│   │   ├── api/repositorio/      Repositórios Spring Data JPA
│   │   ├── api/exceptionhandler/ Tratamento centralizado de erros
│   │   ├── api/model/exception/  Exceções de negócio
│   │   └── domain/model/         Entidades JPA (Curriculo)
│   ├── src/main/resources/       application.properties, mensagens e migrações Flyway
│   └── src/test/                 Testes automatizados (contexto H2 em memória)
├── frontend/                     Aplicação web em React + TypeScript
│   └── src/
│       ├── componets/            Componentes reutilizáveis (Form, NavBar, Footer)
│       ├── pages/                Páginas (Home, Forms)
│       ├── assets/                Estilos globais
│       ├── App.tsx / Routes.tsx  Composição da aplicação e rotas
│       └── index.tsx             Ponto de entrada
├── docs/images/                  Capturas de tela do projeto (ver README da pasta)
├── LICENSE
└── README.md
```

## Roadmap / melhorias futuras

- [ ] Integrar o formulário do frontend com a API REST do backend (envio real dos
      dados de currículo).
- [ ] Exibir feedback de sucesso/erro ao usuário após o envio do formulário.
- [ ] Adicionar testes automatizados no frontend (Jest + React Testing Library).
- [ ] Adicionar testes de integração para os endpoints do backend
      (`CurriculoController`, `CurriculoService`).
- [ ] Configurar CORS explicitamente no backend, hoje necessário para uma futura
      integração entre os dois módulos rodando em origens diferentes.
- [ ] Adicionar paginação e busca na listagem de currículos.
- [ ] Configurar integração contínua (CI) para rodar build e testes de backend e
      frontend a cada push.

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork deste repositório.
2. Crie uma branch para sua alteração (`git checkout -b feature/minha-feature`).
3. Faça commit das suas mudanças (`git commit -m 'Adiciona minha feature'`).
4. Envie para o seu fork (`git push origin feature/minha-feature`).
5. Abra um Pull Request descrevendo a alteração proposta.

## Licença

Este projeto está licenciado sob os termos da licença MIT. Veja o arquivo
[LICENSE](LICENSE) para mais detalhes.
