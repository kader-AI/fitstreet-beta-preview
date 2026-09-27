# FitStreet · Accès bêta

[Ouvrir le formulaire](https://kader-ai.github.io/fitstreet-beta-preview/)

Choisis iPhone ou Android et renseigne ton email. Les inscriptions sont enregistrées dans le suivi privé FitStreet.

- Android : utilise l’adresse associée à ton compte Google. La confirmation propose le téléchargement de l’APK privé uniquement après vérification du droit Drive.
- iPhone : la confirmation indique si l’accès TestFlight est prêt ou encore en cours. Une notification Apple peut être nécessaire pour accepter l’invitation ; la page ne confirme pas sa livraison.
- Le bouton soleil permet de changer de thème.

Le formulaire effectue une navigation POST classique vers Apps Script, avec uniquement `email`, `platform` et `website`. Aucun succès n’est simulé dans le navigateur. Un délai de confirmation permet de réessayer avec le même email ; la collecte serveur déduplique les inscriptions.

Endpoint de production configuré : `https://script.google.com/macros/s/AKfycbySF1N5W9GzOeef7fN72DOMtptlUX9aTX9ulWwL5UPN0BPze5lm2ZATw0U_rsjxWQWMXA/exec`.

Le branchement technique du formulaire ne remplace pas la vérification réelle des parcours Google Drive et TestFlight.
