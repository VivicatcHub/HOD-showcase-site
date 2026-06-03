# Contribuer au site HOD

## Ajouter un article du C.A.

1. Créez un fichier `.md` dans `/content/ca/` (exemple : `ca-octobre-2026.md`).
2. Ajoutez le frontmatter suivant :

```md
---
title: "Titre de l'article"
date: "2026-10-12"
summary: "Résumé court"
author: "Nom"
---
```

3. Écrivez le contenu en Markdown puis poussez la branche.

## Mettre à jour les événements et la ludothèque

1. Ouvrez la feuille Google Sheets publique configurée dans `lib/config.ts`.
2. Mettez à jour les onglets `events` et `ludobible`.
3. Vérifiez que les colonnes attendues sont respectées :
   - `events` : `title`, `date`, `location`, `description`, `type`
   - `ludobible` : `name`, `min_players`, `max_players`, `duration_min`, `category`, `available`
4. Enregistrez : le site récupère automatiquement ces données.
