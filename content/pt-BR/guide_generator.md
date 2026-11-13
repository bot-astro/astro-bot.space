---
title: Geradores
description: Aprenda a configurar e usar geradores de canais de voz temporários
---

## O que é um gerador?

Geradores são canais criados e gerenciados pelo Astro.  
Quando um usuário entra em um gerador, o Astro cria um canal de voz temporário e move o usuário para ele.

O usuário que cria o canal de voz temporário é chamado de dono.
O dono pode gerenciar o canal com os comandos de barra do Astro ou com as [interfaces](/guides/interface), ambos permitem mudar o nome do canal, o limite de usuários, as permissões e todo o resto.

Quando o dono sai, se houver outros usuários _que não são bots_ no canal, a posse será transferida aleatoriamente para outro usuário.  
Quando o dono sai e não há mais usuários no canal, ele será excluído.

Os geradores são extremamente personalizáveis, e neste guia você vai aprender a configurá-los para que se encaixem perfeitamente nas necessidades do seu servidor!

## Criando e gerenciando geradores

O Astro pode gerenciar vários geradores e cada um tem suas próprias configurações.  
Na seção de geradores do painel você poderá ver todos os geradores do seu servidor, criar novos, gerenciá-los e excluí-los.

_Lembre-se de que, sem o [Ultimate](/ultimate), você pode ter no máximo 2 geradores._

## Configurações de nome

Um canal de voz temporário pode estar em três estados diferentes: padrão, bloqueado ou oculto.  
Esses estados são alternados pelos usuários por comandos de barra ou pela interface.

Você pode definir um nome para cada estado:
![configurações de nome do gerador](/guides/generator_name.png "Configurações de nome do gerador")

### Variáveis

Você pode usar `Variáveis` para tornar o nome do canal dinâmico. O Astro substituirá as variáveis pelo valor adequado ao aplicar o novo nome:

#### Variáveis do dono do canal de voz

| Variável     | Descrição                                              |
| ------------ | ------------------------------------------------------ |
| `{nickname}` | O apelido (ou o nome de usuário, se não tiver) do dono |
| `{username}` | O nome de usuário do dono                              |
| `{mention}`  | A menção (@nome) do dono                               |
| `{id}`       | O ID do dono                                           |

#### Variáveis de atividade do dono do canal de voz · [requer Ultimate](/ultimate)

| Variável                | Descrição                                                                     |
| ----------------------- | ----------------------------------------------------------------------------- |
| `{activity_name}`       | O nome da atividade do dono (o nome do jogo, por exemplo)                     |
| `{activity_emoji}`      | Um emoji que representa a atividade                                           |
| `{activity_start_time}` | A hora em que o dono começou a atividade                                      |
| `{activity_end_time}`   | A hora em que a atividade terminará ou terminou                               |
| `{activity_type}`       | O tipo da atividade (jogando, assistindo, ouvindo, etc.)                      |
| `{activity_link}`       | O link da transmissão da Twitch, se a atividade for uma transmissão da Twitch |

#### Variáveis do canal de voz

