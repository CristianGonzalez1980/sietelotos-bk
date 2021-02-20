package ar.edu.unq.services

import ar.edu.unq.modelo.Admin

interface AdminService {
    fun recuperarAdmin(id: String): Admin
    fun crearAdmin(admin: Admin)
    fun recuperarATodosLosAdmin(): Collection<Admin>
    fun recuperarAdmin(userName: String?, password: String?): Admin
    fun deleteAll()
}
