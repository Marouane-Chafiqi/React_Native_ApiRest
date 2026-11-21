# Lab 11 – Consommation d'une API REST avec React Native

Une petite application Expo qui récupère une liste d'utilisateurs depuis une vraie API ([JSONPlaceholder](https://jsonplaceholder.typicode.com/users)) et les affiche à l'écran.

## Démonstration

▶️ **[Voir la vidéo](/ApiRestLab/Record/1.mp4)**

## Ce que fait l'application

- Charge la liste des utilisateurs avec `fetch` (requête **GET**)
- Affiche un spinner pendant le chargement
- Affiche un message et un bouton « Réessayer » en cas d'erreur
- Permet de **rechercher** un utilisateur par son nom
- Permet d'**actualiser** la liste
- Ouvre une fiche de **détails** quand on appuie sur un utilisateur

## Ce qu'on apprend

- Le principe client / serveur et les API REST
- `fetch` + `async/await` + gestion des erreurs
- Les hooks `useState` et `useEffect`
- L'affichage de listes avec `FlatList`

## Lancer le projet

```bash
npx create-expo-app@latest ApiRestLab --template blank
cd ApiRestLab
```

Remplacer `App.js` par celui de ce dépôt, puis :

```bash
npx expo start -c
```

Scanner le QR code avec **Expo Go** (PC et téléphone sur le même Wi-Fi, avec Internet).
