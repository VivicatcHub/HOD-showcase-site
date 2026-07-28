# Contribuer au site HOD

## Ajouter un article du C.A.

Pour publier un nouveau rapport :

1. Créer un fichier `.md` dans : `content/ca/`
2. Nommer le fichier selon le format : `yyyy-mm-dd-nom-du-rapport.md`
3. Ajouter le contenu en Markdown selon cet exemple:

```md
---
title: "Titre de l'article"
date: "2026-10-12"
summary: "Résumé court"
author: "Nom"
---

# Titre

Contenu
```

4. Ouvrir une Pull Request

Une fois la PR fusionnée, le rapport apparaît sur le site dans les **5 minutes**.

3. Écrivez le contenu en Markdown puis poussez la branche.

## Mettre à jour les événements et la ludothèque

1. Ouvrez la feuille Google Sheets publique configurée dans `lib/config.ts`.
2. Mettez à jour les onglets `events` et `ludotheque`.
3. Vérifiez que les colonnes attendues sont respectées :
   - `events` : `title`, `date`, `location`, `description`, `type`
   - `ludotheque` : `name`, `min_players`, `max_players`, `duration_min`, `category`, `available`
4. Enregistrez : le site récupère automatiquement ces données.
