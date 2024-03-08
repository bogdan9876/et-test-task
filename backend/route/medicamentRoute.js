const express = require('express');
const router = express.Router();
const medicamentController = require('../controller/medicamentController');

router.get('/', medicamentController.getAllMedicaments);
router.get('/:id', medicamentController.getMedicamentById);
router.post('/', medicamentController.createMedicament);
router.put('/:id', medicamentController.updateMedicament);
router.delete('/:id', medicamentController.deleteMedicament);

module.exports = router;
