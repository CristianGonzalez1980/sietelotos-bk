package ar.edu.unq.dao.mongodb

import ar.edu.unq.dao.SettingsDAO
import ar.edu.unq.modelo.Settings

class MongoSettingsDAOImpl : SettingsDAO, GenericMongoDAO<Settings>(Settings::class.java)
