# Todo API

## Démo en ligne

L'API est déployée sur Render : **https://finalisation-api.onrender.com**

> Sur le plan gratuit Render, l'instance se met en veille après 15 minutes d'inactivité. Le premier appel peut prendre 30-50 secondes.

## Description

Ce projet consiste en une API backend...

## Description

Ce projet consiste en une API backend permettant à des utilisateurs de :

- créer un compte et se connecter ;
- gérer leurs propres tâches (créer, lire, modifier, supprimer) ;
- accéder uniquement à leurs propres données.

Le projet a été réalisé dans le cadre d'un stage d'apprentissage, en suivant une progression jour par jour.

## Stack technique

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- bcryptjs (hashage des mots de passe)
- jsonwebtoken (authentification JWT)
- dotenv (gestion des variables d'environnement)
- nodemon (rechargement automatique en développement)

## Structure du projet
## Installation

### Option 1 — Utiliser l'API en ligne

L'API est déjà déployée. Vous pouvez directement tester les routes avec Postman en utilisant :
- **Base URL** : `https://finalisation-api.onrender.com`

### Option 2 — Installation locale

Suivez les étapes ci-dessous pour lancer l'API sur votre machine.