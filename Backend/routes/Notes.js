const express = require('express');
const router = express.Router();
const Protect = require('../middleware/auth');
const { Getallnotes, Createnote, getnote, updatenote, Deletenote } = require('../controller/Notecontroller');


router.get('/', Protect , Getallnotes)
router.post('/',Protect, Createnote)
router.get('/:id',Protect,getnote);
router.put('/:id',Protect,updatenote);
router.delete('/:id',Protect,Deletenote)




module.exports = router