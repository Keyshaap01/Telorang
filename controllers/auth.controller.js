/**load model apoteker */
const adminModel = require(`../models/admin.model`)
/**load crypt */
const crypt = require(`../crypto`)
const { request, response } = require("express")

/**function menampilkan halaman login */
exports.showLogin = (request, response) => {
    try {
        return response.render(`../views/pages/login`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }

}
/**function proses autentication */
exports.authentication = async (request, response) => {
    try {
        /**tampung data username password */
        let username = request.body.username
        let password = request.body.password
        console.log(`${username} - ${password}`);


        /**cek kecocokan username */
        let result = await adminModel.findByCriteria({ username: username })
                                                      //database
        /**cek keberadaan data apoteker */
        //result lengt= jumlah/size ,objek admin yg isinya sesuai,length untuk array
        if (result.length > 0) {
            console.log(result);
            /**cek kecocokan pw 
             * 123 === crypt.deskripsi(sxsxsxsxd)
             * l    
             * result = array
            */
           
            if (password === crypt.deskripsi(result[0].password)) {
                /**login berhasil                      database kolom
                 * deskripsi untuk 
                 */
                /**menipan data user ke sesiion=menyimpan data sementara di server */
                /**`user data` = label of session */
                request.session.dataUser = result[0]  
                // console.log(result[0]);
                request.session.cart = []//-> arry menyimpan banyak data barang
                return response.redirect(`/telur`)
                /**definisi cart di session */
                

            } else {
                /**login gagal */
                return response.redirect(`/auth`)
            }

        } else {
            return response.redirect(`/auth`)
        }

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
/**Fungsi utk logout */
exports.logout = async(request,response) => {
    try {
        /**menghapus data user dari session */
        request.session.dataUser = undefined
        /**kembali halaman login */
        return response.redirect(`/auth`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}