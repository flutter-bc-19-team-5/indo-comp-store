## ORM Sequelize script

### Table product
```bash
npx sequelize-cli model:generate --name product --attributes "name:string, type:string, brand:string, price:integer, stock:integer, image:string"
```

### Table customers
```bash
npx sequelize-cli model:generate --name customer --attributes "name:string, address:string, phone:integer, email:string, password:string, profilImage:string"
```

### Table transactions
```bash
npx sequelize-cli model:generate --name transaction --attributes "customer_id:integer, product_id:integer, pay_id:integer, quantity:integer"
```

### Table payments
```bash
npx sequelize-cli model:generate --name payment --attributes "pay_total:integer, pay_method:string, status:string"
```