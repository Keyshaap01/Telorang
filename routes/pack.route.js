/** load express js */
const express = require(`express`)
/** create object of express */
const app = express()
/** load obat controller */
const packController = require(`../controllers/pack.controller`)
/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))
/** create route for access obat's data */
app.get("/", packController.showPack)
/** create route for show add obat view */
app.get("/add", packController.showTambahData)
/** create route for process of add new obat */
app.post("/add", packController.processTambahData)
/** create route for show edit obat view */
app.get("/edit/:id",packController.showEditPage)
/** create route for process edit obat */
app.post("/edit/:id",packController.processUpdate)

/** create route for process delete obat */
app.get("/delete/:id",packController.processDelete)

/** export object "app" to another file */
module.exports = app