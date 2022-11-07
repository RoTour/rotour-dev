# React #0 Basics #0 Setup


React peut être setup de plusieurs manières différentes. Je recommande personnellement d'utiliser `vitejs` qui permet un
setup en quelques secondes et une compilation ultra-rapide

## Consigne
- Setup un environnement react en utlisant vitejs (avec typescript bien entendu :) )
- Enlever les fichiers superflus:
    - supprimer logo.svg
    - supprimer vite-env.d.ts
    - vider les fichiers css
    - remplacer le contenu de App.tsx par
```tsx
import './App.css'

function App() {
	return (
		<div>Hello World</div>
	)
} 
```
