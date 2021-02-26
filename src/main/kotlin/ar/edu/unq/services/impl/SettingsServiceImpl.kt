package ar.edu.unq.services.impl

import ar.edu.unq.dao.SettingsDAO
import ar.edu.unq.modelo.Settings
import ar.edu.unq.services.SettingsService
import ar.edu.unq.services.impl.exceptions.ProveedorExistenteException
import ar.edu.unq.services.impl.exceptions.SettingsInexistenteException
import ar.edu.unq.services.runner.DataBaseType
import ar.edu.unq.services.runner.TransactionRunner
import ar.edu.unq.services.runner.TransactionType

class SettingsServiceImpl(
    private val settingsDAO: SettingsDAO,
    private val dataBaseType: DataBaseType
) : SettingsService {
    override fun newSettings(settings: Settings) {
        TransactionRunner.runTrx({
            this.asegurarQueSettingsNoExista(settings.id.toString())
            this.settingsDAO.save(settings)
        }, listOf(TransactionType.MONGO), this.dataBaseType)
    }

    private fun asegurarQueSettingsNoExista(id: String) {
        if(this.settingsDAO.get(id) != null){
            throw ProveedorExistenteException("El proveedor ya existe")
        }
    }

    override fun actualizarSettings(settings: Settings) {
        TransactionRunner.runTrx({
            this.obtenerSettings(settings.id.toString())
            this.settingsDAO.update(settings, settings.id.toString())
        }, listOf(TransactionType.MONGO), this.dataBaseType)
    }

    private fun obtenerSettings(id: String): Settings{
        val settingsRecuperado = this.settingsDAO.get(id)
        return settingsRecuperado?:throw SettingsInexistenteException("No existe Settings")
    }

    override fun recuperarSettings(id: String): Settings {
        return TransactionRunner.runTrx({
            this.obtenerSettings(id)
        }, listOf(TransactionType.MONGO), this.dataBaseType)
    }

    override fun recuperarAllSettings(): Collection<Settings> {
        return TransactionRunner.runTrx({
            this.settingsDAO.getAll()
        }, listOf(TransactionType.MONGO), this.dataBaseType)
    }
    override fun deleteAll() {
        TransactionRunner.runTrx({
            this.settingsDAO.deleteAll()
        }, listOf(TransactionType.MONGO), this.dataBaseType)
    }
}
