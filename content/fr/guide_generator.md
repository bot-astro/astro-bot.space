---
title: Générateurs
description: Apprends à configurer et utiliser les générateurs de salons vocaux temporaires
---

## Qu'est-ce qu'un générateur ?

Les générateurs sont des salons créés et gérés par Astro.  
Quand un utilisateur rejoint un générateur, Astro crée un salon vocal temporaire et y déplace l'utilisateur.

L'utilisateur qui crée le salon vocal temporaire s'appelle le propriétaire.
Le propriétaire peut gérer le salon avec les commandes slash d'Astro ou avec les [interfaces](/guides/interface) : les deux permettent de changer le nom du salon, la limite d'utilisateurs, les permissions et tout le reste.

Quand le propriétaire part, s'il reste d'autres utilisateurs _non-bots_ dans le salon, la propriété est transférée au hasard à un autre utilisateur.  
Quand le propriétaire part et qu'il n'y a plus personne dans le salon, celui-ci est supprimé.

Les générateurs sont extrêmement personnalisables : dans ce guide, tu vas apprendre à les configurer pour qu'ils correspondent parfaitement aux besoins de ton serveur !

## Créer et gérer des générateurs

Astro peut gérer plusieurs générateurs, chacun avec ses propres paramètres.  
Dans la section des générateurs du tableau de bord, tu peux voir tous les générateurs de ton serveur, en créer de nouveaux, les gérer et les supprimer.

_N'oublie pas que sans [Ultimate](/ultimate) tu peux avoir au maximum 2 générateurs._

## Paramètres du nom

Un salon vocal temporaire peut être dans trois états : par défaut, verrouillé ou masqué.  
Ces états sont activés par les utilisateurs via des commandes slash ou l'interface.

Tu peux définir un nom pour chaque état :
![paramètres du nom du générateur](/guides/generator_name.png 'Paramètres du nom du générateur')

### Variables

Tu peux utiliser des `Variables` pour rendre le nom du salon dynamique. Astro remplacera les variables par la valeur appropriée lors de l'application du nouveau nom :

#### Variables du propriétaire du salon vocal

