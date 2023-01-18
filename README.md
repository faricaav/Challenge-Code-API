# Challenge-Code-API

npm version patch
npm publish 

<b>Dokumentasi API</b>:

<b>API ADMIN</b> <br>
GET ALL : http://localhost:8080/admin <br>
GET FIND BY ID : http://localhost:8080/admin/{id_admin} <br>
POST : http://localhost:8080/admin <br>
PUT : http://localhost:8080/admin/{id_admin} <br>
DELETE : http://localhost:8080/admin/{id_admin} <br>

Seluruh API menggunakan auth akun admin, kecuali API POST karena digunakan untuk register pertama kali.

---------------------------------------------------------

<b>API GUEST</b> <br>
GET ALL : http://localhost:8080/guest <br>
GET FIND BY ID : http://localhost:8080/guest/{id_guest} <br>

Menggunakan auth akun admin untuk mengakses API GET yang menampilkan keseluruhan data

POST : http://localhost:8080/guest <br>
PUT : http://localhost:8080/guest/{id_guest} <br>

API POST dan PUT tidak menggunakan auth sehingga seluruh guest bisa mengakses

DELETE : http://localhost:8080/guest/{id_guest} <br>

Menggunakan auth akun admin untuk delete data guest

---------------------------------------------------------

<b>API GUEST NOTE</b> <br>
GET ALL : http://localhost:8080/guestnote <br>
GET FIND BY ID : http://localhost:8080/guestnote/{id_guest} <br>

Tidak menggunakan auth sehingga semua guest bisa melihat tetapi data yang ditampilkan dibatasi (hanya name, dan note)
