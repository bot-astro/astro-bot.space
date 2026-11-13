---
title: Roles de voz
description: Aprende a configurar los roles de voz para que tu servidor luzca aún mejor
---

## ¿Qué es un rol de voz?

Los roles de voz (antes llamados conexiones) permiten conectar canales de voz con roles.  
Permiten que los usuarios obtengan un rol mientras están dentro de un canal de voz concreto, y Astro se lo quitará cuando abandonen ese canal.

En este ejemplo, se crea un rol de voz en la categoría. El usuario recibe un rol que le permite ver varios canales relacionados con esa categoría:
![ejemplo de rol de voz](/illustration/voice_role.gif 'Ejemplo de rol de voz')

## Crear y gestionar roles de voz

Puedes crear, gestionar y eliminar roles de voz en el panel.

_Recuerda que sin [Ultimate](/ultimate) solo puedes tener 1 rol de voz._

## Ajuste del canal

Cuando creas o editas un rol de voz, debes seleccionar un canal para él.  
El canal puede ser:

- un canal de voz normal (incluye los canales de escenario)
- una categoría: cada canal de voz dentro de ella activará el rol de voz
- un generador: cada canal de voz temporal creado por ese generador activará el rol de voz

## Ajuste de la acción

Puedes elegir entre tres acciones distintas:

- `Asignar`: Astro asigna el rol al usuario cuando entra en el canal y se lo quita cuando el usuario sale
- `Quitar`: quita el rol cuando el usuario entra en el canal y se lo devuelve cuando el usuario sale
- `Alternar`: si el usuario no tiene el rol antes de entrar en el canal, se comportará como `Asignar`, y en caso contrario como `Quitar` (básicamente alterna el rol, como indica su nombre)
