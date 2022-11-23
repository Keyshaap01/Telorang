
const telurModel = require(`../models/telur.model`)
// menampilkan data telur
exports.showTelur = async (request, response) => {
    try {
        /** get data obat using model */
        let dataTelur = await telurModel.findAll()
        /** send data to view */
        let sendData = {
            page: `telur`,
            data: dataTelur,
            dataUser: request.session.dataUser,
        }
        /** set view page for this function */
        return response.render(`../views/index`, sendData)
    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}



exports.showTambahData = (request, response) => {
    let sendData = {
        page: `form-telur`, // page that will be show
        /** set empty data because this is add feature */
        jenis_telur: ``,
        harga: ``,
        stok: ``,
        dataUser: request.session.dataUser,
        /** set target route for submit filled data */
        targetRoute: `/telur/add`
    }

    /** set view page for this function */
    return response.render(`../views/index`, sendData)
}

exports.processTambahData = async (request, response) => {
    try {
        /** reading telur's data from user that has sent */
        let newTelur = {
            jenis_telur: request.body.jenis_telur,
            harga: request.body.harga,
            stok: request.body.stok,
        }

        /** call function for insert to table of telur */
        await telurModel.add(newTelur)

        /** redirect to telur's page */
        return response.redirect(`/telur`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.showEditPage = async (request, response) => {
    /** read selected ID from URL parameter */
    let selectedID = request.params.id
    //id dpt dr id routes

    /** store selected ID to object "parameter",dibungkus */
    let parameter = {
        id: selectedID // 'id' is similar as column's name of table
    }

    /** call function for get data from database based on seleced id */
    let selectedData = await telurModel.findByCriteria(parameter)

    /** prepare data to send to view page  */
    let sendData = {
        page: `form-telur`, // page that will be show
        /** set each data based on data that will be change [0]->karna yg diambil data pertama*/
        jenis_telur: selectedData[0].jenis_telur,
        harga: selectedData[0].harga,
        stok: selectedData[0].stok,
        dataUser: request.session.dataUser,
      
        /** set target route for submit filled data */
        targetRoute: `/telur/edit/${selectedID}`,
    }

    /** set view page for this function */
    return response.render(`../views/index`, sendData)

}
/** -------------------------------------
 * create function to handle request
 * with url: /obat/edit with method POST
 */

exports.processUpdate = async (request, response) => {
    try {
        /** read selected ID from URL parameter */
        let selectedID = request.params.id

        /** store selected ID to object "parameter" */
        let parameter = {
            id: selectedID // 'id' is similar as column's name of table
        }

        /** reading obat's data from user that has sent */
        let newTelur = {
            jenis_telur: request.body.jenis_telur,
            harga: request.body.harga,
            stok: request.body.stok,

        }

        /** call function for update to table of obat */
        await telurModel.update(newTelur, parameter)

        /** redirect to obat's page */
        return response.redirect(`/telur`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.processDelete = async (request, response) => {
    try {
        /** read selected ID from URL parameter */
        let selectedID = request.params.id

        /** store selected ID to object "parameter" */
        let parameter = {
            id: selectedID // 'id' is similar as column's name of table
        }

        /** call function for delete data table of obat */
        await telurModel.delete(parameter)

        /** redirect to telur's page */
        return response.redirect(`/telur`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.processDelete = async (request, response) => {
    try {
        /** read selected ID from URL parameter */
        let selectedID = request.params.id

        /** store selected ID to object "parameter" */
        let parameter = {
            id: selectedID // 'id' is similar as column's name of table
        }

        /** call function for delete data table of obat */
        await telurModel.delete(parameter)

        /** redirect to obat's page */
        return response.redirect(`/telur`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}





