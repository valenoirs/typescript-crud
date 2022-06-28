import { Request, Response } from "express";

import { Person } from '../models/model'

export const read = async (req: Request, res: Response) => {
    try{
        const person = await Person.find()

        console.log('Reading Person...')
        res.status(200).send({
            error: false,
            person
        })
    }
    catch(e){
        console.error('read-error', e)
        res.status(500).send({
            error: true,
            message: 'Something went wrong while reading data. Please try again.'
        })
    }
}

export const create = async (req: Request, res: Response) => {
    try{
        await new Person(req.body).save()

        console.log('Creating Person...')
        res.status(200).send({
            error: false,
            message: 'Successfuly added a person to database.'
        })
    }
    catch(e){
        console.error('create-error', e)
        res.status(500).send({
            error: true,
            message: 'Something went wrong while creating data. Please try again.'
        })
    }
}

export const update = async (req: Request, res: Response) => {
    try{
        const { id, name, age } = req.body

        await Person.findByIdAndUpdate(id, {
            $set: {
                name,
                age
            }
        })

        console.log('Updating Person...')
        res.status(200).send({
            error: false,
            message: 'Successfuly updated person information.'
        })
    }
    catch(e){
        console.error('update-error', e)
        res.status(500).send({
            error: true,
            message: 'Something went wrong while updating data. Please try again.'
        })
    }
}

export const clear = async (req: Request, res: Response) => {
    try{
        const { id } = req.body
        await Person.findByIdAndDelete(id)

        console.log('Deleting Person...')
        res.status(200).send({
            error: false,
            message: 'Successfully delete person information.'
        })
    }
    catch(e){
        console.error('delete-error', e)
        res.status(500).send({
            error: true,
            message: 'Something went wrong while deleting data. Please try again.'
        })
    }
}