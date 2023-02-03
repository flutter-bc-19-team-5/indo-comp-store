## LIST ROUTING UNTUK OPERASI CRUD

| Method | Route                  | Keterangan                                            |
| ------ | ---------------------- | ----------------------------------------------------- |
| GET    | /customers             | Read all data Customer                                |
| GET    | /payments              | Read all data Payment                                 |
| GET    | /products              | Read all data Product                                 |
| GET    | /categories            | Read all data Category                                |
| GET    | /brands                | Read all data Brand                                   |
|        |                        |                                                       |
| GET    | /customers/info/:id    | Read one data Customer                                |
| POST   | /customers/login       | Login Customer & generate access token                |
| GET    | /products/info/:id     | Read one data Product                                 |
|        |                        |                                                       |
| POST   | /customers/add         | Create data Customer                                  |
| POST   | /payments/add          | Create data Payment                                   |
| POST   | /products/add          | Create data Product                                   |
| POST   | /categories/add        | Create data Category                                  |
| POST   | /brands/add            | Create data Brand                                     |
|        |                        |                                                       |
| DELETE | /customers/delete/:id  | Delete data Customer berdasarkan ***id Primary Key*** |
| DELETE | /payments/delete/:id   | Delete data Payment  berdasarkan ***id Primary Key*** |
| DELETE | /products/delete/:id   | Delete data Product  berdasarkan ***id Primary Key*** |
| DELETE | /categories/delete/:id | Delete data Category berdasarkan ***id Primary Key*** |
| DELETE | /brands/delete/:id     | Delete data Brand    berdasarkan ***id Primary Key*** |
|        |                        |                                                       |
| PUT    | /customers/update/:id  | Update data Customer berdasarkan ***id Primary Key*** |
| PUT    | /payments/update/:id   | Update data Payment  berdasarkan ***id Primary Key*** |
| PUT    | /products/update/:id   | Update data Product  berdasarkan ***id Primary Key*** |
| PUT    | /categories/update/:id | Update data Category berdasarkan ***id Primary Key*** |
| PUT    | /brands/update/:id     | Update data Brand    berdasarkan ***id Primary Key*** |