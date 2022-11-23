/** load express js */
const express = require(`express`)
/** create object of express */
const app = express()
/** load obat controller */
const adminController = require(`../controllers/admin.controller`)
/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))
/** create route for access obat's data */
app.get("/", adminController.showAdmin)
/** create route for show add obat view */
app.get("/add", adminController.showTambahData)
/** create route for process of add new  */
app.post("/add", adminController.processTambahData)
/** create route for show edit obat view */
app.get("/edit/:id",adminController.showEditPage)
/** create route for process edit  */
app.post("/edit/:id",adminController.processUpdate)

/** create route for process delete  */
app.get("/delete/:id",adminController.processDelete)

/** export object "app" to another file */
module.exports = app