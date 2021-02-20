import M from 'materialize-css';

const uploadImage = (props) => {
    console.log(props)
    var url = "";
    const pic = props.image;
    const functionD = props.fx;

    console.log(pic)
    console.log(functionD)
    //  console.log(Object.keys(props2.property)[0])
    //  var fx = Object.keys(props2.property)[0]
    //   console.log(fx === "setUrlLogo")
    if (pic) {
        const data = new FormData();
        data.append("file", pic);
        data.append("upload_preset", "development");
        data.append("cloud_name", "expovirtual");
        fetch("https://api.cloudinary.com/v1_1/expovirtual/image/upload", {
            method: "POST",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                url = data.url;
                console.log(url);
                functionD(url);
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        M.toast({ html: "cargar imagen", classes: "#c62828 red darken-3" });
    }
};

export default uploadImage;