| Variable     | Description                                                           |
| ------------ | --------------------------------------------------------------------- |
| `{nickname}` | Le pseudo (ou le nom d'utilisateur s'il n'y en a pas) du propriétaire |
| `{username}` | Le nom d'utilisateur du propriétaire                                  |
| `{mention}`  | La mention (@nom) du propriétaire                                     |
| `{id}`       | L'ID du propriétaire                                                  |

#### Variables d'activité du propriétaire du salon vocal · [nécessite Ultimate](/ultimate)

| Variable                | Description                                                      |
| ----------------------- | ---------------------------------------------------------------- |
| `{activity_name}`       | Le nom de l'activité du propriétaire (le nom du jeu par exemple) |
| `{activity_emoji}`      | Un emoji représentant l'activité                                 |
| `{activity_start_time}` | L'heure à laquelle le propriétaire a commencé l'activité         |
| `{activity_end_time}`   | L'heure à laquelle l'activité se terminera ou s'est terminée     |
| `{activity_type}`       | Le type d'activité (jouer, regarder, écouter, etc.)              |
| `{activity_link}`       | Le lien du stream Twitch si l'activité est un stream Twitch      |

#### Variables du salon vocal

| Variable         | Description                                         |
| ---------------- | --------------------------------------------------- |
| `{vc_name}`      | Le nom du salon vocal                               |
| `{vc_bitrate}`   | Le bitrate du salon vocal                           |
| `{vc_userlimit}` | La limite d'utilisateurs du salon vocal             |
| `{vc_users}`     | Le nombre d'utilisateurs dans le salon vocal        |
| `{vc_id}`        | L'ID du salon vocal                                 |
| `{vc_mention}`   | Le salon vocal sous forme de mention (#salon-vocal) |

#### Variables de valeurs incrémentales · [nécessite Ultimate](/ultimate)

| Variable  | Description                                          |
| --------- | ---------------------------------------------------- |
| `{n}`     | Un simple nombre incrémental (1, 2, 3...)            |
| `{nato}`  | Alphabet OTAN incrémental (Alpha, Bravo, Charlie...) |
| `{roman}` | Chiffres romains incrémentaux (I, II, III, IV...)    |

**Comment fonctionnent les nombres incrémentaux ?**  
À cause de la nouvelle limitation de Discord, qui ne permet de changer le nom d'un salon vocal que 2 fois toutes les 10 minutes, cette fonctionnalité fonctionne un peu différemment de ce à quoi tu pourrais t'attendre :  
Les salons vocaux sont générés de manière incrémentale : le bot trouve le premier salon vocal manquant et place le nouveau salon vocal à sa place.

Exemple : on a 5 salons vocaux générés par Astro de manière incrémentale [VC #1, VC#2, VC #3, VC #4 et VC#5]. Si VC #3 est supprimé, Astro ne renommera pas chaque salon pour avoir les bons noms (VC#4 en VC #3 et ainsi de suite). À la place, le prochain salon créé ne sera pas VC #6 mais VC #3, pour combler le trou.

Si tu vois que les numéros commencent au mauvais nombre, tu peux cliquer sur le bouton `Vider le cache` dans le tableau de bord pour réinitialiser le compte
![vider le cache](/guides/clear_cache.png 'Vider le cache')

### Conditions de mise à jour du nom

Tu peux aussi configurer quand le nom d'un salon doit être mis à jour :
![conditions de mise à jour du nom du générateur](/guides/generator_name_conditions.png 'Conditions de mise à jour du nom du générateur')

### Limitations de la mise à jour du nom

Le nom d'un salon vocal Discord ne peut être changé que 2 fois toutes les 10 minutes, Discord a malheureusement introduit cette limitation il y a un certain temps.
À cause de cela, les noms des salons vocaux peuvent ne pas toujours être précis si les changements sont fréquents.

## Paramètres de base

Dans le tableau de bord, tu trouveras aussi les options pour changer :

- la catégorie dans laquelle les salons vocaux temporaires sont générés
- la limite d'utilisateurs
- le bitrate
- la position : si le salon vocal temporaire doit être créé juste avant le générateur, juste après ou tout en bas de la catégorie
- pour changer la région, tu peux changer directement dans Discord la région du salon du générateur
- le statut par défaut du salon vocal : le petit texte affiché sous le nom d'un salon vocal, les propriétaires peuvent le changer à tout moment avec la commande `/status`

## Paramètres de permissions

### Héritage des permissions

Par défaut, les salons vocaux temporaires héritent des permissions du générateur.  
Tu peux changer ce comportement dans le tableau de bord : les salons peuvent copier les permissions de la catégorie à la place, ou ne copier aucune permission.

### Rôle cible

Le rôle cible est l'un des paramètres les plus importants. Quand les permissions du salon doivent être modifiées, par exemple quand il est verrouillé ou masqué, Astro modifie les permissions du rôle cible pour obtenir l'état voulu.  
Par exemple, si sur ton serveur les utilisateurs doivent passer par une vérification et obtenir un rôle `Vérifié`, tu voudras probablement le définir comme rôle cible.

### Rôle de modérateur

Si tu indiques un rôle de modérateur, il aura toujours les permissions nécessaires pour gérer le salon, même quand il est verrouillé ou masqué.

### État par défaut

Tu peux décider si les salons vocaux temporaires doivent être générés verrouillés ou masqués par défaut.

## Paramètres des commandes

Tu peux poser quelques limites sur les commandes des utilisateurs, par exemple s'ils peuvent utiliser des gros mots dans le nom de leur salon vocal (ne fonctionne qu'en anglais), et fournir des valeurs minimales et maximales que les utilisateurs peuvent utiliser pour la limite d'utilisateurs et le bitrate.

## Utilitaires

### Rôle du propriétaire

Si tu en fournis un, Astro attribuera ce rôle aux propriétaires de salons vocaux temporaires et le retirera quand ils quittent le salon ou quand la propriété est transférée.

### Mode file d'attente

Avec le mode file d'attente activé, Astro essaiera de remplir les salons existants avant d'en créer de nouveaux.  
Pratique quand les salons ont une limite d'utilisateurs et que tu veux t'assurer qu'ils sont tous remplis au maximum.

### Générateur de secours

Quand la catégorie du générateur est pleine (50 salons atteints), les utilisateurs qui rejoignent le générateur sont déplacés vers le générateur de secours s'il est défini.

## Salles d'attente

Une salle d'attente est simplement un salon vocal créé à côté d'un salon vocal temporaire.  
Les utilisateurs peuvent rejoindre la salle d'attente pour indiquer qu'ils attendent d'entrer dans le salon vocal temporaire, et son propriétaire peut glisser des utilisateurs de la salle d'attente vers son salon.

Dans le tableau de bord, tu peux choisir si Astro doit créer automatiquement une salle d'attente pour chaque salon vocal temporaire et configurer tous ses aspects : nom (les variables sont aussi utilisables ici), limite d'utilisateurs, bitrate, etc.

Les utilisateurs peuvent aussi créer une salle d'attente avec la commande slash ou le bouton d'interface prévus.

## Salons textuels privés

Un salon textuel privé est un salon de texte visible uniquement par les utilisateurs présents dans un salon vocal temporaire.  
Dans le tableau de bord, tu peux configurer si Astro doit créer un salon textuel privé pour chaque salon vocal temporaire, ainsi que ses paramètres, comme pour les salles d'attente.

Les utilisateurs peuvent aussi créer un salon textuel privé avec la commande slash ou le bouton d'interface prévus.

### Message de création

Tu peux aussi fournir un message qu'Astro envoie dans les salons vocaux temporaires à leur création.  
Le message sera envoyé dans le salon textuel privé s'il existe, sinon dans le chat du salon vocal (oui, c'est déroutant, mais les salons vocaux ont maintenant aussi un chat textuel intégré).

Tu peux choisir si le message doit être un embed ou un simple message texte.

Tu peux aussi faire envoyer à Astro une [interface](/guides/interface) dans le salon textuel !
