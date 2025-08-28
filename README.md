# Mini Pokédex (HTML + CSS + JS + PokéAPI)

Webapp simples e **responsivo**, sem dependências, consumindo a [PokéAPI](https://pokeapi.co/).
- Buscar por **nome** ou **ID**
- Mostrar **sprite oficial**, **tipos**, **habilidades** e **stats**
- **Histórico** de buscas (localStorage)
- Tema claro/escuro via `prefers-color-scheme`

## Como rodar localmente
1. Baixe/clone o repositório
2. Abra o `index.html` no navegador (ou use uma extensão de live server)

## Deploy no GitHub Pages
1. Crie um repositório no GitHub (ex.: `pokedex`)
2. Envie os 4 arquivos (`index.html`, `style.css`, `script.js`, `README.md`)
3. Vá em **Settings → Pages**  
   - **Source:** `Deploy from a branch`  
   - **Branch:** `main` (ou `master`) / pasta `/root`  
4. Salve. O GitHub gerará um link `https://seu-usuario.github.io/pokedex`.

## Deploy no Netlify
1. Acesse [https://app.netlify.com/](https://app.netlify.com/)
2. **Add new site → Import an existing project**
3. Conecte sua conta do GitHub e selecione o repositório
4. Build command: **(deixe em branco)** • Publish directory: **/**  
5. Deploy. Você ganha uma URL `https://seu-nome.netlify.app/` (pode renomear em Site settings).

## API usada
- `GET https://pokeapi.co/api/v2/pokemon/{nameOrId}` (sem chave)

## Licença
MIT
