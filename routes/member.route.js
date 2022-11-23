/** load express js */
const express = require(`express`)
/** create object of express */
const app = express()
/** load obat controller */
const memberController = require(`../controllers/member.controller`)
const authorization = require(`../middleware/authorization`)
/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))
/** create route for access obat's data */
app.get("/",authorization.cekUser, memberController.showMember)
/** create route for show add obat view */
app.get("/add", authorization.cekUser,memberController.showTambahData)
/** create route for process of add new obat */
app.post("/add", authorization.cekUser,memberController.processTambahData)
/** create route for show edit obat view */
app.get("/edit/:id",authorization.cekUser,memberController.showEditPage)
/** create route for process edit obat */
app.post("/edit/:id",authorization.cekUser,memberController.processUpdate)

/** create route for process delete obat */
app.get("/delete/:id",authorization.cekUser,memberController.processDelete)

/** export object "app" to another file */
module.exports = app