package ar.edu.unq.dao

import ar.edu.unq.modelo.Proveedor

interface ProveedorDAO {
    fun save(anObject: Proveedor)
    fun save(objects: List<Proveedor>)
    fun update(anObject: Proveedor, id: String?)
    fun get(id: String?): Proveedor?
    fun getAll() : List<Proveedor>
    fun deleteAll()
    fun delete(id: String)
}