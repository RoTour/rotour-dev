# React #0 Basics #5 Conditions

Cette lecon est la pour vous montrer quels styles utiliser pour creer une modale. Vous etes libres de les customiser
comme bon vous semble.

# TD

- Wrapper le contenu de la modale dans une div avec la class `modalContent` elle meme wrapped dans une div avec la
  class `modal`

```tsx
// Modal.tsx
import React, { FC } from 'react';
import css from './Modal.module.scss';

type ModalProps = {
	message: string;
	onClose: () => void;
};

const Modal: FC<ModalProps> = ({ message, onClose }) => {
  return (
    <div className={ css.modal }>
      <div className={ css.modalContent }>
        <p>{ message }</p>
        <button onClick={ onClose }>Close</button>
      </div>
    </div>
  );
};

export default Modal;
```

- la classe modal correspond au fond de la modale. On lui ajoute donc les styles suivants:
```scss
// Modal.module.tsx
.modal {
  height: 100vh;
  width: 100vw; // Full screen
  background-color: rgba(0, 0, 0, 0.5); // 50% opacity
  position: fixed; // Pour prendre tout l'écran
  top: 0;
  left: 0;
  z-index: 9999; // Afficher devant les autres éléments
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
```
- Pour le design du contenu, vous pouvez laisser libre cours à votre imagination, voici une base sur laquelle vous pouvez
  vous appuyer:
```scss
// Modal.module.tsx
.modalContent {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  width: clamp(50%, 500px, 100%);
  margin: 2rem;
  aspect-ratio: 2/1;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
```
- Pour finir, ne pas oublier la fonction onClose qui sera appelée lorsque l'utilisateur cliquera sur le bouton close.
```tsx
// App.tsx
import Modal from './component/Modal/Modal';
import { useState } from 'react';

function App() {
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  return <>
    <p>I'm the App Component</p>
    {modalOpened && <Modal onClose={() => setModalOpened(false)}  message={"Hello, I'M Modal !"}/>}
    <button onClick={() => setModalOpened(true)}>Open Modal</button>
  </>;
}

export default App;
```

### Felicitations ! Vous venez de terminer votre première modale !

