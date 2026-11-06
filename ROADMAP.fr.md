# Feuille de route WinFix Kit — 7 novembre 2026

## État vérifié

- Disk Space Analyzer 1.2.0 publié sur GitHub, six fichiers joints. Commit : c6dddf22effd52ff5f4fb7f880fb90ffdc32832f. [Exécution CI réussie](https://github.com/DrakkenWorld/winfix-disk-space-analyzer/actions/runs/42276881583).
- Site bilingue déployé depuis 28c9d51f1d6e6ccc69ced5444afdfba556c8ddb9. [Exécution Pages réussie](https://github.com/DrakkenWorld/winfix-kit-site/actions/runs/42286763942). Les balises Google Search Console ont été conservées lors de la synchronisation locale.
- Aucune PR ouverte ni issue existante dans les deux dépôts au moment de l’inspection.
- Le seul message récupérable dans la conversation de référence demande de poursuivre les outils prévus ; il ne contient ni spécification ni ordre de priorité. Les quatre pistes ci-dessous sont présentes dans les pages du site.

## Ordre proposé et première étape acceptée

1. **Rapport de santé système** : priorité confirmée par l’utilisateur dans la conversation de reprise. Aperçu PowerShell 0.1.0 en lecture seule, Windows/matériel/volumes/pilotes/événements, français/anglais, exports HTML et JSON. Pas de note de santé ni de réparation. Tester la compatibilité 5.1/7, les sources indisponibles, les caractères spéciaux et les sorties distinctes. Publier un dépôt MIT, faire passer CI, puis proposer le téléchargement sur le site.
2. **Diagnostic réseau** : préciser les destinations et délais avant réalisation. Lecture seule ; distinguer configuration locale, passerelle, DNS et accès à une destination choisie. Les échecs ICMP ne prouvent pas une absence de connexion. Aucun reset automatique.
3. **Liste de vérification Windows** : guide versionné, sauvegardes/mises à jour/pilotes/sécurité, sans script qui applique tous les réglages. Vérifier les recommandations officielles au moment de rédiger.
4. **Windows Update** : commencer par un diagnostic. Définir séparément les réparations, sauvegardes et confirmations avant toute modification des services, caches ou paramètres.

Pour chaque outil : périmètre documenté, licence MIT, tests Windows PowerShell 5.1 et PowerShell 7, exemples anonymisés, limites/confidentialité, codes de sortie, CI et notes de version. Ajouter les liens FR/EN après publication réelle ; une carte « prévue » n’est pas une preuve de disponibilité.

## Limites restantes du Disk Space Analyzer

La version existante n’exige pas de nouvelle publication pour être considérée livrée. Les 11 cas PowerShell passent sous les deux éditions et les 9 cas natifs passent de nouveau localement le 7 novembre. La signature de code, une validation manuelle complète de l’interface et un essai Windows 11 propre restent des travaux distincts, non revendiqués comme terminés.

## Stratégie de livraison

Conserver l’application et le script Analyzer existants. Préparer les changements dans des branches et PR revues ; ne pas fusionner ni republier 1.2.0 pour de simples informations de suivi. Le nouvel outil reste un aperçu jusqu’à création du dépôt, passage CI et validation de ses limites. Les prochains choix de périmètre restent à discuter avant leur développement.
