---
title: Interfaces
description: Apprends à rendre ton interface magnifique et unique grâce à ce guide
---

## Qu'est-ce qu'une interface ?

Une interface est un message qui permet aux utilisateurs de gérer rapidement leur salon vocal temporaire grâce à de simples boutons.  
Voici à quoi ressemble l'interface par défaut :
![interface par défaut](/guides/default_interface.png 'Interface par défaut')

## Créer une interface

Tu peux créer une nouvelle interface dans le tableau de bord, dans la section des interfaces.  
Elle te demandera un salon et tu pourras choisir celui que tu veux.

## Changer de salon ou renvoyer une interface

Si tu as supprimé un message d'interface par erreur ou si tu veux simplement changer de salon, tu peux le faire depuis les paramètres de l'interface dans le tableau de bord.

## Personnaliser une interface

Tu peux personnaliser chaque interface dans le tableau de bord : ouvre la section des interfaces, choisis une interface et clique sur gérer.  
Une fois que tu as terminé, enregistre tes modifications et Astro mettra à jour le message immédiatement.

_N'oublie pas que sans [Ultimate](/ultimate) tu peux seulement désactiver ou activer les boutons d'une interface, tout le reste nécessite Ultimate._

### Paramètres du message

Le message est divisé en trois parties, chacune avec ses propres paramètres :

- `En-tête` : le nom de l'auteur, le lien de l'auteur et l'image de l'auteur
- `Corps` : le titre, le lien du titre, la miniature, la description et l'image
- `Pied de page` : le texte du pied de page, l'image du pied de page, la couleur de la ligne à gauche du message et un horodatage

Chaque paramètre est facultatif, si tu laisses un texte vide il ne sera tout simplement pas affiché.  
L'image de l'auteur et l'image ont une valeur par défaut, tu peux la rétablir avec le bouton `Rétablir par défaut`.

### Images

Les images sont choisies dans le stockage multimédia de ton serveur. Clique sur `Choisir une image` pour l'ouvrir, depuis là tu peux :

- téléverser une nouvelle image
- prévisualiser les images déjà téléversées
- sélectionner une image pour le paramètre que tu modifies
- supprimer les images dont tu n'as plus besoin

_Supprimer une image la retire aussi des paramètres de l'interface que tu modifies, les autres interfaces qui l'utilisent afficheront une image cassée jusqu'à ce que tu la changes._

Les images qui ne sont utilisées par aucune interface sont nettoyées automatiquement de temps en temps.

### Emojis personnalisés

Les emojis peuvent être utilisés dans les textes du message et sur les boutons. Les emojis standards se collent simplement, les emojis Discord personnalisés ont besoin de leur code :

1. Va sur Discord et écris l'emoji précédé d'une barre oblique inverse, par exemple `\:nom:`
2. Envoie le message, Discord enverra le code de l'emoji, comme `<:nom:id>` (ou `<a:nom:id>` pour les emojis animés)
3. Copie ce code et colle-le dans le tableau de bord

## Boutons

Une interface peut avoir jusqu'à 5 lignes de 5 boutons chacune, le tableau de bord les affiche sous forme de grille.  
Clique sur un bouton pour le modifier, ou sur un emplacement vide pour en ajouter un nouveau.

Chaque bouton a ces paramètres :

- `Bouton` : quel bouton est affiché à cette position. Un bouton ne peut être utilisé qu'une seule fois par interface, ceux déjà placés ailleurs ne sont donc pas sélectionnables. Choisis `Aucun bouton` pour le retirer
- `Désactivé` : les utilisateurs voient le bouton mais ne peuvent pas cliquer dessus
- `Nom` : le texte affiché sur le bouton
- `Emoji` : l'emoji affiché sur le bouton
- `Style` : la couleur du bouton

Un bouton a besoin d'au moins un nom ou un emoji pour être affiché.

## Supprimer une interface

Tu peux supprimer une interface à tout moment depuis le tableau de bord.

### Exemple d'interface personnalisée

L'image ci-dessous est un exemple d'interface personnalisée :
![interface personnalisée](/illustration/custom_interface.png 'Interface personnalisée')
