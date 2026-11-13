---
title: Rôles vocaux
description: Apprends à configurer les rôles vocaux pour donner encore plus de style à ton serveur
---

## Qu'est-ce qu'un rôle vocal

Les rôles vocaux (appelés auparavant connexions) permettent de relier des salons vocaux à des rôles.  
Ils permettent aux utilisateurs d'obtenir un rôle tant qu'ils sont dans un salon vocal précis, et Astro le leur retire quand ils quittent ce salon.

Dans cet exemple, un rôle vocal est créé sur la catégorie. L'utilisateur reçoit un rôle qui lui permet de voir plusieurs salons liés à cette catégorie :
![exemple de rôle vocal](/illustration/voice_role.gif "Exemple de rôle vocal")

## Créer et gérer des rôles vocaux

Tu peux créer, gérer et supprimer des rôles vocaux dans le tableau de bord.

_N'oublie pas que sans [Ultimate](/ultimate) tu ne peux avoir qu'un seul rôle vocal._

## Channel setting

Quand tu crées ou modifies un rôle vocal, tu dois sélectionner un salon pour celui-ci.  
Le salon peut être :

- un salon vocal normal (y compris les salons de conférence)
- une catégorie : chaque salon vocal à l'intérieur déclenchera le rôle vocal
- un générateur : chaque salon vocal temporaire créé par ce générateur déclenchera le rôle vocal

## Paramètre de l'action

Tu peux choisir entre trois actions différentes :

- `Attribuer` : Astro attribue le rôle à l'utilisateur quand il rejoint le salon et le retire quand l'utilisateur part
- `Retirer` : retire le rôle quand l'utilisateur rejoint le salon et le lui rend quand l'utilisateur part
- `Toggle`: if the user doesn't have the role before joining the channel, it will behave like `Assign`, otherwise like `Remove` (basically toggles the role as the name suggests)
