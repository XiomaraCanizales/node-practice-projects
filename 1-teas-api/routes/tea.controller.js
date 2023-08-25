const teasModel = require('../models/teas.model')

// GET functions
function getAllTeas(req, res) {
    res.json(teasModel)
}

function getOneTea(req, res) {
    const id = Number(req.params.teaID) - 1
    const tea = teasModel[id]

    if (!tea) {
        return res.status(404).send('Tea not found')
    }
    res.json(tea)
}

// POST functions
function createTea(req, res) {
    const newTea = {
        id: teasModel.length + 1,
        name: req.body.name,
        comment: req.body.comment
    }
    teasModel.push(newTea)
    res.status(201).json(newTea)
}

// DELETE function
// doesnt work
/* function deleteTea(req, res) {
    const id = Number(req.params.teaID) - 1
    console.log(teasModel[id])
    if (!teasModel.includes(id)) {
      // The tea with the specified ID was not found.
      res.status(404).json(`tea not found`)
      return
    }
  
    const index = teasModel.findIndex((tea) => tea.id === id)
    teasModel.splice(index, 1)
    res.status(200).json(`tea deleted`)
} */

module.exports = {
    getAllTeas,
    getOneTea,
    createTea
}