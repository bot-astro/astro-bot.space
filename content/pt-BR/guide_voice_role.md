---
title: Cargos de voz
description: Aprenda a configurar cargos de voz para deixar seu servidor ainda mais estiloso
---

## O que é um cargo de voz

Os cargos de voz (antes chamados de conexões) permitem conectar canais de voz a cargos.  
Eles permitem que os usuários recebam um cargo enquanto estiverem dentro de um canal de voz específico, e o Astro o removerá deles quando saírem desse canal.

Neste exemplo, um cargo de voz é criado na categoria. O usuário recebe um cargo que permite ver vários canais relacionados àquela categoria:
![exemplo de cargo de voz](/illustration/voice_role.gif "Exemplo de cargo de voz")

## Criando e gerenciando cargos de voz

Você pode criar, gerenciar e excluir cargos de voz no painel.

_Lembre-se de que, sem o [Ultimate](/ultimate), você pode ter apenas 1 cargo de voz._

## Configuração do canal

Ao criar ou editar um cargo de voz, você deve selecionar um canal para ele.  
O canal pode ser:

- um canal de voz normal (inclui canais de palco)
- uma categoria: todo canal de voz dentro dela acionará o cargo de voz
- um gerador: todo canal de voz temporário criado por esse gerador acionará o cargo de voz

## Configuração da ação

Há três ações diferentes para escolher:

- `Atribuir`: o Astro atribui o cargo ao usuário quando ele entra no canal e o remove quando o usuário sai
- `Remover`: remove o cargo quando o usuário entra no canal e o devolve quando o usuário sai
- `Alternar`: se o usuário não tem o cargo antes de entrar no canal, se comportará como `Atribuir`, caso contrário como `Remover` (basicamente alterna o cargo, como o nome sugere)
