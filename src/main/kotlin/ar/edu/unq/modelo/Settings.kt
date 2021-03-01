package ar.edu.unq.modelo

import org.bson.types.ObjectId


class Settings : ModelObjectWithBsonId{
    var backgroundColor: String = "#b80090"
    var backgroundColorFooter: String = "#b80090"
    var backgroundColorSide: String = "#b80090"
    var backgroundColorWrapp: String = "#b80090"
    var backgroundColorCardLogin: String = "b80090"
    constructor()

    constructor(backgroundColor: String, backgroundColorFooter: String, backgroundColorSide: String, backgroundColorWrapp: String, backgroundColorCardLogin: String) {
        this.backgroundColor = backgroundColor
        this.backgroundColorFooter = backgroundColorFooter
        this.backgroundColorSide = backgroundColorSide
        this.backgroundColorWrapp = backgroundColorWrapp
        this.backgroundColorCardLogin = backgroundColorCardLogin
    }
//
//    override fun castearAMiTipo(other: Any): Producto {
//        return other as Producto
//    }
}