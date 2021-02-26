package ar.edu.unq.API.controllers

import ar.edu.unq.API.*
import ar.edu.unq.modelo.Producto
import ar.edu.unq.modelo.Proveedor
import ar.edu.unq.modelo.Settings
import io.javalin.http.Context

class AuxiliaryFunctions {

    //TODO: toda la funcion es reemplazable por iter.flatten() jaja

    fun productoClassToProductoView(p: Producto): ProductViewMapper {
        return ProductViewMapper(p.id.toString(), p.idProveedor.toString(), p.itemName, p.description, p.listImages, p.stock, p.vendidos, p.itemPrice, p.promotionalPrice, p.longitud, p.ancho, p.alto, p.pesoGr)
    }

    fun proveedorClassToProveedorView(p: Proveedor): CompanyViewMapper {
        return CompanyViewMapper(p.id.toString(), p.companyName, p.companyImage, p.companyBanner, p.facebook, p.instagram, p.web, this.productoClassListToProductoViewList(p.productos))
    }

    fun settingsClassToSettingsView(s: Settings): SettingsViewMapper {
        return SettingsViewMapper(s.id.toString(), s.backgroundColor, s.backgroundColorFooter, s.backgroundColorSide, s.backgroundColorWrapp)
    }

    fun productoClassListToProductoViewList(lista: MutableCollection<Producto>): List<ProductViewMapper> {
        return lista.map { productoClassToProductoView(it) }
    }

    fun proveedorClassListToProveedorViewList(lista: MutableCollection<Proveedor>) : List<CompanyViewMapper> {
        return lista.map{ proveedorClassToProveedorView(it) }
    }

    fun settingsClassListToSettingsViewList(lista: MutableCollection<Settings>): List<SettingsViewMapper> {
        return lista.map { settingsClassToSettingsView(it) }
    }

    fun productBodyValidation(ctx: Context): ProductRegisterMapper {
        return ctx.bodyValidator<ProductRegisterMapper>()
                .check(
                        { it.idProveedor != null && it.itemName != null && it.description != null && it.images != null && it.stock != null && it.vendidos != null && it.itemPrice != null && it.promotionalPrice != null && it.longitud != null && it.ancho != null && it.alto != null && it.pesoGr != null },
                        "Invalid body : idProveedor, itemName, description, images, stock, itemPrice and promotionalPrice are required"
                )
                .get()
    }

    fun companyBodyValidation(ctx: Context): CompanyRegisterMapper {
        return ctx.bodyValidator<CompanyRegisterMapper>()
                .check(
                        { it.companyName != null && it.companyImage != null && it.companyBanner != null && it.facebook != null && it.instagram != null && it.web != null },
                        "Invalid body : companyName, companyImage, companyBanner, facebook, instagram and web are required"
                )
                .get()
    }

    fun settingsBodyValidation(ctx: Context): SettingsRegisterMapper {
        return ctx.bodyValidator<SettingsRegisterMapper>()
            .check(
                { it.backgroundColor != null && it.backgroundColorFooter != null && it.backgroundColorSide != null && it.backgroundColorWrapp != null  },
                "Invalid body : backgroundColor backgroundColorFooter backgroundColorSide backgroundColorWrapp are required"
            )
            .get()
    }
}