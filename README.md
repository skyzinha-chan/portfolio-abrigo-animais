# Abrigo Interativo 🐾

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge&logo=javascript)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3)

Aplicação web interativa que simula a lógica de um abrigo de animais, permitindo aos usuários testar diferentes cenários de adoção baseados em um conjunto complexo de regras de negócio. Este projeto foi desenvolvido com JavaScript puro (ES Modules), HTML5 e CSS3, focando na modularidade do código e na separação de responsabilidades.

## 🌟 Visão Geral

O objetivo deste projeto é demonstrar a implementação de uma lógica de negócios em uma interface web funcional e amigável. Os usuários podem selecionar os brinquedos que duas pessoas diferentes possuem e os animais disponíveis para adoção. Com um clique, a aplicação processa as regras e determina o destino de cada animal: "pessoa 1", "pessoa 2" ou "abrigo".

### ✨ Principais Funcionalidades

* **Seleção Interativa:** Interfaces limpas para selecionar brinquedos para cada pessoa e animais para adoção usando checkboxes.
* **Lógica de Adoção Complexa:** O sistema avalia múltiplas regras, incluindo:
    * **Cães:** Requerem que seus brinquedos favoritos sejam apresentados na ordem correta (subsequência).
    * **Gatos:** Exigem uma correspondência exata de brinquedos, sem itens extras ou faltantes.
    * **Jabuti (Loco):** Requer todos os seus brinquedos favoritos (em qualquer ordem) e a companhia de pelo menos outro animal adotado pela mesma pessoa.
    * **Regras Gerais:** Limite de 3 animais por pessoa e regras de desempate.
* **Resultados Dinâmicos:** Exibição instantânea dos resultados, mostrando para onde cada animal foi destinado.
* **Validação de Entradas:** O sistema previne a submissão de dados inválidos, como animais ou brinquedos duplicados/inexistentes.

---

## 🚀 Como Executar o Projeto

Como este projeto utiliza Módulos ES6 (`import`/`export`), ele precisa ser servido por um servidor web para funcionar corretamente no navegador. A forma mais simples de fazer isso é:

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/skyzinha-chan/portfolio-abrigo-animais.git](https://github.com/skyzinha-chan/portfolio-abrigo-animais.git)
    ```

2.  **Navegue até a Pasta:**
    ```bash
    cd portfolio-abrigo-animais
    ```

3.  **Inicie um Servidor Local:**
    Se você usa o Visual Studio Code, a maneira mais fácil é instalar a extensão **Live Server** e clicar em "Go Live" no canto inferior direito.

    Alternativamente, se você tem Python instalado, pode executar:
    ```bash
    # Para Python 3.x
    python -m http.server
    ```
    Abra seu navegador e acesse `http://localhost:8000`.

---

## 🗺️ Roadmap de Melhorias Futuras

Este projeto tem uma base sólida, mas há um caminho claro para futuras expansões e melhorias, divididas em fases.

### Fase 2: Melhorias e Expansão

* **Banco de Dados de Animais Dinâmico:** Em vez de ter os animais fixos no código (`animais.db.js`), os dados serão carregados de um arquivo `JSON` externo. Isso permitirá adicionar novos animais sem a necessidade de alterar a lógica do JavaScript.
* **Visuais dos Animais:** Adicionar um campo de imagem para cada animal no banco de dados. A interface será atualizada para exibir a foto do animal ao lado do nome nos resultados da adoção.
* **Novas Regras de Negócio:** Expandir a complexidade da simulação com novas regras, como "animais que são amigos e devem ser adotados juntos" ou "animais mais velhos têm prioridade de adoção".

### Fase 3: Levando para o Backend (Avançado)

* **Criar uma API RESTful:** Utilizar Node.js com o framework Express para mover toda a lógica de negócio para o servidor. O frontend fará requisições (`fetch`) a esta API para processar as adoções.
* **Implementar um Banco de Dados Real:** Substituir o arquivo JSON por um sistema de gerenciamento de banco de dados como SQLite, PostgreSQL ou MongoDB para persistir os dados dos animais de forma mais robusta.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

_Projeto desenvolvido com ❤️ por [Talita Mendonça Marques](https://github.com/skyzinha-chan)._