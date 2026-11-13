---
title: Lo básico
description: Empieza a usar Astro aprendiendo lo básico
---

## ¿Qué puede hacer Astro?

Astro se centra exclusivamente en el aspecto de voz de Discord y lo mejora con algunas funciones únicas y avanzadas.

La función principal son los canales de voz temporales.  
Un canal de voz temporal lo crean los llamados generadores (que crea y gestiona Astro). Cuando un usuario entra en un generador, Astro crea un canal de voz temporal para el usuario y lo mueve a él. Cuando el canal de voz temporal se queda vacío, Astro lo elimina automáticamente.  
¡Así no tendrás un montón de canales de voz vacíos por tu servidor!

Como complemento, Astro ofrece formas de que los usuarios gestionen sus canales de voz temporales, como renombrar el canal, cambiar el límite de usuarios, bloquear / ocultar el canal y mucho más. Esto se puede hacer con comandos de barra o con las interfaces de Astro. Una interfaz es simplemente un mensaje con botones creado por Astro que permite a los usuarios realizar acciones rápidas en su canal de voz.

Además, Astro permite agrupar varios ajustes y aplicarlos todos a la vez a un canal de voz temporal: las plantillas. Por ejemplo, si tienes un servidor de juegos donde los usuarios juegan a muchos juegos distintos, puedes crear una plantilla para cada juego con su propio nombre, límite de usuarios, etc.

Otra función extremadamente útil son los roles de voz. Con los roles de voz puedes conseguir que los usuarios reciban un rol concreto mientras están dentro de un canal de voz concreto. Es una función muy potente que desbloquea muchos escenarios distintos.

Puedes leer más sobre todas estas funciones en su [guía](/guides) correspondiente.  
Aquí vamos a cubrir lo básico para empezar a usar Astro en tu servidor.

## Invitar al bot

Lo primero es invitar al bot a tu servidor. Para ello, haz clic en [este enlace](/invite) y selecciona un servidor.  
También puedes visitar el [panel](/guilds) y se te pedirá automáticamente que invites a Astro al servidor que quieras gestionar si todavía no está añadido.

## Configuración rápida

¿No quieres configurarlo todo a mano? Usa el comando `/setup`, o el botón de configuración que Astro envía cuando entra en tu servidor.  
Astro creará una categoría con un generador y una interfaz dentro, de modo que los canales de voz temporales funcionen enseguida. Después podrás cambiar el nombre, la categoría, la posición y todo lo demás desde el [panel](/guilds).

## Requisitos del servidor

Para poder usar Astro en tu servidor debes cumplir estos requisitos:

- tener menos de 50 bots (límite impuesto por Discord)
- tener al menos el permiso `Gestionar canales`

## Permisos del bot

Astro requiere el permiso `Administrador` por defecto para funcionar y garantizar una gran experiencia a los usuarios medios de Discord.

Si tienes un servidor profesional y no puedes dar ese permiso a Astro por motivos de seguridad, puedes desactivar este requisito con el interruptor correspondiente del panel
![interruptor del permiso de administrador](/guides/admin_permissions.png 'Interruptor del permiso de administrador')
_Puedes pedir orientación en el servidor de soporte sobre los permisos que Astro necesita para funcionar, pero no se ofrece soporte en profundidad sobre ello._

## Permisos de comandos

Recuerda que siempre puedes configurar quién tiene acceso a los comandos de barra de Astro mediante los permisos de comandos de barra de Discord.  
[Lee más sobre ello aquí](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ).

## Idioma del servidor

Puedes cambiar el idioma de tu servidor desde los ajustes del panel, todos los mensajes que el bot envíe allí lo seguirán.

## Perfil del bot

¿Quieres que Astro parezca un poco más parte de tu servidor? Desde el panel puedes darle un apodo, avatar, banner y biografía personalizados, solo para tu servidor.

## Errores y problemas

Astro informará de todos los problemas y errores que encuentre al funcionar en tu servidor.  
Siempre que notes que algo no funciona del todo bien, ¡recuerda revisar la sección de errores del panel!

## Ultimate

Ultimate es la versión premium de Astro y ofrece muchas funciones avanzadas útiles a la vez que elimina todas las limitaciones:

| Función                                             |                      Premium                      |                           Gratis                           |
| --------------------------------------------------- | :-----------------------------------------------: | :--------------------------------------------------------: |
| Generadores de canales de voz temporales ilimitados | <span class="text-discord-green text-lg">✓</span> |                          Máximo 2                          |
| Interfaces ilimitadas                               | <span class="text-discord-green text-lg">✓</span> |                          Máximo 1                          |
| Roles de voz ilimitados                             | <span class="text-discord-green text-lg">✓</span> |                          Máximo 1                          |
| Plantillas ilimitadas                               | <span class="text-discord-green text-lg">✓</span> |                          Máximo 3                          |
| Nombres numerados para los canales de voz           | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Interfaces personalizables                          | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Filtro de palabrotas para los nombres de canales    | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Salas de espera                                     | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Chats de texto privados                             | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Rol de voz para los propietarios de canales         | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Mensajes personalizados al crear el canal de voz    | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Generadores de respaldo                             | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |

### Mejorar tu servidor a Ultimate

Una vez que compres una suscripción en la [página de Ultimate](/ultimate) o a través de la [tienda de aplicaciones de Discord](https://discord.com/application-directory/715621848489918495/premium), puedes mejorar tu servidor con el botón correspondiente del panel
![mejora a ultimate](/guides/ultimate.png 'Mejora a Ultimate')

### Gestionar tu suscripción

Puedes ver, gestionar y cancelar tus suscripciones de Ultimate en el [portal de facturación](/billing).  
Si compraste Ultimate a través de la tienda de aplicaciones de Discord, consulta [esta guía](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ).

## Soporte

¡No dudes en unirte al [servidor de soporte / comunidad](/support) si tienes alguna pregunta!
