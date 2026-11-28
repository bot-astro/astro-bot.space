---
title: Interfaces
description: Aprenda com este guia a deixar sua interface incrível e única
---

## O que é uma interface?

Uma interface é uma mensagem que permite aos usuários gerenciar rapidamente seu canal de voz temporário por meio de botões simples.  
Veja como é a interface padrão:
![interface padrão](/guides/default_interface.png 'Interface padrão')

## Criando uma interface

Você pode criar uma nova interface no painel, na seção de interfaces.  
Ele pedirá um canal e você pode escolher o que quiser.

## Mudando o canal ou reenviando uma interface

Se você excluiu por engano a mensagem de uma interface ou simplesmente quer mudar de canal, pode fazer isso nas configurações da interface no painel.

## Personalizando uma interface

Você pode personalizar cada interface no painel: abra a seção de interfaces, escolha uma interface e clique em gerenciar.  
Quando terminar, salve as alterações e o Astro atualizará a mensagem na hora.

_Lembre-se de que, sem o [Ultimate](/ultimate), você só pode desativar ou ativar os botões de uma interface, todo o resto exige o Ultimate._

### Configurações da mensagem

A mensagem é dividida em três partes, cada uma com suas próprias configurações:

- `Cabeçalho`: o nome do autor, o link do autor e a imagem do autor
- `Corpo`: o título, o link do título, a miniatura, a descrição e a imagem
- `Rodapé`: o texto do rodapé, a imagem do rodapé, a cor da linha à esquerda da mensagem e uma data e hora

Toda configuração é opcional, se você deixar um texto vazio ele simplesmente não será exibido.  
A imagem do autor e a imagem têm um valor padrão, que você pode restaurar com o botão `Redefinir para o padrão`.

### Imagens

As imagens são escolhidas no armazenamento de mídia do seu servidor. Clique em `Escolher imagem` para abri-lo, e a partir dele você pode:

- enviar uma nova imagem
- pré-visualizar as imagens que você já enviou
- selecionar uma imagem para a configuração que está editando
- excluir as imagens de que você não precisa mais

_Excluir uma imagem também a remove das configurações da interface que você está editando; outras interfaces que a usam ficarão com uma imagem quebrada até você mudá-la._

As imagens que não são usadas por nenhuma interface são limpas automaticamente de tempos em tempos.

### Emojis personalizados

Emojis podem ser usados nos textos da mensagem e nos botões. Emojis padrão podem simplesmente ser colados, já os emojis personalizados do Discord precisam do código:

1. Vá ao Discord e escreva o emoji precedido de uma barra invertida, por exemplo `\:nome:`
2. Envie a mensagem, o Discord enviará o código do emoji, como `<:nome:id>` (ou `<a:nome:id>` para emojis animados)
3. Copie esse código e cole no painel

## Botões

Uma interface pode ter até 5 linhas com 5 botões cada, o painel os mostra como uma grade.  
Clique em um botão para editá-lo, ou em uma posição vazia para adicionar um novo.

Cada botão tem estas configurações:

- `Botão`: qual botão é exibido nesta posição. Um botão só pode ser usado uma vez por interface, então os que já estão em outro lugar não podem ser selecionados. Escolha `Sem botão` para removê-lo
- `Desabilitado`: os usuários veem o botão, mas não podem clicar nele
- `Nome`: o texto exibido no botão
- `Emoji`: o emoji exibido no botão
- `Estilo`: a cor do botão

Um botão precisa de pelo menos um nome ou um emoji para ser exibido.

## Excluindo uma interface

Você pode excluir uma interface a qualquer momento pelo painel.

### Exemplo de interface personalizada

A imagem abaixo é um exemplo de interface personalizada:
![interface personalizada](/illustration/custom_interface.png 'Interface personalizada')
