import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'

@modelOptions({
    "schemaOptions": {
        "collection": "alimento"
    }
})
class Alimento {
    @prop()
    name!: string

    @prop()
    calorias!: number

}

export const modeloAlimento = getModelForClass(Alimento)