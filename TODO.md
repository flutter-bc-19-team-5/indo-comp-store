## ORM Sequelize script

### Table product
```bash
npx sequelize-cli model:generate --name product --attributes "name:string, price:integer, stock:integer, image:string"
```

### Table category
```bash
npx sequelize-cli model:generate --name category --attributes "name:string, type:string"
```

### Table brand
```bash
npx sequelize-cli model:generate --name brand --attributes "name:string, logo:string"
```

### Table customer
```bash
npx sequelize-cli model:generate --name customer --attributes "name:string, address:string, phone:string, email:string, password:string, profileImage:string"
```

### Table order
```bash
npx sequelize-cli model:generate --name order --attributes "customer_id:integer, product_id:integer, pay_id:integer, quantity:integer"
```

### Table payment
```bash
npx sequelize-cli model:generate --name payment --attributes "pay_total:integer, pay_method:string, status:string"
```