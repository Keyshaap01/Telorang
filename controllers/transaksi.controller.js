
const adminModel = require(`../models/admin.model`)
const memberModel = require(`../models/member.model`)
const telurModel = require(`../models/telur.model`)
const packModel = require(`../models/pack.model`)
// memanggil model transaksi
const transaksiModel = require(`../models/transaksi.model`)
// memamggil model detail transaksi
const detailModel = require(`../models/detail_transaksi.model`)
const { request, response } = require("../routes/transaksi.route")

/** function utk menampilkan form transaksi */
exports.showFormTransaksi = async (request, response) => {
    try {
        /**ambil data  */
        let member = await memberModel.findAll()
        let telur = await telurModel.findAll()
        let pack = await packModel.findAll()
        /**prepare data yg di pasingbke view */
        let sendData = {
            dataTelur: telur,
            dataMember: member,
            dataPack: pack,
            page: `form-transaksi`,
            tgl_transaksi: ``,
            dataTelurString: JSON.stringify(telur),
            dataPackString: JSON.stringify(pack),
            dataUser: request.session.dataUser,
            cart: request.session.cart
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
/**membuat fungsi menambahkan telur ke keranjang */
exports.addToCart = async (request, response) => {
    try {
        // dapetin data telur berdasar id telur yg dikirimksm
        let selectedTelur = await telurModel.findByCriteria({
            id: request.body.id_telur,

        })
        let selectedPack = await packModel.findAll({
            id: request.body.id_pack,

        })
        /**tampung data yg dikirimkan */
        let storeData =
        {
            id_telur: request.body.id_telur,
            jenis_telur: selectedTelur[0].jenis_telur,
            jumlah_telur: request.body.jumlah_telur,
            id_pack: request.body.id_pack,
            nama_pack : selectedPack[0].nama_pack,
            jumlah_pack : request.body.jumlah_pack,
            harga_telur : request.body.harga_telur,
            harga_pack : request.body.harga_pack,
        }
        /**masukkan data kek keranjang dengan session */
        request.session.cart.push(storeData)
        /**push()-> menambah/memasukkan data kedalam arry cart*/
        /**direct ke hlmn form-transaksi */
        return response.redirect(`/transaksi/add`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

//membuat function menghapuss item pada kreranjang
exports.hapusCart = async (request, response) => {
    try {
        // ambil seluruh dat char pada session
        let cart = request.session.cart
        //ambil id obat yg akan dihapus
        let id_telur = request.params.id;
        //cari tahu posisi index dari data yg akan dihapus
        let index = cart.findIndex(item => item.id_telur == id_telur)
        // hapus dat ssesuai index
        cart.splice(index, 1)
        //splice digunakan untuk menghapus pada array
        // kembalikan data chart nya pada session
        request.session.cart = cart
        //direct ke halaman form transaksi
        return response.redirect(`/transaksi/add`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
// function menyimpan daat transaksi
exports.simpanTransaksi = async (request, response) => {
    try {
        // tampung data yg dikirimkan
        //membuat objek newtransaksi
        let newTransaksi = {
            tgl_transaksi: request.body.tgl_transaksi,
            id_member: request.body.id_member,
            id_admin: request.session.dataUser.id
        }
        // simpan transaksi
        let resultTransaksi = await transaksiModel.add(newTransaksi)//add menambahkan ke dtbse
        // menampung isi cart
        let cart = request.session.cart
        //cart length mengulang
        for (let i = 0; i < cart.length; i++) {
            // hapus key "nama_obat" dari cart
            //dihapus karna gaada di database detail transaksi 
            delete cart[i].jenis_telur
            delete cart[i].nama_pack
            // tambahi key id transaksi kedalam cart dari transaksi yg baru disimpan/autoincrement
            cart[i].id_transaksi = resultTransaksi.insertId
            // eksekusi simpan cart ke detail_transaksi
            await detailModel.add(cart[i])
        }
        // hapus cart/kosongkan
        request.session.cart = []
        // direct ke hlmn form transaksi lagi
        return response.redirect(`/transaksi/add`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
//  fungsi menampilkan data transaksi
exports.showTransaksi = async (request, response) => {
    try {
        /**ambil data transaksi */
        let transaksi = await transaksiModel.findAll()
        /**sisipin data detail dari setiap transaksi */
        for (let i = 0; i < transaksi.length; i++) {
            /**ambil id transaksi */
            let id = transaksi[i].id
            /**ambil data detailnya sesuai id */
            let detail = await detailModel.findByCriteria({ id_transaksi: id })
            /**sisipin detail ke trasaksi */
            transaksi[i].detail = detail


        }
        //  prepare data yg dikirim ke view
        let sendData = {
            page: `transaksi`,
            dataUser: request.session.dataUser,
            transaksi: transaksi
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
/**function utk menghapus data transaksi */
exports.hapusTransaksi = async (request, response) => {
    try {
        let id = request.params.id
        /**menghapus data detail transaksi */
        await detailModel.delete({ id_transaksi: id })
        /**menghapus data transaksi */
        await transaksiModel.delete({ id: id })
        /**kembali ke halaman transaksi */
        return response.redirect(`/transaksi`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}