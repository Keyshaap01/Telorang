/** load express js */
const express = require(`express`)
/** create object of express */
const app = express()
/** load obat controller */
const telurController = require(`../controllers/telur.controller`)
/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))
/** create route for access obat's data */
app.get("/", telurController.showTelur)
/** create route for show add obat view */
app.get("/add", telurController.showTambahData)
/** create route for process of add new obat */
app.post("/add", telurController.processTambahData)
/** create route for show edit obat view */
app.get("/edit/:id",telurController.showEditPage)

/** create route for process edit obat */
app.post("/edit/:id",telurController.processUpdate)

/** create route for process delete obat */
app.get("/delete/:id",telurController.processDelete)

/** export object "app" to another file */
module.exports = app