kode program utilsArray.ts sebenarnya memiliki function untuk merubah format data json array Object [{},{}] yang sudah difilter sesuai key "tag"-nya menjadi block - block yang jumlahnya menjadi dinamis sesuai berapa data yang ingin ditampilkan dalam 1 block pada UI. Jadi semisal ada sebuah 4 Card yang tampil dalam 1 UI, namun karena datanya 10, maka diperlukan 3 slide untuk menampilkan ke-10 data tersebut secara 4 data 4 data per UI.

secara teknis semisal datanya [1,2,3,4,5,6,7,8,9,10] maka dirubah menjadi [][] : yaitu
[
    [1,2,3,4], 
    [5,6,7,8], 
    [9,10]
]

----------------...------------...--------------------...-----------------
pada kode program chunkArray.ts pertama dilakukan 
export function chunkArray<T>(array: T[], size: number): T[][] {...} 
yang mana baris kode ini adalah mendeklarasikan function Typescript dengan type Genericnya. Type Generic dideklarasikan dengan cara function Generic yaitu dengan <T> disebelah nama fucntion-nya, lalu parammeter function tersebut menggunakan Type tersebut untuk dideklarasikan bahwa Type datanya harus berupa array[], maka dijadikan T[] pada parameter array itu sendiri. Pada parameter kedua yaitu size diberikan type number. Lalu karena kita membuat 1 array data menjadi sebuah block block data, maka kita merubah [] menjadi [][] sesuai contoh data diatas, maka pada return type function-nya kita gunakan generic dengan format [][] menjadi T[][].

-parameter array : T[] bertugas sebagai tempat dikirimnya data dari Component nantinya untuk diproses menjadi block - block seperti diatas
-parameter size : number bertugas sebagai menerima berapa data dalam 1 block yang diinginkan, semisal dalam 1 block berupa 4 data ya sudah nanti dalam panjang n data akan dipecah menjadi 4 block data disetiap array-nya seperti contoh data diatas.

selanjutnya kita mendeklarasikan variable chunks dengan type kita gunakan generic yaitu T[][] namun value dari variable ini berupa array kosong []. varibale chunks ini akan berfungsi untuk menyimpan data blcok yang sudah berubah dari data awal yang dikirim, makanya type-nya adalah T[][] dan nanti variable chunks inilah yang di-return oleh function chunkArray().

selanjutnya dilakukan perulangan for (let index = 0; index < array.length; index += size) {...}. Perulangan ini:
-dimulai dari index = 0
-lalu jumlah perulangan ditentukan dengan panjang data yang diterima oleh parameter array, maka dari itu index < array.length
-terakhir adalah iterasi yang dilakukan bukanlah index++, melainkan index += size, yang mana ini menentukan berapa banyak data dalam sebuah block. nantinya proses perulangan dari data diatas contohnya [1,2,3,4,5,6,7,8,9,10] hanya akan dilakukan 3 kali saja, karena sesuai panjang data hanya dilakukan 4 kali yaitu:
    [1,2,3,4], 
    [5,6,7,8], 
    [9,10]
saja.
selanjutnya dalam statement for tersebut dilakukan chunks.push(array.slice(index, index + size)); yang mana statement ini:
-variable yang berbentuk bernilai array kosong [] dengan type generic array T[][] dapat tetap dilakukan .push() untuk ditambahkan data array baru ke dalam nilai arraynya.
-dalam penambahan data array baru kedalam array kosongnya [] kita gunakan .slice pada data parameter array dengan parameter (start-nya yaitu index, dan end-nnya kita pakai index + size)-- jadi slice akan mengandung data block sesuai jumlah data yang diinginkan dalam 1 block. lalu nilai slice tersebut di .push ke variable chunk, jadinya chunk akan mengandung nilai seperti ini :

    [1,2,3,4], 
    [5,6,7,8], 
    [9,10]

dan karena chunk memiliki nilai awal array kosong [] maka chunk berisi data sebagai berikut:
[
    [1,2,3,4], 
    [5,6,7,8], 
    [9,10]
]

data seperti diatas lah yang dari chunk untuk di-return ke function chunkArray(). jadi ketika ada Component yang sudah memfilter data dari mock atau data sumber of truth untuk dikirim ke function chunkArray() ini, maka datanya akan menjadi seperti format diatas, dan untuk tiap block data tersebut dapat ditampilkan secara dinamis sesuai jumlah data yang dikirimnya, jadinya UI tidak akan secara statis perlu diganti-ganti ketika datanya berubah -ubah 