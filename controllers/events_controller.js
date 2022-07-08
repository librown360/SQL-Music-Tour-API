// Dependencies
const events = require('express').Router()
const db = require('../models')
const { Event } = db
const { Op } = require('sequelize')

// Find all events
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [ ['date', 'ASC'] ],
            where: { 
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
             }
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Find a specific event
events.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { event_id: req.params.id }
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Create a new event
events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(201).json({
            message: 'Event successfully created',
            data: newEvent
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// Update an event
events.put('/:id', async (req, res) => {
    try {
        const updateEvent = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Event ${updateEvent} successfully updated`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// Delete an event
events.delete('/:id', async (req, res) => {
    try {
        const deleteEvent = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Event ${deleteEvent} successfully deleted`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// Export module
module.exports = events