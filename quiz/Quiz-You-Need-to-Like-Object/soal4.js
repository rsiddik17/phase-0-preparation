/*
Function travelingIndonesia akan mengembalikan nilai sebuah string suatu perjalanan seseorang
di kota-kota besar yang ada di Indonesia.

Secara berturut-turut rute akan berlangsung ;
Yogyakarta > Semarang > Surabaya > Denpasar

Rute tersebut berlaku arah sebaliknya.
Traveller dapat menggunakan transportasi yang disediakan oleh
Pemerintah yaitu berupa :

- Pesawat, biayanya 275000
- Kereta, biayanya 250000
- Bis, biayanya 225000

Biaya tersebut berlaku untuk jarak 1 kota saja.

Dikarenakan traveller berkeliling Indonesia bertepatan dengan digalakkannya visit Indonesia
Maka traveller akan mendapatkan diskon menggunakan metode pembayaran tertentu;

- OVO > akan mendapatkan diskon 15% setiap kota
- Dana > akan mendapatkan diskon 10% setiap kota
- Gopay > akan mendapatkan diskon 5% setiap kota
- Cash > normal;

Function tersebut akan mengembalikan siapa yang mengeluarkan biaya paling besar (sudah termasuk diskon);

Note:
1. Hanya boleh menggunakan built in function .push();
*/

function travelingIndonesia(arr, emoney) {
  //code here
  if (arr.length === 0) return [];

  let cities = ["Yogyakarta", "Semarang", "Surabaya", "Denpasar"];
  let result = [];

  // diskon
  let discount = 0;
  if (emoney === "OVO") discount = 15;
  else if (emoney === "Dana") discount = 10;
  else if (emoney === "Gopay") discount = 5;

  for (let i = 0; i < arr.length; i++) {
    let data = arr[i];

    let name = "";
    let departure = "";
    let destination = "";
    let transport = "";

    let temp = "";
    let section = 0;

    // parsing manual (tanpa split)
    for (let j = 0; j < data.length; j++) {
      if (data[j] === "-") {
        if (section === 0) name = temp;
        else if (section === 1) departure = temp;
        else if (section === 2) destination = temp;

        temp = "";
        section++;
      } else {
        temp += data[j];
      }
    }
    transport = temp;

    // cari index kota
    let idxDep = -1;
    let idxDes = -1;

    for (let k = 0; k < cities.length; k++) {
      if (cities[k] === departure) idxDep = k;
      if (cities[k] === destination) idxDes = k;
    }

    // hitung jarak
    let jarak = idxDep - idxDes;
    if (jarak < 0) jarak = -jarak;

    // harga transport
    let harga = 0;
    if (transport === "Pesawat") harga = 275000;
    else if (transport === "Kereta") harga = 250000;
    else if (transport === "Bis") harga = 225000;

    // total sebelum diskon
    let total = harga * jarak;

    // diskon
    total = total - (total * discount) / 100;

    // push hasil
    result.push({
      name: name,
      departureCity: departure,
      destinationCity: destination,
      transport: transport,
      totalCost: total,
    });
  }

  // sorting descending (tanpa sort built-in)
  for (let i = 0; i < result.length; i++) {
    for (let j = i + 1; j < result.length; j++) {
      if (result[j].totalCost > result[i].totalCost) {
        let temp = result[i];
        result[i] = result[j];
        result[j] = temp;
      }
    }
  }

  return result;
}

console.log(
  travelingIndonesia(
    [
      "Danang-Yogyakarta-Semarang-Bis",
      "Alif-Denpasar-Surabaya-Kereta",
      "Bahari-Semarang-Denpasar-Pesawat",
    ],
    "OVO",
  ),
);
/*
[ { name: 'Bahari',
    departureCity: 'Semarang',
    destinationCity: 'Denpasar',
    transport: 'Pesawat',
    totalCost: 467500 },
  { name: 'Alif',
    departureCity: 'Denpasar',
    destinationCity: 'Surabaya',
    transport: 'Kereta',
    totalCost: 212500 },
  { name: 'Danang',
    departureCity: 'Yogyakarta',
    destinationCity: 'Semarang',
    transport: 'Bis',
    totalCost: 191250 } ]
*/
console.log(
  "==================================================================================================",
);
console.log(
  travelingIndonesia(
    [
      "Shafur-Surabaya-Yogyakarta-Kereta",
      "Taufik-Semarang-Surabaya-Pesawat",
      "Alex-Yogyakarta-Semarang-Kereta",
    ],
    "Dana",
  ),
);
// /*
// [ { name: 'Shafur',
//     departureCity: 'Surabaya',
//     destinationCity: 'Yogyakarta',
//     transport: 'Kereta',
//     totalCost: 450000 },
//   { name: 'Taufik',
//     departureCity: 'Semarang',
//     destinationCity: 'Surabaya',
//     transport: 'Pesawat',
//     totalCost: 247500 },
//   { name: 'Alex',
//     departureCity: 'Yogyakarta',
//     destinationCity: 'Semarang',
//     transport: 'Kereta',
//     totalCost: 225000 } ]
// */
console.log(
  "==================================================================================================",
);
console.log(
  travelingIndonesia(
    ["Andika-Denpasar-Surabaya-Bis", "Katy-Surabaya-Denpasar-Pesawat"],
    "Gopay",
  ),
);
// /*
// [ { name: 'Katy',
//     departureCity: 'Surabaya',
//     destinationCity: 'Denpasar',
//     transport: 'Pesawat',
//     totalCost: 261250 },
//   { name: 'Andika',
//     departureCity: 'Denpasar',
//     destinationCity: 'Surabaya',
//     transport: 'Bis',
//     totalCost: 213750 } ]
// */
console.log(
  "==================================================================================================",
);
console.log(travelingIndonesia(["Putra-Denpasar-Yogyakarta-Pesawat"], "Cash"));
// /*
// [ { name: 'Putra',
//     departureCity: 'Denpasar',
//     destinationCity: 'Yogyakarta',
//     transport: 'Pesawat',
//     totalCost: 825000 } ]
// */
console.log(travelingIndonesia([], "Cash")); // [];
