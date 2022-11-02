# 🇫🇷 Qu'est-ce qu'une base de données ?

Une base de données est **grossièrement** un ensemble de tableaux (2 dimensions) servant à stocker des données.
Ces tableaux sont appelés **tables**.

Exemple 1 : Une table contenant des utilisateurs :

| id  | nom    | prénom | age |
|-----|--------|--------|-----|
| 1   | Tourne | Robin  | 20  |
| 2   | John   | Doe    | 45  |

Exemple 2 : Une table contenant des articles :

| id  | label    | unitPrice | stock | qttByLot |
|-----|----------|-----------|-------|----------|
| 1   | Apple    | 2.50      | 50    | 1kg      |
| 2   | Cider    | 3.99      | 200   | 1bottle  |
| 3   | iceCream | 4.24      | 48    | 1L       |

Vous avez peut-etre remarqué la colonne **id** présente dans les deux tables.
C'est une colonne très importante. Elle permet d'identifier une ligne dans une table. Il est donc très important que chaque identifiant soit unique.

On appelle cet identifiant une **clé primaire / Primary Key (PK)**.


# 🇺🇸 What's a database ?

A database is **grossly** a set of arrays (2 dimensions) used to store data.
These 2D arrays are called **tables**.

Example 1 : A table containing users :

| id  | name    | firstname | age |
|-----|---------|-----------|-----|
| 1   | Tourne  | Robin     | 20  |
| 2   | John    | Doe       | 45  |

Example 2 : A table containing articles :

| id  | label    | unitPrice | stock | qttByLot |
|-----|----------|-----------|-------|----------|
| 1   | Apple    | 2.50      | 50    | 1kg      |
| 2   | Cider    | 3.99      | 200   | 1bottle  |
| 3   | iceCream | 4.24      | 48    | 1L       |

You may have noticed the column **id** present in both tables.
This column is very important. It allows to identify a single line in a table. It is thus very important that each unique identifier is unique.

This identifier is called a **Primary Key (PK)**.