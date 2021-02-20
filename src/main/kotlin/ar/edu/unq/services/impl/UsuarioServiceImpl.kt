package ar.edu.unq.services.impl

import ar.edu.unq.dao.UsuarioDAO
import ar.edu.unq.modelo.Usuario
import ar.edu.unq.services.UsuarioService
import ar.edu.unq.services.impl.exceptions.*
import ar.edu.unq.services.runner.DataBaseType
import ar.edu.unq.services.runner.TransactionRunner
import ar.edu.unq.services.runner.TransactionType

class UsuarioServiceImpl(
    private val usuarioDAO: UsuarioDAO,
    private val dataBaseType: DataBaseType
) : UsuarioService {

    override fun recuperarUsuario(id: String): Usuario {
        return TransactionRunner.runTrx({
            this.obtenerUsuario(id)
        }, listOf(TransactionType.MONGO), this.dataBaseType)
    }

    override fun recuperarUsuario(dni: Int): Usuario {
        return TransactionRunner.runTrx({
            this.usuarioDAO.findEq("dni",dni).firstOrNull()?: throw UsuarioInexistenteException("El usuario no existe")
        }, listOf(TransactionType.MONGO), this.dataBaseType)
    }

    override fun crearUsuario(usuario: Usuario) {
        TransactionRunner.runTrx({
            this.asegurarQueUsuarioNoExista(usuario.id.toString())
            this.asegurarQueUsuarioNoExista(usuario.dni)
            this.validateDni(usuario.dni)
            this.usuarioDAO.save(usuario)
        }, listOf(TransactionType.MONGO), this.dataBaseType)
    }

    override fun recuperarATodosLosUsuarios(): Collection<Usuario> {
        return TransactionRunner.runTrx({ this.usuarioDAO.getAll() }, listOf(TransactionType.MONGO), this.dataBaseType)
    }

    private fun obtenerUsuario(id: String): Usuario{
        val usuarioRecuperado = this.usuarioDAO.get(id)
        return usuarioRecuperado?:throw UsuarioInexistenteException("El usuario no existe")
    }
    private fun asegurarQueUsuarioNoExista(id: String) {
        val usuario = this.usuarioDAO.get(id)
        if(usuario != null){
            throw UsuarioExistenteException("El usuario ya existe")
        }
    }
    private fun asegurarQueUsuarioNoExista(dni: Int) {
        val usuario = this.usuarioDAO.findEq("dni", dni).firstOrNull()
        if(usuario != null){
            throw UsuarioExistenteException("El usuario ya existe")
        }
    }

    private fun validateDni(dni: Int) {
        if(dni<1000000){
            throw UsuarioConDniInvalidoException("DNI invalido, debe ser un numero con 7 u 8 digitos")
        }
    }

    override fun deleteAll() {
        TransactionRunner.runTrx({ this.usuarioDAO.deleteAll() }, listOf(TransactionType.MONGO), this.dataBaseType)
    }
}