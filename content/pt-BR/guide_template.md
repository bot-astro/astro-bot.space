---
title: Modelos
description: Descubra os modelos e aprenda a configurá-los, seus usuários vão adorar
---

## O que é um modelo

Os modelos reúnem um conjunto de configurações de canal de voz que podem ser aplicadas de uma só vez a canais de voz temporários.

Isso é útil, por exemplo, em servidores de jogos onde os usuários podem jogar vários jogos diferentes.  
Ter um modelo para cada jogo permite deixar o canal de voz mais adequado àquele jogo, por exemplo com um nome ou limite de usuários específico.

## Usando modelos

Os usuários do seu servidor podem usar modelos por `/template`, que oferece preenchimento automático dos modelos disponíveis, ou pelo botão de interface correspondente.

## Criando e gerenciando modelos

Você pode criar, gerenciar e excluir modelos no [painel](/guilds).

_Lembre-se de que, sem o [Ultimate](/ultimate), você pode ter no máximo 3 modelos._

## Nome do modelo

O nome de um modelo é simplesmente um nome útil para os usuários identificarem um modelo.  
**Não é** o nome que o canal de voz temporário recebe quando o modelo é aplicado.

Quando um usuário quer aplicar um modelo ao seu canal, ele verá apenas uma lista de modelos em que cada um tem o seu próprio nome.

## Configurações do canal de voz

No painel você pode configurar as opções que são aplicadas ao canal de voz temporário quando um modelo é usado.

Você pode escolher:

- o nome do canal de voz, que aceita [variáveis](/guides/generator#variables)
- o limite de usuários
- a taxa de bits
- a região

_Nenhuma dessas configurações é obrigatória, então você não precisa definir todas._

## Geradores habilitados

Se você quiser restringir um modelo a alguns geradores específicos, pode fazer isso no painel.  
Nesse caso, o modelo não poderá ser usado por nenhum canal de voz temporário criado por um gerador que não esteja na lista `Geradores habilitados`.
