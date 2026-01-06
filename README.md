# NestJS Media Manager API

Une API robuste construite avec [NestJS](https://nestjs.com/) pour la gestion de clips vidéo, intégrant une base de données MongoDB et une authentification sécurisée.

## 🚀 Fonctionnalités

- **Gestion des Clips** : CRUD complet pour les ressources "Clips".
- **Base de données** : Intégration transparente avec MongoDB via [Mongoose](https://mongoosejs.com/).
- **Authentification & Sécurité** :
    - Authentification JWT avec Passport.
    - Hachage de mots de passe avec `bcrypt`.
    - Gardes de sécurité (Guards) pour protéger les ressources (ex: vérification du propriétaire du clip).
- **Validation** : Validation stricte des données entrantes avec `class-validator`.
- **Qualité de code** : Configuration ESLint et Prettier incluse.

## 🛠️ Stack Technique

- **Framework** : NestJS 11
- **Langage** : TypeScript 5.7
- **Base de données** : MongoDB (Mongoose 8.2)
- **Tests** : Jest & Supertest
- **Gestionnaire de paquets** : npm

## 📦 Installation

```bash
# Installation des dépendances
npm install
```
## ⚙️ Configuration
Créez un fichier à la racine du projet et configurez vos variables d'environnement (utilisées par `@nestjs/config`) : `.env`

```
MONGODB_URI=mongodb://localhost:27017/votre_base_de_donnees
JWT_SECRET=votre_secret_super_securise
PORT=3000
```

## 🏃 Execution
### Mode développement
```
npm run start:dev
```
### Mode production
```
npm run build
npm run start:prod
```

## 🧪 Tests
### Tests unitaires
```
npm run test
```
### Tests de bout en bout (e2e)
```
npm run test:e2e
```
### Couverture des tests
```
npm run test:cov
```

## 📁 Structure du Projet (Extraits)
- `src/clips/` : Module de gestion des clips.
- `src/schema/` : Définitions des schémas Mongoose.
- `src/guards/` : Logique de protection des routes.

## 📝 Licence
Ce projet est sous licence [MIT](LICENSE).

### Quelques conseils pour personnaliser ce README :
*   **Documentation API** : Si vous utilisez Swagger (souvent avec NestJS), ajoutez une section indiquant que la doc est disponible sur `/api`.
*   **Scripts personnalisés** : Si vous avez des commandes spécifiques dans votre `package.json`, n'hésitez pas à les lister.
*   **Exemples d'appels** : Ajouter un petit exemple de `curl` ou de requête pour créer un clip peut être très utile pour les nouveaux développeurs.