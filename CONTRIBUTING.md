# Contribuer au site HOD

## Mettre à jour les événements et la ludothèque

1. Ouvrez la feuille Google Sheets publique configurée dans `lib/config.ts`.
2. Mettez à jour les onglets `events` et `ludotheque`.
3. Vérifiez que les colonnes attendues sont respectées :
   - `events` : `title`, `date`, `location`, `description`, `type`
   - `ludotheque` : `name`, `min_players`, `max_players`, `duration_min`, `category`, `available`
4. Enregistrez : le site récupère automatiquement ces données.

## Clé API Google Calendar

Les événements sont lus depuis l'agenda Google public (`eventsCalendarId` dans `lib/config.ts`) via l'API Google Calendar, directement depuis le navigateur. Il faut une clé API :

1. Dans la [Google Cloud Console](https://console.cloud.google.com/), activez l'**API Google Calendar** et créez une **clé API**.
2. Restreignez la clé :
   - _Restrictions d'application_ : **Sites web (référents HTTP)**, avec `https://vivicatchub.github.io/*` (et `http://localhost:3000/*` pour le développement).
   - _Restrictions d'API_ : **Google Calendar API** uniquement.
3. En local, créez un fichier `.env.local` :
   ```
   NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY=votre_clé
   ```
4. Pour le déploiement, ajoutez la même clé dans les secrets du dépôt GitHub sous le nom `GOOGLE_CALENDAR_API_KEY`.

La clé est visible dans le code du site publié : c'est normal, ce sont les restrictions ci-dessus qui la protègent.
