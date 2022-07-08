// Dependencies
const stages = require('express').Router()
const db = require('../models')
const { Stage } = db
const { Op } = require('sequelize')

// Find all stages
stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll({
            where: {
                stage_name: { [Op.like]: `%${req.query.stage_name ? req.query.stage_name : ''}%` }
            }
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Find a specific stage
stages.get('/:id', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { stage_id: req.params.id }
        })
        res.status(200).json(foundStage)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Create a new stage
stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(201).json({
            message: 'Stage successfully created',
            data: newStage
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// Update a stage
stages.put('/:id', async (req, res) => {
    try {
        const updateStage = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Stage ${updateStage} successfully updated`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// Delete a stage
stages.delete('/:id', async (req, res) => {
    try {
        const deleteStage = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Stage ${deleteStage} successfully deleted`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// Export module
module.exports = stages