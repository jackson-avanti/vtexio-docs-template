# VTEX Store Documentation

Esse é um repositório VTEX IO para a loja {loja}. Aqui podem ser encontrados tanto a própria loja quanto os apps custom feitos para adicionar funcionalidades exclusivas para os clientes Avanti.

Essa é uma loja B2C.

## Sumário

- [Requisitos](#requisitos)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Instalação](#instala%C3%A7%C3%A3o)
- [Release e deploy](#release-e-deploy)
- [Apps Custom](apps-custom)
- [FAQ](faq.md)

## Requisitos

Para desenvolver a loja desse repositório são necessários:

- VTEX CLI (VTEX toolbelt)
- Ambiente com workspace VTEX IO
- Gerenciador de pacotes (**yarn** ou npm)
- Conta VTEX

## Estrutura de pastas

```
|_ avanti-footer //App custom de footer
|_ avanti-menu //App custom de menu
|_ avanti-regionalization //App custom de regionalização
|_ avanti-global-context //App custom de contexto global
|_ avanti-custom-apps-frontend //Agregado de apps de frontend simples
|_ avanti-custom-apps-backend //Agregado de rotas e logicas de backend simples
|_ store-theme //Loja VTEX IO
```

## Instalação

1. Clone esse repositório;
2. Faça login na CLI usando `vtex login {accountName}`. A variável `accountName` é o nome da conta que se encontra no manifest;
3. Crie seu workspace usando `vtex use {workspaceName}` ou entre em um já existente usando o mesmo comando após encontrar seu workspace usando `vtex workspace list`;
4. (Opcional) Se seu ambiente não tiver nenhum dos apps desse repositório instalados, entre na pasta raiz de cada app e rode `vtex setup | vtex link` caso queira linkar, ou `vtex install` caso deseje realizar a instalação (o app deve ter sido publicado ao menos uma vez no para poder instalar);
5. Entre na pasta `/store-theme` e execute `vtex setup` seguido de `yarn` e `yarn dev:sass`;
6. Após isso a store podera ser linkada usando `vtex link`;

## Release e deploy

Execute os seguintes comandos na CLI:

```
vtex setup -i //Para remover dependendencias de workspace
git push --set-upstream origin {branchName} //Define um upstram para o release
vtex release {releaseType} stable //Cria a tag da nova versão. O releaseType pode ser "patch", "minor" ou "major"
vtex publish //Faz a publicação da nova versão, a partir daqui poderá rodar vtex install para essa nova versão em workspaces
```

Após isso, deverá instalar essa nova versão em seu workspace, removendo o link e, a partir disso, testar a estabilidade do release.

Se esse candidato a release estiver estável, faça o deploy com o comando `vtex deploy`.

## Apps Custom

Esse projeto contém Apps Custom. Para mais detalhes dos apps veja as seguintes documentações:

- [Avanti Footer](avanti-footer/README.md)
- [Avanti Menu](avanti-menu/README.md)
- [Avanti Regionalization](avanti-regionalization/README.md)
- [Avanti Custom Apps Frontend](avanti-custom-apps-frontend/README.md)
- [Avanti Custom Apps Backend](avanti-custom-apps-backend/README.md)
- [Avanti Global Context](avanti-global-context/README.md)

## FAQ

- `vtex deploy` emitiu um erro de período mínimo de testes.
  Execute `vtex deploy -f` para forçar o deploy imediato.
