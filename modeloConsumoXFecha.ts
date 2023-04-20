import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'

@modelOptions({
    "schemaOptions": {
        "collection": "consumoXFecha"
    }
})
class consumoXFecha {
    @prop()
    calorias!: number

    @prop()
    dia!: number

}

export const modeloConsumoXFecha = getModelForClass(consumoXFecha)