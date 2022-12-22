## LIST ROUTING UNTUK OPERASI CRUD

| Method | Route                  | Keterangan                                                   |
| ------ | ---------------------- | ------------------------------------------------------------ |
| GET    | /                      | Home Page                                                    |
| GET    | /customer              | Read data Customer                                           |
| GET    | /payment               | Read data Payment                                            |
| GET    | /product               | Read data Product                                            |
|        |                        |                                                              |
| POST   | /customer/add          | Create data Customer yang dikirim dari halaman ejs file      |
| POST   | /payment/add           | Create data Payment  yang dikirim dari halaman ejs file      |
| POST   | /product/add           | Create data Product  yang dikirim dari halaman ejs file      |
|        |                        |                                                              |
| GET    | /customer/delete/:id   | Delete data Customer berdasarkan ***id*** yang dikirimkan    |
| GET    | /payment/delete/:id    | Delete data Payment  berdasarkan ***id*** yang dikirimkan    |
| GET    | /product/delete/:id    | Delete data Product  berdasarkan ***id*** yang dikirimkan    |
|        |                        |                                                              |
| POST   | /customer/update/:id   | Update data Customer yang dikirim dari halaman ejs file      |
| POST   | /payment/update/:id    | Update data Payment  yang dikirim dari halaman ejs file      |
| POST   | /product/update/:id    | Update data Product  yang dikirim dari halaman ejs file      |