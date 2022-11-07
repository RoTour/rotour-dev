# React #0 Basics #5 Conditions

Une syntaxe pratique en tsx pour l affichage conditionnel est l usage des conditions ternaires.

```tsx
return (
  <div>
    {condition ? <p>{elementIfTrue}</p> : <p>{elementIfFalse}</p>}
  </div>
);
```

Lorsqu on souhaite cacher un élément, on peut utiliser certaines propriétés de javascript à notre avantage.

```tsx
return (
  <div>
    {condition && <p>{elementIfTrue}</p>}
  </div>
);
```

# Consigne
Le but est de faire en sorte que le composant Modal précédemment créé s'affiche seulement lorsqu'on clique sur un bouton.

En cas de difficulté, vous pouvez vous aider des étapes intermédiaires suivantes. Je recommande toutefois de vous forcer 
à le faire par vous-même.

- Créer un state `modalOpened` (boolean) qui définira si le composant Modal est affiché ou non.
- Ajouter un button au composant App avec un onClick qui set le state `modalOpened` à `true`.
- Utiliser les conditions comme expliquée plus tot pour afficher le composant Modal seulement lorsque le state
`modalOpened` est `true`.
