package ar.edu.unq.API.controllers

import ar.edu.unq.API.*
import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import io.javalin.http.NotFoundResponse
import ar.edu.unq.modelo.Settings
import ar.edu.unq.services.SettingsService
import ar.edu.unq.services.impl.exceptions.SettingsExistenteException
import ar.edu.unq.services.impl.exceptions.SettingsInexistenteException

class SettingsController(val backendSettingsService: SettingsService) {

    val aux: AuxiliaryFunctions = AuxiliaryFunctions()

   fun addSettings(ctx: Context){
        try {
            val newSettings = aux.settingsBodyValidation(ctx)
            val settings = Settings(newSettings.backgroundColor!!, newSettings.backgroundColorFooter!!,
                newSettings.backgroundColorWrapp!!, newSettings.backgroundColorSide!!, newSettings.backgroundColorCardLogin!!)
            backendSettingsService.newSettings(settings)
            ctx.status(201)
            ctx.json(OkResultMapper("ok"))
        } catch (e: SettingsExistenteException) {
            throw BadRequestResponse(e.message.toString())
        }
    }

    fun updateSettings(ctx: Context) {
        try {
            val id = ctx.pathParam("settingId")
            val newSettings = aux.settingsBodyValidation(ctx)
            val settings = backendSettingsService.recuperarSettings(id)

            settings.backgroundColor = newSettings.backgroundColor!!
            settings.backgroundColorFooter = newSettings.backgroundColorFooter!!
            settings.backgroundColorSide = newSettings.backgroundColorSide!!
            settings.backgroundColorWrapp = newSettings.backgroundColorWrapp!!
            settings.backgroundColorCardLogin = newSettings.backgroundColorCardLogin!!
            backendSettingsService.actualizarSettings(settings)

            val updated = this.backendSettingsService.recuperarSettings(id)

            ctx.json(aux.settingsClassToSettingsView(updated))
        } catch (e: SettingsInexistenteException) {
            throw NotFoundResponse(e.message.toString())
        }
    }

    fun settings(ctx: Context) {
        val settingsLists = backendSettingsService.recuperarAllSettings()
        val allSettings = aux.settingsClassListToSettingsViewList(settingsLists as MutableCollection<Settings>)
        ctx.status(200)
        ctx.json(allSettings)
    }
}