package ar.edu.unq.dao

import ar.edu.unq.modelo.Settings

interface SettingsDAO {
    fun save(anObject: Settings)
    fun save(objects: List<Settings>)
    fun update(anObject: Settings, id: String?)
    fun get(id: String?): Settings?
    fun getAll() : List<Settings>
    fun deleteAll()//TODO:sacar
//    fun saveOrUpdate(productos: List<Producto>, dataBaseType: DataBaseType)
    fun delete(id: String)
}