import { Schema, model } from "mongoose";

interface IPerson {
    name: string,
    age: number,
}

const personSchema = new Schema<IPerson>({
    name: {type:String, required:true},
    age: {type:Number, required:true},
},{timestamps:true})

export const Person = model<IPerson>('Person', personSchema)