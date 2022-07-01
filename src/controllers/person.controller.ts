import { Request, Response } from "express";

// Import Person constructor from Person model
import { Person } from '../models/person.model'

/**
 * Get all documents from Person collection
 * @param req req - Node.js http request
 * @param res res - Node.js http request
 * @returns HTTP response
 */
export const read = async (req: Request, res: Response) => {
    try{
        // Find all documents from Person collection and store it in { person } variable 
        const person = await Person.find()

        // Success Response
        console.log('Reading Person...')
        return res.status(200).send({
            error: false,
            person
        })
    }
    catch(error){
        // Error Respones
        console.error('read-error', error)
        return res.status(500).send({
            error: true,
            message: 'Something went wrong while reading data. Please try again.'
        })
    }
}

/**
 * Create a documents in Person collections
 * @param req req - Node.js http request
 * @param res res - Node.js http request
 * @returns HTTP response
 */
export const create = async (req: Request, res: Response) => {
    try{
        // Saving new document to Person collection
        await new Person(req.body).save()

        // Success Response
        console.log('Creating Person...')
        return res.status(200).send({
            error: false,
            message: 'Successfuly added a person to database.'
        })
    }
    catch(error){
        // Error Respones
        console.error('create-error', error)
        return res.status(500).send({
            error: true,
            message: 'Something went wrong while creating data. Please try again.'
        })
    }
}

/**
 * Update a document from Person collection based on id provided
 * @param req req - Node.js http request
 * @param res res - Node.js http request
 * @returns HTTP response
 */
export const update = async (req: Request, res: Response) => {
    try{
        const { id, name, age } = req.body

        // Find person document by id and update person { name, age } from the document
        await Person.findByIdAndUpdate(id, {
            $set: {
                name,
                age
            }
        })

        // Success Response
        console.log('Updating Person...')
        return res.status(200).send({
            error: false,
            message: 'Successfuly updated person information.'
        })
    }
    catch(error){
        // Error Respones
        console.error('update-error', error)
        return res.status(500).send({
            error: true,
            message: 'Something went wrong while updating data. Please try again.'
        })
    }
}

/**
 * Delete a document from Person collection based on id provided
 * @param req req - Node.js http request
 * @param res res - Node.js http request
 * @returns HTTP response
 */
export const clear = async (req: Request, res: Response) => {
    try{
        const { id } = req.body
        
        // Delete person document based on { id } provided
        await Person.findByIdAndDelete(id)

        // Success Response
        console.log('Deleting Person...')
        return res.status(200).send({
            error: false,
            message: 'Successfully delete person information.'
        })
    }
    catch(error){
        // Error Respones
        console.error('delete-error', error)
        return res.status(500).send({
            error: true,
            message: 'Something went wrong while deleting data. Please try again.'
        })
    }
}