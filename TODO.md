## ORM Sequelize script

### Table product
```bash
npx sequelize-cli model:generate --name products --attributes "name:string, type:string,brand:string, price:integer, stock:integer"
```

### Table customers
```bash
npx sequelize-cli model:generate --name customers --attributes "name:string, address:string, phone:integer"
```

### Table payments
```bash
npx sequelize-cli model:generate --name payments --attributes "quantity:integer, total:integer, idCustomer:integer, idProduct:integer"
```