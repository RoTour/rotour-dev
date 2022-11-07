# 🇫🇷 Sélectionner des données

Pour sélectionner des données dans une table, le statement commencera pratiquement toujours par SELECT suivi des
colonnes à sélectionner. Il faut ensuite prendre le nom de la table dont on va extraire les données.

```sql
SELECT [COLUMNS]
FROM [TABLE]
```

Dans l'exemple ci-dessus, il faut remplacer [COLUMNS] par le nom des colonnes à sélectionner (séparées par des virgules)
et [TABLE] par le nom de la table dans laquelle on va sélectionner les données.

Pour sélectionner toutes les colones d'une table, on peut utiliser le symbol * (asterisk) a la place.

Examples:

```sql
SELECT *
FROM Users

SELECT label, price
FROM Product
```

# 🇺🇸 Select Data

When you want to retrieve data from a sql table, your statement will almost always start with SELECT
followed by the columns you want to retrieve. You must then take the name of the table you want to retrieve.

```sql
SELECT [COLUMNS]
FROM [TABLE]
```

Where you replace [COLUMN] with the names of the columns (comma-separated), and [TABLE] where you put the table name
(IMPORTANT: always select only ONE table in the FROM statement.)

If you want to select every column of the table, use * instead

Examples:

```sql
SELECT *
FROM Users

SELECT label, price
FROM Product
```