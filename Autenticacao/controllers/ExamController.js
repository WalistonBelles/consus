var Exam = require("../models/Exam");

class ExamController{
    async index(req, res){
        var Exams = await Exam.findAll();
        res.json(Exams);
    }
}

module.exports = new ExamController();