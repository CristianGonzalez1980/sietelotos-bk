//import { useHistory } from "react-router-dom";
import M from 'materialize-css'

const postearUpdateEntity = (props) => {
    const history = props.historyProp
    const entityClass = props.entityClass
    const entity = props.entity
    const atributes = props.atributes

    console.log(entityClass)

    fetch(`https://exposicion-virtual.herokuapp.com/${entityClass}/${entity.id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(
            atributes
        )
    })/*
        .then((res) => res.json())
        .then((data) => {
            if (!data.error) {
                M.toast({
                    html: `${entityClass} modificado exitosamente`,
                    classes: "#388e3c green darken-2",
                });
                history.push("/admin");
            } else {
                M.toast({
                    html: data.error, classes: "#c62828 red darken-3"
                
                PROBANDO LA OTRA VERSION YA QUE ESTE NO LEIA ERRORES VER AHORA!
                    */
        .then((res) => {
            console.log(res)
            if (res.ok) {
                M.toast({
                    html: `${entityClass} modificado exitosamente`,
                    classes: "#388e3c green darken-2",
                });
                history.push("/admin");
            } else {
                M.toast({ html: res.statusText, classes: "#c62828 red darken-3" });
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

const postearAddEntity = (props) => {
    const history = props.historyProp
    const entityClass = props.entityClass
    const atributes = props.atributes

    fetch(`https://exposicion-virtual.herokuapp.com/${entityClass}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(
            atributes
        )
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                M.toast({
                    html: data.error, classes: "#c62828 red darken-3"
                });
            } else {
                M.toast({
                    html: `${entityClass} agregado exitosamente`,
                    classes: "#388e3c green darken-2",
                });
                history.push("/admin");
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

const postearDeleteEntity = (props) => {
    const history = props.historyProp
    const entityClass = props.entityClass
    const id = props.id

    fetch(`https://exposicion-virtual.herokuapp.com/${entityClass}/${id}`, {
        method: 'DELETE',
        headers: {
        }
    }).then((res) => res.json())
        .then((data) => {
            if (data.error) {
                M.toast({
                    html: data.error, classes: "#c62828 red darken-3"
                });
            } else {
                M.toast({
                    html: `${entityClass} eliminado exitosamente`,
                    classes: "#388e3c green darken-2",
                });
                history.push("/admin");
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

const postearGetEntity = (props) => {
    const entityClass = props.entityClass
    const functionD = props.fx

    fetch(`https://exposicion-virtual.herokuapp.com/${entityClass}`, {
        headers: {
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
        })
        .then((result) => {
            functionD(result)
        })
        .catch((err => {
            console.log(err)
        }))
}

export { postearUpdateEntity, postearAddEntity, postearDeleteEntity, postearGetEntity };