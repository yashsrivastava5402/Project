const express = require('express');
const patientController = require('../controllers/Patient');
const fileController = require('../controllers/files');
const router = express.Router();

router.post('/addPatient', patientController.addPatient);
router.post('/patientLogin', patientController.patientLogin);
router.post('/uploadFiles', fileController.uploadFiles);
router.post('/viewFiles', fileController.viewFiles);
router.get('/fileDownload/:id/:hash', fileController.fileDownload);

module.exports = router;