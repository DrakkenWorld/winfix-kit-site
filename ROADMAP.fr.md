# Feuille de route WinFix Kit — 7 novembre 2026

## État vérifié le 7 novembre

- Disk Space Analyzer 1.2.0 publié sur GitHub, six fichiers joints. Commit : c6dddf22effd52ff5f4fb7f880fb90ffdc32832f. [Exécution CI réussie](https://github.com/DrakkenWorld/winfix-disk-space-analyzer/actions/runs/42276881583).
- Site bilingue déployé depuis 28c9d51f1d6e6ccc69ced5444afdfba556c8ddb9. [Exécution Pages réussie](https://github.com/DrakkenWorld/winfix-kit-site/actions/runs/42286763942). Les balises Google Search Console ont été conservées lors de la synchronisation locale.
- Aucune PR ouverte ni issue existante dans les deux dépôts au moment de l’inspection.
- Le seul message récupérable dans la conversation de référence demande de poursuivre les outils prévus ; il ne contient ni spécification ni ordre de priorité. Les quatre pistes ci-dessous sont présentes dans les pages du site.

## Ordre proposé et première étape acceptée

1. **Rapport de santé système** : version 1.0.0 en lecture seule avec rapports HTML et JSON, lanceurs français et anglais et tests PowerShell 5.1 et 7. Le code, la licence MIT et les téléchargements sont regroupés dans le [dépôt dédié](https://github.com/DrakkenWorld/winfix-system-health-report).
2. **Diagnostic réseau** : préciser les destinations et délais avant réalisation. Lecture seule ; distinguer configuration locale, passerelle, DNS et accès à une destination choisie. Les échecs ICMP ne prouvent pas une absence de connexion. Aucun reset automatique.
3. **Liste de vérification Windows** : guide versionné, sauvegardes/mises à jour/pilotes/sécurité, sans script qui applique tous les réglages. Vérifier les recommandations officielles au moment de rédiger.
4. **Windows Update** : commencer par un diagnostic. Définir séparément les réparations, sauvegardes et confirmations avant toute modification des services, caches ou paramètres.

Pour chaque outil : périmètre documenté, licence MIT, tests Windows PowerShell 5.1 et PowerShell 7, exemples anonymisés, limites/confidentialité, codes de sortie, CI et notes de version. Ajouter les liens FR/EN après publication réelle ; une carte « prévue » n’est pas une preuve de disponibilité.

## Limites restantes du Disk Space Analyzer

La version existante n’exige pas de nouvelle publication pour être considérée livrée. Les 11 cas PowerShell passent sous les deux éditions et les 9 cas natifs passent de nouveau localement le 7 novembre. La signature de code, une validation manuelle complète de l’interface et un essai Windows 11 propre restent des travaux distincts, non revendiqués comme terminés.

## Stratégie de livraison

Préparer les changements dans des branches et des PR. Vérifier les téléchargements de chaque outil avant d’intégrer ses liens sur le site. Les prochains choix de périmètre restent à discuter avant leur développement.
