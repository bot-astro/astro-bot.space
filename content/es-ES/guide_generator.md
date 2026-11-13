---
title: Generadores
description: Aprende a configurar y usar los generadores de canales de voz temporales
---

## ¿Qué es un generador?

Los generadores son canales creados y gestionados por Astro.  
Cuando un usuario entra en un generador, Astro crea un canal de voz temporal y mueve al usuario a él.

El usuario que crea el canal de voz temporal se llama propietario.
El propietario puede gestionar el canal con los comandos de barra de Astro o con las [interfaces](/guides/interface), ambos permiten cambiar el nombre del canal, el límite de usuarios, los permisos y todo lo demás.

Cuando el propietario sale, si hay otros usuarios _que no son bots_ en el canal, la propiedad se transfiere aleatoriamente a otro usuario.  
Cuando el propietario sale y ya no quedan usuarios en el canal, este se elimina.

Los generadores son extremadamente personalizables, en esta guía aprenderás a configurarlos para que se adapten perfectamente a las necesidades de tu servidor.

## Crear y gestionar generadores

Astro puede gestionar varios generadores y cada uno tiene sus propios ajustes.  
En la sección de generadores del panel podrás ver todos los generadores de tu servidor, crear nuevos, gestionarlos y eliminarlos.

_Recuerda que sin [Ultimate](/ultimate) puedes tener un máximo de 2 generadores._

## Ajustes del nombre

Un canal de voz temporal puede estar en tres estados distintos: por defecto, bloqueado u oculto.  
Los usuarios activan estos estados con comandos de barra o con la interfaz.

Puedes indicar un nombre para cada estado:
![ajustes del nombre del generador](/guides/generator_name.png 'Ajustes del nombre del generador')

### Variables

Puedes usar `Variables` para hacer dinámico el nombre del canal. Astro sustituirá las variables por el valor adecuado al aplicar el nuevo nombre:

#### Variables del propietario del canal de voz

| Variable     | Descripción                                                   |
| ------------ | ------------------------------------------------------------- |
| `{nickname}` | El apodo (o el nombre de usuario si no tiene) del propietario |
| `{username}` | El nombre de usuario del propietario                          |
| `{mention}`  | La mención (@nombre) del propietario                          |
| `{id}`       | El ID del propietario                                         |

#### Variables de actividad del propietario del canal de voz · [requiere Ultimate](/ultimate)

| Variable                | Descripción                                                                  |
| ----------------------- | ---------------------------------------------------------------------------- |
| `{activity_name}`       | El nombre de la actividad del propietario (por ejemplo, el nombre del juego) |
| `{activity_emoji}`      | Un emoji que representa la actividad                                         |
| `{activity_start_time}` | La hora a la que el propietario empezó la actividad                          |
| `{activity_end_time}`   | La hora a la que terminará o terminó la actividad                            |
| `{activity_type}`       | El tipo de actividad (jugando, viendo, escuchando, etc.)                     |
| `{activity_link}`       | El enlace del directo de Twitch si la actividad es un directo de Twitch      |

#### Variables del canal de voz

