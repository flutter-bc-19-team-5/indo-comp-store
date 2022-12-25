# INDO-COMP-STORE RESTful API
## Toko Elektronik Laptop dan Smartphone

### Deskripsi

Aplikasi ini memiliki 3 tabel sebagai berikut:

A. Tabel **Customer** yang memiliki kolom-kolom berikut :

| Field   | Datatype | Modifiers   |
| ------- | -------- | ----------- |
| id      | SERIAL   | PRIMARY KEY |
| name    | STRING   | NOT NULL    |
| address | STRING   | NOT NULL    |
| phone   | STRING   | NOT NULL    |

B. Tabel **Payment** yang memiliki kolom-kolom berikut :

| Field         | Datatype | Modifiers   |
| ------------- | -------- | ----------- |
| id            | INT      | PRIMARY KEY |
| quantity      | INT      | NOT NULL    |
| total         | INT      | NOT NULL    |
| paymentMethod | STRING   | NOT NULL    |
| customerId    | INT      | NOT NULL    |
| productId     | INT      | NOT NULL    |
  
C. Tabel **Product** yang memiliki kolom-kolom berikut :

| Field | Datatype | Modifiers   |
| ----- | -------- | ----------- |
| id    | SERIAL   | PRIMARY KEY |
| name  | STRING   | NOT NULL    |
| type  | STRING   | NOT NULL    |
| brand | STRING   | NOT NULL    |
| price | INT      | NOT NULL    |
| stock | INT      | NOT NULL    |
| image | STRING   | NOT NULL    |

### Usage

Check confiq.json file dalam config folder untuk koneksi dengan db

Command untuk menjalankan aplikasi 
```bash
npm start
```