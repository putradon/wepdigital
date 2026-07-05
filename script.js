let data = JSON.parse(localStorage.getItem("kasir")) || [];

tampilkanData();

function tambahData(){

    let nama = document.getElementById("nama").value;
    let harga = parseInt(document.getElementById("harga").value);
    let jumlah = parseInt(document.getElementById("jumlah").value);

    if(nama=="" || isNaN(harga) || isNaN(jumlah) || jumlah<=0){

        alert("Lengkapi data terlebih dahulu!");

        return;

    }

    data.push({

        nama:nama,
        harga:harga,
        jumlah:jumlah

    });

    simpanData();

    document.getElementById("nama").value="";
    document.getElementById("harga").value="";
    document.getElementById("jumlah").value="";

}

function tampilkanData(){

    let tabel=document.getElementById("tabelData");

    tabel.innerHTML="";

    let total=0;

    data.forEach((item,index)=>{

        let subtotal=item.harga*item.jumlah;

        total+=subtotal;

        tabel.innerHTML+=`

        <tr>

        <td>${index+1}</td>

        <td>${item.nama}</td>

        <td>Rp ${item.harga.toLocaleString("id-ID")}</td>

        <td>${item.jumlah}</td>

        <td>Rp ${subtotal.toLocaleString("id-ID")}</td>

        <td>

        <button class="edit"
        onclick="editData(${index})">

        Edit

        </button>

        <button class="hapus"
        onclick="hapusData(${index})">

        Hapus

        </button>

        </td>

        </tr>

        `;

    });

    document.getElementById("total").innerHTML=
    "Total : Rp "+total.toLocaleString("id-ID");

    document.getElementById("totalBayar").innerHTML=
    "Total Pembayaran : Rp "+total.toLocaleString("id-ID");

}

function editData(index){

    let nama=prompt("Nama Menu",data[index].nama);

    if(nama==null)return;

    let harga=prompt("Harga",data[index].harga);

    if(harga==null)return;

    let jumlah=prompt("Jumlah",data[index].jumlah);

    if(jumlah==null)return;

    data[index].nama=nama;
    data[index].harga=parseInt(harga);
    data[index].jumlah=parseInt(jumlah);

    simpanData();

}

function hapusData(index){

    if(confirm("Hapus data ini?")){

        data.splice(index,1);

        simpanData();

    }

}

function resetData(){

    if(confirm("Yakin ingin menghapus semua data?")){

        data=[];

        simpanData();

    }

}

function simpanData(){

    localStorage.setItem("kasir",JSON.stringify(data));

    tampilkanData();

}

function lanjutPembayaran(){

    document.querySelector(".container").style.display="none";

    document.getElementById("halamanQris").style.display="block";

}

function kembali(){

    document.querySelector(".container").style.display="block";

    document.getElementById("halamanQris").style.display="none";

}