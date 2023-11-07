const express = require('express')
const teaController = require('./tea.controller')

const teaRouter = express.Router()

teaRouter.get('/', teaController.getAllTeas)
teaRouter.get('/:teaID', teaController.getOneTea)
teaRouter.post('/', teaController.createTea)
//teaRouter.delete('/:teaID', teaController.deleteTea)

module.exports = {
    teaRouter
}