| Variável         | Descrição                                  |
| ---------------- | ------------------------------------------ |
| `{vc_name}`      | The name of the vc                         |
| `{vc_bitrate}`   | O bitrate do canal de voz                  |
| `{vc_userlimit}` | O limite de usuários do canal de voz       |
| `{vc_users}`     | A quantidade de usuários no canal de voz   |
| `{vc_id}`        | O ID do canal de voz                       |
| `{vc_mention}`   | O canal de voz como menção (#canal-de-voz) |

#### Variáveis de valores incrementais · [requer Ultimate](/ultimate)

| Variável  | Descrição                                            |
| --------- | ---------------------------------------------------- |
| `{n}`     | Um simples número incremental (1, 2, 3...)           |
| `{nato}`  | Alfabeto OTAN incremental (Alpha, Bravo, Charlie...) |
| `{roman}` | Números romanos incrementais (I, II, III, IV...)     |

**Como funcionam os números incrementais?**  
Considerando a nova limitação do Discord, que permite mudar o nome de um canal de voz apenas 2 vezes a cada 10 minutos, esse recurso funciona de um jeito um pouco diferente do que você poderia esperar:  
Os canais de voz serão gerados de forma incremental: o bot encontrará o primeiro canal de voz ausente e colocará o novo canal de voz no lugar dele.

Exemplo: temos 5 canais de voz gerados incrementalmente pelo Astro [VC #1, VC#2, VC #3, VC #4 e VC#5]; agora vamos supor que o VC #3 seja excluído. O que o Astro não fará é renomear cada canal para o nome certo (VC#4 para VC #3 e assim por diante); em vez disso, na próxima vez que um canal for criado, ele não será VC #6, mas VC #3, para que a lacuna seja preenchida.

Se você perceber que os números estão começando do número errado, pode clicar no botão `Limpar cache` no painel para redefinir a contagem
![limpar cache](/guides/clear_cache.png "Limpar cache")

### Condições de atualização do nome

Você também pode configurar quando o nome de um canal deve ser atualizado:
![condições de atualização do nome do gerador](/guides/generator_name_conditions.png "Condições de atualização do nome do gerador")

### Limitações da atualização do nome

O nome de um canal de voz do Discord só pode ser mudado 2 vezes a cada 10 minutos; o Discord introduziu essa limitação há algum tempo, infelizmente.
Por causa disso, os nomes dos canais de voz podem nem sempre ser precisos se ocorrerem mudanças frequentes.

## Configurações básicas

No painel você também encontrará as opções para mudar:

- a categoria em que os canais de voz temporários são gerados
- o limite de usuários
- o bitrate
- a posição: se o canal de voz temporário deve ser criado logo antes do gerador, logo depois ou no final da categoria
- para mudar a região, você pode mudar diretamente no Discord a região do canal do gerador
- o status padrão do canal de voz: o pequeno texto exibido abaixo do nome de um canal de voz, que os donos podem mudar a qualquer momento com o comando `/status`

## Configurações de permissões

### Herança de permissões

Por padrão, os canais de voz temporários herdam as permissões do gerador.  
Você pode mudar esse comportamento no painel: pode fazer os canais copiarem as permissões da categoria ou não copiarem nenhuma permissão.

### Target role

O cargo alvo é uma das configurações mais importantes. Quando as permissões do canal precisam ser modificadas, por exemplo quando ele é bloqueado ou ocultado, o Astro modificará as permissões do cargo alvo para chegar ao estado desejado.  
Por exemplo, se no seu servidor os usuários precisam concluir um processo de verificação e receber um cargo `Verificado`, provavelmente você vai querer defini-lo como cargo alvo.

### Moderator role

Se você definir um cargo de moderador, ele sempre terá as permissões necessárias para gerenciar o canal, mesmo quando estiver bloqueado ou oculto.

### Estado padrão

Você pode decidir se os canais de voz temporários devem ser gerados bloqueados ou ocultos por padrão.

## Configurações de comandos

Você pode impor algumas limitações aos comandos dos usuários, como se eles podem usar palavrões no nome do canal de voz (só funciona em inglês), e definir valores mínimos e máximos que os usuários podem usar para o limite de usuários e o bitrate.

## Utilitários

### Owner role

Se definido, o Astro atribuirá esse cargo aos donos de canais de voz temporários e o removerá quando eles saírem do canal ou quando a posse for transferida.

### Modo fila

Com o modo fila ativado, o Astro tentará preencher os canais existentes antes de criar novos.  
É um recurso útil quando os canais têm limite de usuários e você precisa garantir que todos fiquem cheios com o número máximo de usuários.

### Fallback generator

Quando a categoria do gerador enche (chega a 50 canais), os usuários que entrarem no gerador serão movidos para o gerador de reserva, se definido.

## Salas de espera

Uma sala de espera é simplesmente um canal de voz criado perto de um canal de voz temporário.  
Os usuários podem entrar na sala de espera para indicar que estão esperando para entrar no canal de voz temporário, e o dono dele pode arrastar usuários da sala de espera para o seu canal.

No painel você pode escolher se o Astro deve criar automaticamente uma sala de espera para cada canal de voz temporário e configurar todos os aspectos dela: nome (também pode usar variáveis), limite de usuários, bitrate etc.

Os usuários também podem criar uma sala de espera com o comando de barra ou o botão de interface correspondente.

## Chats de texto privados

Um chat de texto privado, por outro lado, é um canal de texto visível apenas para os usuários dentro de um canal de voz temporário.  
Você pode configurar no painel se o Astro deve criar um chat de texto privado para cada canal de voz temporário, junto com suas configurações, como nas salas de espera.

Os usuários também podem criar um chat de texto privado com o comando de barra ou o botão de interface correspondente.

### Mensagem de criação

Você também pode definir uma mensagem que o Astro envia nos canais de voz temporários quando são criados.  
A mensagem será enviada no chat de texto privado, se existir; caso contrário, no chat do canal de voz (sim, é confuso, mas agora os canais de voz também têm um chat de texto integrado).

Você pode escolher se a mensagem deve ser um embed ou uma simples mensagem de texto.

Como alternativa, você pode fazer o Astro enviar uma [interface](/guides/interface) no chat de texto!
