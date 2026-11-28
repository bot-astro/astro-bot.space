---
title: O básico
description: Comece a usar o Astro aprendendo o básico
---

## O que o Astro pode fazer?

O Astro foca exclusivamente no lado de voz do Discord e o melhora com alguns recursos únicos e avançados.

O principal recurso são os canais de voz temporários.  
Um canal de voz temporário é criado pelos chamados geradores (que são criados e gerenciados pelo Astro). Quando um usuário entra em um gerador, o Astro cria um canal de voz temporário para ele e o move para lá. Quando o canal de voz temporário fica vazio, o Astro o exclui automaticamente.  
Assim você não terá um monte de canais de voz vazios espalhados pelo seu servidor!

Como complemento, o Astro oferece formas de os usuários gerenciarem seus canais de voz temporários, como renomear o canal, mudar o limite de usuários, bloquear / ocultar o canal e muito mais. Isso pode ser feito por comandos de barra ou pelas interfaces do Astro. Uma interface é simplesmente uma mensagem com botões criada pelo Astro que permite aos usuários executar ações rápidas no canal de voz deles.

Além disso, o Astro permite agrupar várias configurações e aplicá-las todas de uma vez a um canal de voz temporário: os modelos. Por exemplo, se você tem um servidor de jogos em que os usuários jogam vários jogos diferentes, pode criar um modelo para cada jogo com nome, limite de usuários etc. próprios.

Outro recurso extremamente útil são os cargos de voz. Com eles, você garante que os usuários recebam um cargo específico enquanto estiverem dentro de um canal de voz específico. É um recurso muito poderoso que abre muitos cenários diferentes.

Você pode ler mais sobre todos esses recursos no [guia](/guides) correspondente.  
Aqui vamos cobrir o básico para começar a usar o Astro no seu servidor!

## Convidando o bot

Primeiro de tudo, convide o bot para o seu servidor. Para isso, basta clicar [neste link](/invite) e selecionar um servidor!  
Você também pode visitar o [painel](/guilds) e será solicitado automaticamente a convidar o Astro para o servidor que quer gerenciar, caso ele ainda não tenha sido adicionado.

## Configuração rápida

Não quer configurar tudo na mão? Use o comando `/setup` ou o botão de configuração que o Astro envia quando entra no seu servidor.  
O Astro criará uma categoria com um gerador e uma interface dentro dela, para que os canais de voz temporários funcionem de imediato. Depois você pode mudar nome, categoria, posição e todo o resto pelo [painel](/guilds).

## Requisitos do servidor

Para poder usar o Astro no seu servidor, você precisa cumprir estes requisitos:

- ter menos de 50 bots (limite imposto pelo Discord)
- ter pelo menos a permissão `Gerenciar canais`

## Permissões do bot

O Astro exige a permissão `Administrador` por padrão para funcionar e garantir uma ótima experiência aos usuários comuns do Discord.

Se você tem um servidor profissional e não pode dar essa permissão ao Astro por motivos de segurança, pode desativar esse requisito pela chave correspondente no painel
![chave da permissão de administrador](/guides/admin_permissions.png 'Chave da permissão de administrador')
_Você pode pedir orientações no Servidor de Suporte sobre as permissões de que o Astro precisa para funcionar, mas não oferecemos suporte aprofundado sobre isso._

## Permissões de comandos

Lembre-se de que você sempre pode configurar quem tem acesso aos comandos de barra do Astro pelas permissões de comandos de barra do Discord.  
[Leia mais sobre isso aqui](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ).

## Idioma do servidor

Você pode mudar o idioma do seu servidor nas configurações do painel, e todas as mensagens que o bot enviar lá seguirão esse idioma.

## Perfil do bot

Quer que o Astro pareça mais parte do seu servidor? Pelo painel você pode dar a ele apelido, avatar, banner e bio personalizados, apenas para o seu servidor.

## Erros e problemas

O Astro reportará todos os problemas e erros que encontrar ao funcionar no seu servidor.  
Sempre que notar algo não funcionando direito, lembre-se de conferir a seção de erros no painel!

## Ultimate

O Ultimate é a versão premium do Astro e oferece muitos recursos avançados úteis, removendo todas as limitações:

| Recurso                                             |                      Premium                      |                           Grátis                           |
| --------------------------------------------------- | :-----------------------------------------------: | :--------------------------------------------------------: |
| Geradores de canais de voz temporários ilimitados   | <span class="text-discord-green text-lg">✓</span> |                          Máximo 2                          |
| Interfaces ilimitadas                               | <span class="text-discord-green text-lg">✓</span> |                          Máximo 1                          |
| Cargos de voz ilimitados                            | <span class="text-discord-green text-lg">✓</span> |                          Máximo 1                          |
| Modelos ilimitados                                  | <span class="text-discord-green text-lg">✓</span> |                          Máximo 3                          |
| Nomes numerados para canais de voz                  | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Interfaces personalizáveis                          | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Filtro de palavrões para nomes de canais de voz     | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Salas de espera                                     | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Chats de texto privados                             | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Cargo de voz para donos de canais                   | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Mensagens personalizadas na criação do canal de voz | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Geradores de reserva                                | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |

### Fazendo upgrade do seu servidor para o Ultimate

Depois de comprar uma assinatura na [página do Ultimate](/ultimate) ou pela [App Store do Discord](https://discord.com/application-directory/715621848489918495/premium), você pode fazer upgrade do seu servidor pelo botão correspondente no painel
![upgrade para o Ultimate](/guides/ultimate.png 'Upgrade para o Ultimate')

### Gerenciando sua assinatura

Você pode ver, gerenciar e cancelar suas assinaturas do Ultimate pelo [portal de cobrança](/billing).  
Se você comprou o Ultimate pelo checkout da App Store do Discord, consulte [este guia](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ).

## Suporte

Fique à vontade para entrar no [Servidor de Suporte / Comunidade](/support) se tiver qualquer dúvida!
