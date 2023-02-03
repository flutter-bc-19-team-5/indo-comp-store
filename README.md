# INDO-COMP-STORE RESTful API
## Toko Elektronik Laptop dan Smartphone

### Deskripsi

Aplikasi ini memiliki 6 tabel sebagai berikut:

A. Tabel **Customer** yang memiliki kolom-kolom berikut :

| Field         | Datatype | Modifiers          |
| ------------- | -------- | ------------------ |
| id            | SERIAL   | PRIMARY KEY        |
| name          | STRING   | NOT NULL           |
| address       | STRING   |                    |
| phone         | STRING   | Alphanumeric       |
| email         | STRING   | NOT NULL           |
| password      | STRING   | NOT NULL           |
| profileImage  | STRING   |                    |

B. Tabel **Payment** yang memiliki kolom-kolom berikut :

| Field         | Datatype | Modifiers   |
| ------------- | -------- | ----------- |
| id            | INT      | PRIMARY KEY |
| pay_total     | INT      |             |
| pay_method    | STRING   |             |
| status        | STRING   |             |

C. Tabel **Order** yang memiliki kolom-kolom berikut :

| Field         | Datatype | Modifiers   |
| ------------- | -------- | ----------- |
| id            | INT      | PRIMARY KEY |
| customerId    | INT      |             |
| productId     | INT      |             |
| paymentId     | INT      |             |
| quantity      | INT      |             |
  
D. Tabel **Product** yang memiliki kolom-kolom berikut :

| Field      | Datatype | Modifiers   |
| ---------- | -------- | ----------- |
| id         | SERIAL   | PRIMARY KEY |
| name       | STRING   |             |
| price      | INT      |             |
| stock      | INT      |             |
| image      | STRING   |             |
| categoryId | INT      |             |
| brandId    | INT      |             |

E. Tabel **Category** yang memiliki kolom-kolom berikut :

| Field | Datatype | Modifiers   |
| ------| -------- | ----------- |
| id    | SERIAL   | PRIMARY KEY |
| name  | STRING   |             |
| type  | STRING   |             |

F. Tabel **Brand** yang memiliki kolom-kolom berikut :

| Field | Datatype | Modifiers   |
| ------| -------- | ----------- |
| id    | SERIAL   | PRIMARY KEY |
| name  | STRING   |             |
| logo  | STRING   |             |

### Usage

Check confiq.json file dalam config folder untuk koneksi dengan db

Command untuk menjalankan aplikasi 
```bash
npm start
```