let studentCotroller = require('./student.controller')
module.exports.getStudent = studentCotroller.getStudent
module.exports.addStudent = studentCotroller.addStudent
module.exports.updateStudent = studentCotroller.updateStudent
module.exports.removeStudent = studentCotroller.removeStudent
module.exports.getStudents = studentCotroller.getStudents
module.exports.addStudentsFromCSV = studentCotroller.addStudentsFromCSV
module.exports.uploadStudents = studentCotroller.uploadStudents
