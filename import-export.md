## Exportar la  base
```
mongodump --db ecommerse-db --out ./backup/
```


## Importar la base
```
mongorestore --db ecommerse-db ./backup/ecommerse-db
```