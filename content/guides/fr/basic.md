---
title: Les bases
description: Découvre les bases pour bien démarrer avec Astro
---

## Que peut faire Astro ?

Astro se concentre exclusivement sur l'aspect vocal de Discord et l'améliore grâce à des fonctionnalités uniques et avancées.

La fonctionnalité principale, ce sont les salons vocaux temporaires.  
Un salon vocal temporaire est créé par ce qu'on appelle des générateurs (créés et gérés par Astro). Quand un utilisateur rejoint un générateur, Astro crée un salon vocal temporaire pour lui et l'y déplace. Dès que le salon vocal temporaire est vide, Astro le supprime automatiquement.  
Comme ça, pas de salons vocaux vides qui traînent sur ton serveur !

En complément, Astro propose des moyens pour que les utilisateurs gèrent leurs salons vocaux temporaires : renommer le salon, changer la limite d'utilisateurs, verrouiller / masquer le salon et bien plus. Cela se fait soit avec des commandes slash, soit avec les interfaces d'Astro. Une interface est simplement un message avec des boutons créé par Astro, qui permet aux utilisateurs d'effectuer rapidement des actions sur leur salon vocal.

Astro permet aussi de regrouper plusieurs paramètres et de les appliquer d'un seul coup à un salon vocal temporaire : les modèles. Par exemple, si tu as un serveur de jeux où les utilisateurs jouent à plein de jeux différents, tu peux créer un modèle par jeu avec son propre nom, sa propre limite d'utilisateurs, etc.

Une autre fonctionnalité extrêmement utile : les rôles vocaux. Avec les rôles vocaux, tu peux t'assurer que les utilisateurs reçoivent un rôle précis quand ils sont dans un salon vocal précis. C'est une fonctionnalité vraiment puissante qui ouvre de nombreux scénarios.

Tu peux en savoir plus sur toutes ces fonctionnalités dans leur [guide](/guides) respectif.  
Ici, on va voir les bases pour bien démarrer avec Astro sur ton serveur !

## Inviter le bot

Première chose : invite le bot sur ton serveur. Pour cela, clique simplement sur [ce lien](/invite) et sélectionne un serveur !  
Tu peux aussi aller sur le [tableau de bord](/guilds) : il te proposera automatiquement d'inviter Astro sur le serveur que tu veux gérer s'il n'y est pas encore.

## Configuration rapide

Tu ne veux pas tout configurer à la main ? Utilise la commande `/setup`, ou le bouton de configuration qu'Astro envoie quand il rejoint ton serveur.  
Astro créera une catégorie avec un générateur et une interface, pour que les salons vocaux temporaires fonctionnent tout de suite. Tu pourras ensuite changer le nom, la catégorie, la position et tout le reste depuis le [tableau de bord](/guilds).

## Prérequis du serveur

Pour utiliser Astro sur ton serveur, tu dois remplir ces conditions :

- avoir moins de 50 bots (limite imposée par Discord)
- avoir au moins la permission `Gérer les salons`

## Permissions du bot

Astro demande par défaut la permission `Administrateur` pour fonctionner et garantir une bonne expérience aux utilisateurs Discord lambda.

Si tu gères un serveur professionnel et que tu ne peux pas donner cette permission à Astro pour des raisons de sécurité, tu peux désactiver cette exigence avec l'interrupteur prévu dans le tableau de bord
![interrupteur de la permission administrateur](/guides/admin_permissions.png 'Interrupteur de la permission administrateur')
_Tu peux demander des conseils sur le serveur d'assistance concernant les permissions dont Astro a besoin pour fonctionner, mais aucune assistance approfondie n'est fournie à ce sujet._

## Permissions des commandes

N'oublie pas que tu peux toujours configurer qui a accès aux commandes slash d'Astro grâce aux permissions des commandes slash de Discord.  
[En savoir plus ici](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ).

## Langue du serveur

Tu peux changer la langue de ton serveur depuis les paramètres du tableau de bord, tous les messages que le bot y envoie la suivront.

## Profil du bot

Tu veux qu'Astro ressemble davantage à un membre de ton serveur ? Depuis le tableau de bord, tu peux lui donner un pseudo, un avatar, une bannière et une bio personnalisés, uniquement pour ton serveur.

## Erreurs et problèmes

Astro signale tous les problèmes et erreurs qu'il rencontre en fonctionnant sur ton serveur.  
Chaque fois que quelque chose ne marche pas tout à fait comme prévu, pense à consulter la section des erreurs du tableau de bord !

## Ultimate

Ultimate est la version premium d'Astro. Elle offre de nombreuses fonctionnalités avancées utiles et supprime toutes les limitations :

| Fonctionnalité                                      |                      Premium                      |                          Gratuit                           |
| --------------------------------------------------- | :-----------------------------------------------: | :--------------------------------------------------------: |
| Générateurs de salons vocaux temporaires illimités  | <span class="text-discord-green text-lg">✓</span> |                         Maximum 2                          |
| Interfaces illimitées                               | <span class="text-discord-green text-lg">✓</span> |                         Maximum 1                          |
| Rôles vocaux illimités                              | <span class="text-discord-green text-lg">✓</span> |                         Maximum 1                          |
| Modèles illimités                                   | <span class="text-discord-green text-lg">✓</span> |                         Maximum 3                          |
| Noms de salons vocaux numérotés                     | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Interfaces personnalisables                         | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Filtre de gros mots pour les noms de salons vocaux  | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Salles d'attente                                    | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Salons textuels privés                              | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Rôle vocal pour les propriétaires de salons         | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Messages personnalisés à la création du salon vocal | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |
| Générateurs de secours                              | <span class="text-discord-green text-lg">✓</span> | <span class="text-foreground-destructive text-lg">✗</span> |

### Passer ton serveur à Ultimate

Une fois que tu as acheté un abonnement sur la [page Ultimate](/ultimate) ou via la [boutique d'applications Discord](https://discord.com/application-directory/715621848489918495/premium), tu peux faire passer ton serveur à Ultimate avec le bouton prévu dans le tableau de bord
![amélioration Ultimate](/guides/ultimate.png 'Amélioration Ultimate')

### Gérer ton abonnement

Tu peux consulter, gérer et annuler tes abonnements Ultimate depuis le [portail de facturation](/billing).  
Si tu as acheté Ultimate via la boutique d'applications Discord, consulte [ce guide](https://support.discord.com/hc/en-us/articles/9359445233303-Premium-App-FAQ#h_01HW8TY8QFZKNGT5SSSNEGWEEJ).

## Assistance

N'hésite pas à rejoindre le [serveur d'assistance / communauté](/support) si tu as la moindre question !
