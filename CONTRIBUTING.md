# Contribuer au site HOD

## Mettre à jour les événements et la ludothèque

1. Ouvrez la feuille Google Sheets publique configurée dans `lib/config.ts`.
2. Mettez à jour les onglets `events` et `ludotheque`.
3. Vérifiez que les colonnes attendues sont respectées :
   - `events` : `title`, `date`, `location`, `description`, `type`
   - `ludotheque` : `name`, `min_players`, `max_players`, `duration_min`, `category`, `available`
4. Enregistrez : le site récupère automatiquement ces données.
