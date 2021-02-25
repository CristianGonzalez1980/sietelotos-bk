package ar.edu.unq.modelo

import org.bson.types.ObjectId


class Settings : ModelObjectWithBsonId{
    lateinit var idSettings: ObjectId
    var backgroundColor: String = "#b80090"

    constructor()

    constructor(
        backgroundColor: String
    ) {
        this.backgroundColor = backgroundColor
    }
//
//    override fun castearAMiTipo(other: Any): Producto {
//        return other as Producto
//    }
}