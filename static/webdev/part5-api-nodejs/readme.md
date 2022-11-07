# TP 5 - Parcours Fullstack - API & Node.js

*Durée : 1 à 2 semaines*

__Languages__ : Javascript

__Objectif du TP__ : Mettre en place un server node.js proposant une api permettant d'avoir accès aux données stockées
sur le serveur.

__Notions visées__ :

- Découvrir le concept d'API
- Appréhender Node.js
- Comprendre les requêtes http (methods, body, headers, query parameters....)

__Énoncé__ :

- Créer une API proposant les routes suivantes :
    - GET /user => renvoie tous les utilisateurs
    - POST /user => permet de rajouter un nouvel utilisateur dans le fichier fourni
    - GET /user/:id => renvoie l'utilisateur avec l'id correspondant (ex /user/4)
    - DELETE /user/:id => permet de supprimer l'utilisateur avec l'id correspondant
- Une fois que toutes ces routes sont fonctionnelles, mettre en place un system de filtre sur la route GET /user, au
  moyen de query parameters (ex: GET /user?firstname=robin). Les filtres à mettre en place sont:
    - firstname
    - lastname
    - company
- La route DELETE /user/:id ne devrait pas être accessible à n'importe qui. Pour sécuriser cette route, faites en sorte
  qu'elle renvoie une erreur 401 (Unauthorized) si la requête ne contient pas dans ses headers { admin: true }
- Pensez à l'optimisation ! Lire le fichier à chaque requête n'est pas nécessaire ;)

__Tips__

- Avant de démarrer, vous devrez installer node.js et npm, puis lancer la commande `npm init` à l'intérieur de votre
  dossier projet.
- Pour le server, vous devrez utiliser **express**. Vous l'installerez via npm.
- L'utilisation des modules js est vivement conseillée. Pour cela, utilisez l'extension .mjs au lieu de .js
- Pour tester vos requêtes, utilisez un logiciel type Insomnia ou Postman (insomnia
  recommandé https://insomnia.rest/download).
- Ne **SURTOUT PAS** push le dossier node_module. Ajouter le dans votre .gitignore directement apres le npm init

__Indications habituelles__ :

- **Ne pas se lancer tête baisée dans le tp** : prenez le temps de découvrir les technos, comprendre à quoi ça sert,
  comment ça marche etc
- Bien rechercher en amont les différents outils notions dont vous pourriez avoir besoin pour réaliser le tp
- Faire des **commits** avec des messages **propres** :)



Have fun :)