| Variable         | Descripción                                  |
| ---------------- | -------------------------------------------- |
| `{vc_name}`      | El nombre del canal de voz                   |
| `{vc_bitrate}`   | El bitrate del canal de voz                  |
| `{vc_userlimit}` | El límite de usuarios del canal de voz       |
| `{vc_users}`     | La cantidad de usuarios en el canal de voz   |
| `{vc_id}`        | El ID del canal de voz                       |
| `{vc_mention}`   | El canal de voz como mención (#canal-de-voz) |

#### Variables de valores incrementales · [requiere Ultimate](/ultimate)

| Variable  | Descripción                                          |
| --------- | ---------------------------------------------------- |
| `{n}`     | Un simple número incremental (1, 2, 3...)            |
| `{nato}`  | Alfabeto OTAN incremental (Alpha, Bravo, Charlie...) |
| `{roman}` | Números romanos incrementales (I, II, III, IV...)    |

**¿Cómo funcionan los números incrementales?**  
Debido a la nueva limitación de Discord, que solo permite cambiar el nombre de un canal de voz 2 veces cada 10 minutos, esta función funciona de forma algo distinta a lo que podrías esperar:  
Los canales de voz se generarán de forma incremental: el bot encontrará el primer canal de voz que falte y pondrá el nuevo canal de voz en su lugar.

Ejemplo: tenemos 5 canales de voz generados por Astro de forma incremental [VC #1, VC#2, VC #3, VC #4 y VC#5], ahora supongamos que se elimina VC #3. Lo que Astro no hará es renombrar cada canal con el nombre adecuado (es decir, VC#4 a VC #3 y así sucesivamente), sino que la próxima vez que se cree un canal no será VC #6 sino VC #3, de modo que se rellene el hueco.

Si ves que los números empiezan por un número equivocado, puedes pulsar el botón `Vaciar caché` del panel para reiniciar la cuenta
![vaciar caché](/guides/clear_cache.png 'Vaciar caché')

### Condiciones de actualización del nombre

También puedes configurar cuándo debe actualizarse el nombre de un canal:
![condiciones de actualización del nombre del generador](/guides/generator_name_conditions.png 'Condiciones de actualización del nombre del generador')

### Limitaciones de la actualización del nombre

El nombre de un canal de voz de Discord solo se puede cambiar 2 veces cada 10 minutos, Discord introdujo esta limitación hace tiempo, por desgracia.
Por eso, los nombres de los canales de voz pueden no ser siempre precisos si se producen cambios frecuentes.

## Ajustes básicos

En el panel también encontrarás las opciones para cambiar:

- la categoría en la que se generan los canales de voz temporales
- el límite de usuarios
- el bitrate
- la posición: si el canal de voz temporal debe crearse justo antes del generador, justo después o al final de la categoría
- para cambiar la región puedes cambiar directamente en Discord la región del canal del generador
- el estado por defecto del canal de voz: el pequeño texto que se muestra bajo el nombre de un canal de voz, los propietarios pueden cambiarlo en cualquier momento con el comando `/status`

## Ajustes de permisos

### Herencia de permisos

Por defecto, los canales de voz temporales heredan los permisos del generador.  
Puedes cambiar este comportamiento en el panel: puedes hacer que los canales copien los permisos de la categoría en su lugar o que no copien ningún permiso.

### Rol objetivo

El rol objetivo es uno de los ajustes más importantes. Cuando hay que modificar los permisos del canal, por ejemplo cuando se bloquea u oculta, Astro modificará los permisos del rol objetivo para lograr el estado deseado.  
Por ejemplo, si en tu servidor los usuarios deben completar un proceso de verificación y obtener un rol `Verificado`, probablemente querrás establecerlo como rol objetivo.

### Rol de moderador

Si indicas un rol de moderador, siempre tendrá los permisos necesarios para gestionar el canal, incluso cuando esté bloqueado u oculto.

### Estado por defecto

Puedes decidir si los canales de voz temporales deben generarse bloqueados u ocultos por defecto.

## Ajustes de comandos

Puedes poner algunas limitaciones a los comandos de los usuarios, como si pueden usar palabrotas en el nombre de su canal de voz (solo funciona en inglés), y establecer valores mínimos y máximos que los usuarios pueden usar para el límite de usuarios y el bitrate.

## Utilidades

### Rol del propietario

Si lo indicas, Astro asignará este rol a los propietarios de canales de voz temporales y se lo quitará cuando abandonen el canal o cuando se transfiera la propiedad.

### Modo cola

Con el modo cola activado, Astro intentará llenar los canales existentes antes de crear otros nuevos.  
Es útil cuando los canales tienen un límite de usuarios y necesitas asegurarte de que todos se llenen con el máximo de usuarios.

### Generador de respaldo

Cuando la categoría del generador se llena (llega a 50 canales), los usuarios que entren en el generador serán movidos al generador de respaldo si está establecido.

## Salas de espera

Una sala de espera es simplemente un canal de voz que se crea junto a un canal de voz temporal.  
Los usuarios pueden entrar en la sala de espera para indicar que están esperando para entrar en el canal de voz temporal, y su propietario puede arrastrar usuarios desde la sala de espera a su canal.

En el panel puedes elegir si Astro debe crear automáticamente una sala de espera para cada canal de voz temporal y configurar todos sus aspectos: nombre (aquí también se pueden usar variables), límite de usuarios, bitrate, etc.

Los usuarios también pueden crear una sala de espera con el comando de barra o el botón de interfaz correspondiente.

## Chats de texto privados

Un chat de texto privado, en cambio, es un canal de texto que solo es visible para los usuarios dentro de un canal de voz temporal.  
Puedes configurar en el panel si Astro debe crear un chat de texto privado para cada canal de voz temporal, junto con sus ajustes, como en las salas de espera.

Los usuarios también pueden crear un chat de texto privado con el comando de barra o el botón de interfaz correspondiente.

### Mensaje de creación

También puedes indicar un mensaje que Astro envía a los canales de voz temporales al crearse.  
El mensaje se enviará al chat de texto privado si existe, y si no, al chat del canal de voz (sí, es confuso, pero ahora los canales de voz también tienen un chat de texto integrado).

Puedes elegir si el mensaje debe ser un embed o un simple mensaje de texto.

¡Alternativamente, puedes hacer que Astro envíe una [interfaz](/guides/interface) al chat de texto!
