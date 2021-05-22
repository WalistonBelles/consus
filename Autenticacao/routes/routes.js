var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var RoleController = require("../controllers/RoleController");
var AdressController = require("../controllers/AdressController");
var SpecialtyController = require("../controllers/SpecialtyController");
var DoctorController = require("../controllers/DoctorController");
var ScheduleController = require("../controllers/ScheduleController");
var RequestingUnitController = require("../controllers/RequestingUnitController");
var AdminAuth = require("../middleware/AdminAuth");

router.get('/', HomeController.index);
router.post('/user', UserController.create);
router.get("/user",AdminAuth,UserController.index);
router.get("/user/:id",AdminAuth,UserController.findUser);
router.put("/user",AdminAuth,UserController.edit);
router.delete("/user/:id",AdminAuth,UserController.remove);
router.post("/recoverpassword",UserController.recoverPassword);
router.post("/changepassword",UserController.changePassword);
router.post("/login",UserController.login);
router.post("/validate", AdminAuth,HomeController.validate);
router.post("/role", RoleController.create);
router.post("/adress", AdressController.create);
router.get("/specialty", SpecialtyController.index);
router.post("/doctor", DoctorController.create);
router.get("/user",AdminAuth,UserController.index);
router.post("/schedule", ScheduleController.create);
router.get("/requestingUnit", RequestingUnitController.index);

module.exports = router;