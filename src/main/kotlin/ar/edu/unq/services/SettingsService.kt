package ar.edu.unq.services

import ar.edu.unq.modelo.Settings

interface SettingsService {
    fun newSettings(settings: Settings)
    fun actualizarSettings(settings: Settings)
    fun recuperarSettings(id: String): Settings
    fun recuperarAllSettings(): Collection<Settings>
    fun deleteAll()
}