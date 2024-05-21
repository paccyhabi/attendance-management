const institutionController = require('../controller/institutionController.js')
const {checkToken} = require('../auth/tokenValidation.js')
const router2 = require('express').Router()
router2.post('/addInstitution',checkToken,institutionController.addInstitution)
router2.get('/allInstitutions',checkToken,institutionController.getAllInstitutions)


router2.get('/:id',checkToken,institutionController.getOneInstitution)
router2.put('/:id',checkToken,institutionController.updateInstitution)
router2.patch('/:id',checkToken,institutionController.updateInstitutionn)
router2.delete('/:id',checkToken,institutionController.deleteInstitution)
module.exports = router2