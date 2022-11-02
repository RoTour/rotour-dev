# 🇫🇷 Qu'est-ce que le SQL ?

Le SQL (Structured Query Language) est un langage qui permet de récupérer de façon précise des données dans une base de données.
Ce langage permet une selection de données extrêmement poussée, et donc de réaliser des requêtes complexes.

Exemple 1 - Simple : Selectionner tous les articles dont le prix est inférieur à 1 $

```sql
SELECT * FROM article WHERE prix < 1;
```

Exemple 2 - Intermédiaire : Compter le nombre d'articles dont la catégorie est "Informatique"

```sql
SELECT COUNT(*) FROM article
LEFT JOIN categorie ON categorie.id = article.categorie_id
WHERE categorie.nom = "Informatique";
```

Exemple 3 - Avancé : Récupérer les noms et prénoms des utilisateurs qui ont commandé au Danemark et dont le compte a été vérifié.

```sql
SELECT cl.firstname, cl.lastname FROM COMMAND co
LEFT JOIN Client cl ON cl.id = co.client_id
LEFT JOIN Country ctr ON ctr.id = co.country_id
WHERE cl.verified AND ctr.name LIKE 'Denmark'
```

Nous allons voir dans le cours suivant les bases de l'utilisation du SQL

# 🇺🇸 What is SQL?

SQL (Structured Query Language) is a language that allows you to retrieve data in a precise way.
This language allows a very strong selection of data, and therefore it is possible to perform complex queries.

Example 1 - Simple : Select all articles whose price is lower than 1$

```sql
SELECT * FROM article WHERE prix < 1;
```

Example 2 - Intermediate : Count the number of articles whose category is "Informatique"

```sql
SELECT COUNT(*) FROM article
LEFT JOIN categorie ON categorie.id = article.categorie_id
WHERE categorie.nom = "Informatique";
```

Example 3 - Advanced : Retrieve the names and first names of users who have ordered in Denmark and whose account has been verified.

```sql
SELECT cl.firstname, cl.lastname FROM COMMAND co
LEFT JOIN Client cl ON cl.id = co.client_id
LEFT JOIN Country ctr ON ctr.id = co.country_id
WHERE cl.verified AND ctr.name LIKE 'Denmark'
```
