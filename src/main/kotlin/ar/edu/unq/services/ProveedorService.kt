package ar.edu.unq.services

import ar.edu.unq.modelo.Proveedor

interface ProveedorService {
    fun crearProveedor(proveedor: Proveedor)
    fun recuperarProveedor(id: String): Proveedor
    fun recuperarATodosLosProveedores(): Collection<Proveedor>
    fun actualizarProveedor(proveedor: Proveedor)
    fun borrarProveedor(id: String)
    fun deleteAll()
}