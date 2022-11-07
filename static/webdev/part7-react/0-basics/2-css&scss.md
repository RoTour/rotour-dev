# React #0 Basics #2 css&scss

Pour ceux qui souhaitent utiliser le SCSS, il vous suffit d'installer le package `sass via npm/yarn. Aucune
configuration n'est requise, vite permet d utiliser scss out of the box.

Si vous ne maitrisez pas scss, pas de panique, scss comprends la syntaxe de css. Il permet en revanche de reduire le
nombre de lignes css en reduisant la duplication de code. Je vous invite a vous renseigner dessus si vous souhaitez en
aprendre plus. Je recommande donc d'utiliser des fichier scss pour les styles.

React propose un system de module pour le css, c est a dire que le css d'un component n est pas partagé avec les autres,
ce qui evite les conflits de clases entre components.
Pour utiliser les modules css, on utilise le format `Component.module.css`/`Component.module.scss`.

Pour utiliser les classes css on importe le fichier de la facon suivante:
```tsx 
import css from './App.module.scss';
```

et on l utilise avec l'attribut className :
```tsx
<div className={css.myLayout}>
  ...
</div>
```
# Consigne
- Changer le fichier App.css en App.module.scss
- Vous etes libres de faire le design que vous souhaitez, voici des styles que je vous propose si vous ne voulez pas vous prendre la tete
```scss
.myLayout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.animatedButton {
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  
  /* scale up on hover */
  &:hover {
    transform: scale(1.1);
  }
  /* scale down on click */
  &:active {
    transform: scale(0.9);
  }
}
```