---
title: Interfaces
description: Aprende con esta guía a hacer que tu interfaz se vea increíble y única
---

## ¿Qué es una interfaz?

Una interfaz es un mensaje que permite a los usuarios gestionar rápidamente su canal de voz temporal con simples botones.  
Así se ve la interfaz por defecto:
![interfaz por defecto](/guides/default_interface.png "Interfaz por defecto")

## Crear una interfaz

Puedes crear una nueva interfaz en el panel, en la sección de interfaces.  
Te pedirá un canal y podrás elegir el que quieras.

## Cambiar de canal o reenviar una interfaz

Si borraste por error el mensaje de una interfaz o simplemente quieres cambiar de canal, puedes hacerlo desde los ajustes de la interfaz en el panel.

## Personalizar una interfaz

Puedes personalizar cada interfaz en el panel: abre la sección de interfaces, elige una interfaz y haz clic en gestionar.  
Cuando termines, guarda los cambios y Astro actualizará el mensaje al instante.

_Recuerda que sin [Ultimate](/ultimate) solo puedes desactivar o activar los botones de una interfaz, todo lo demás lo requiere._

### Ajustes del mensaje

El mensaje se divide en tres partes, cada una con sus propios ajustes:

- `Encabezado`: el nombre del autor, el enlace del autor y la imagen del autor
- `Cuerpo`: el título, el enlace del título, la miniatura, la descripción y la imagen
- `Pie de página`: el texto del pie de página, la imagen del pie de página, el color de la línea a la izquierda del mensaje y una marca de tiempo

Todos los ajustes son opcionales, si dejas un texto vacío simplemente no se mostrará.  
La imagen del autor y la imagen tienen un valor por defecto, puedes recuperarlo con el botón `Restablecer valor por defecto`.

### Imágenes

Las imágenes se eligen del almacenamiento multimedia de tu servidor. Haz clic en `Elegir imagen` para abrirlo, desde ahí puedes:

- subir una nueva imagen
- previsualizar las imágenes que ya subiste
- seleccionar una imagen para el ajuste que estás editando
- eliminar las imágenes que ya no necesites

_Eliminar una imagen también la quita de los ajustes de la interfaz que estás editando, las demás interfaces que la usen mostrarán una imagen rota hasta que la cambies._

Las imágenes que no usa ninguna interfaz se limpian automáticamente de vez en cuando.

### Emojis personalizados

Los emojis se pueden usar en los textos del mensaje y en los botones. Los emojis estándar se pueden pegar sin más, los emojis personalizados de Discord necesitan su código:

1. Ve a Discord y escribe el emoji precedido de una barra invertida, por ejemplo `\:nombre:`
2. Envía el mensaje, Discord enviará el código del emoji, como `<:nombre:id>` (o `<a:nombre:id>` para emojis animados)
3. Copia ese código y pégalo en el panel

## Botones

Una interfaz puede tener hasta 5 filas con 5 botones cada una, el panel los muestra como una cuadrícula.  
Haz clic en un botón para editarlo, o en una posición vacía para añadir uno nuevo.

Cada botón tiene estos ajustes:

- `Botón`: qué botón se muestra en esta posición. Un botón solo se puede usar una vez por interfaz, así que los que ya están colocados en otro sitio no se pueden seleccionar. Elige `Sin botón` para quitarlo
- `Deshabilitado`: los usuarios ven el botón pero no pueden hacer clic en él
- `Nombre`: el texto que se muestra en el botón
- `Emoji`: el emoji que se muestra en el botón
- `Estilo`: el color del botón

Un botón necesita al menos un nombre o un emoji para mostrarse.

## Eliminar una interfaz

Puedes eliminar una interfaz en cualquier momento desde el panel.

### Ejemplo de interfaz personalizada

La imagen de abajo es un ejemplo de interfaz personalizada:
![interfaz personalizada](/illustration/custom_interface.png "Interfaz personalizada")
