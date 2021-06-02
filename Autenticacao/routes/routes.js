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
var PerformerUnitController = require("../controllers/PerformerUnitController");
var ExamController = require("../controllers/ExamController");
var ConsultationHistory = require("../controllers/ConsultationHistoryController");
var QueryController = require("../controllers/QueryController");
var PatientController = require("../controllers/PatientController");
var AdminAuth = require("../middleware/AdminAuth");
var DoctorAuth = require("../middleware/DoctorAuth");
var EmployeeAuth = require("../middleware/EmployeeAuth");

var multer = require('multer');
var upload = multer({ dest: './uploads/' });

// Upload
router.post('/upload', upload.array('file'), async (req, res) => {
    console.log(req.files.fieldSize);
    res.send({ upload: true, files: req.files });
});

// Tela Inicial
router.get('/', HomeController.index);
router.post("/login", UserController.login);
router.post("/recoverpassword", UserController.recoverPassword);
router.post("/changepassword", UserController.changePassword);

// Área de Funcionário
router.get('/confirmEmployee', EmployeeAuth, DoctorController.index);
router.post('/patient', PatientController.create);
router.post("/adress", AdressController.create);
router.post("/consultationhistory", ConsultationHistory.create);
router.post("/patientcpf", ConsultationHistory.index);
router.post("/usermedico", ConsultationHistory.indexMedico);
router.post("/query", QueryController.create);
router.get("/requestingUnit", RequestingUnitController.index);
router.post("/performerUnit", PerformerUnitController.findUnit);
router.get("/exam", ExamController.index);
router.post("/consultas", ScheduleController.findAllConsultas);

// Área de Médico
router.get('/confirmDoctor', DoctorAuth, DoctorController.index);
router.post('/doctorsConsults', DoctorController.listAllConsults);
router.post("/answerInquiry", QueryController.index);
router.get("/querys", QueryController.indexConsultas);
router.put("/query", QueryController.edit);

// Área de Administrador
router.get("/user", AdminAuth, UserController.index);
router.post('/user', AdminAuth, UserController.create);
router.get("/user/:id", AdminAuth, UserController.findUser);
router.get("/patient/:id", AdminAuth, PatientController.findUser);
router.get("/specialty", SpecialtyController.index);
router.get("/doctor", AdminAuth, DoctorController.index);
router.get("/consultationhistory", AdminAuth, ConsultationHistory.indexConsultas);
router.get("/user", UserController.index);
router.put("/user", AdminAuth, UserController.edit);
router.delete("/user/:id",AdminAuth, UserController.remove);
router.post("/validate", HomeController.validate);
router.post("/role", RoleController.create);
router.post("/doctor", DoctorController.create);
router.post("/schedule", ScheduleController.create);

module.exports = router;