---
title: Plantillas
description: Descubre las plantillas y aprende a configurarlas, a tus usuarios les encantarán
---

## ¿Qué es una plantilla?

Las plantillas agrupan un conjunto de ajustes de canal de voz que se pueden aplicar de una sola vez a canales de voz temporales.

Esto es útil, por ejemplo, en servidores de juegos donde los usuarios pueden jugar a muchos juegos distintos.  
Tener una plantilla para cada juego permite adaptar el canal de voz a ese juego, por ejemplo con un nombre o un límite de usuarios concretos.

## Usar plantillas

Los usuarios de tu servidor pueden usar plantillas con `/template`, que ofrece autocompletado de las plantillas disponibles, o con el botón de interfaz correspondiente.

## Crear y gestionar plantillas

Puedes crear, gestionar y eliminar plantillas en el [panel](/guilds).

_Recuerda que sin [Ultimate](/ultimate) puedes tener un máximo de 3 plantillas._

## Nombre de la plantilla

El nombre de una plantilla es simplemente un nombre útil para que los usuarios identifiquen una plantilla.  
**No es** el nombre que recibe el canal de voz temporal cuando se aplica la plantilla.

Cuando un usuario quiere aplicar una plantilla a su canal, solo verá una lista de plantillas en la que cada una tiene su propio nombre.

## Ajustes del canal de voz

En el panel puedes configurar los ajustes que se aplican al canal de voz temporal cuando se usa una plantilla.

Puedes elegir:

- el nombre del canal de voz, que admite [variables](/guides/generator#variables)
- el límite de usuarios
- el bitrate
- la región

_Ninguno de estos ajustes es obligatorio, así que no necesitas establecerlos todos._

## Generadores habilitados

Si quieres restringir una plantilla a algunos generadores concretos, puedes hacerlo en el panel.  
En ese caso, la plantilla no podrá usarse en ningún canal de voz temporal creado por un generador que no esté en la lista `Generadores habilitados`.
