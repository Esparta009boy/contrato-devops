# 🚀 Projeto de Infraestrutura DevOps - API de Contratos

Este repositório contém a arquitetura de infraestrutura, containerização, orquestração e pipeline de CI/CD desenvolvida para suportar a API backend em TypeScript.

---

## 🏗️ Justificativa de Arquitetura

A solução foi projetada aplicando os pilares fundamentais de **DevOps**:

1. **Containerização com Docker (Multi-stage Build):**
   - Utilizou-se o padrão *Multi-stage build* em Node.js (Alpine Linux) para separar o ambiente de compilação (*builder*) do ambiente de execução (*runner*). Isso reduz drasticamente o tamanho da imagem final de produção e mitiga vulnerabilidades de segurança.
2. **Orquestração Local com Docker Compose:**
   - O ambiente isola a API, o banco de dados relacional (**PostgreSQL**) e o serviço de cache/mensageria (**Redis**) em uma rede privada interna, garantindo consistência entre o ambiente de desenvolvimento e produção (*"Write once, run anywhere"*).
3. **Persistência de Dados:**
   - Volumes dedicados (`pgdata`) foram configurados para garantir que o estado do banco de dados não seja perdido ao reiniciar ou recriar os containers.
4. **Integração Contínua (CI/CD - GitHub Actions):**
   - Automatização de testes e validação de build a cada commit na branch principal, garantindo feedback rápido e entrega de software confiável.

---

## 🛠️ Pré-requisitos

Certifique-se de ter instalado em sua máquina:
- [Docker & Docker Compose](https://www.docker.com/)
- [Node.js (v18+)](https://nodejs.org/)

---

## ⚙️ Como Provisionar e Executar o Projeto

### 1. Clonar o Repositório
```bash
git clone [https://github.com/Esparta009boy/contrato-devops.git](https://github.com/Esparta009boy/contrato-devops.git)
cd contrato-devops