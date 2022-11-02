# React #0 Basics #4 Components

Voici un template de component react avec typescript.

```tsx
import React, { FC } from 'react';

type MyCompProps = {};

const MyComp: FC<MyCompProps> = () => {
	return <>

	</>;
};

export default MyComp;
```

Découper son application en plein de petits components est primordial en react. Cela permet de garder des fichiers
clairs, pas trop long, et d'éviter de dupliquer du code.

Par exemple, on créera souvent un composant button avoir d'avoir le meme style de bouton partout sur notre site, en
ayant un seul endroit à modifier.

Les props sont des propriétés passées du component parent au component enfant. On peut par exemple imaginer un composant
Form avec en enfant un component CustomButton, avec le text du button ainsi que l'action au clic passés en props.

# Consigne

- Remplacer votre composant App par le suivant :
```tsx
 function App() {
	return <>
		<p>I'm the App Component</p>
	</>;
}
```
- Créer un nouveau component react appelé Modal et le placer à la suite de la balise \<p>
- Faire en sorte que ce nouveau component utilise une prop "message" de type string.
- Pour utiliser les props, on peut directement utiliser le destructuring à partir de la fonction :
```tsx
type MyCompProps = {
	message: string;
};

const MyComp: FC<MyCompProps> = ({ message }) => {
 return <p>{message}</p>;
}
```
- Afficher la prop message dans une div
- Ajouter une prop "onClose" de type void function (onClose: () => void).
- Pour le moment, on ne fera qu un console.log dans cette fonction.