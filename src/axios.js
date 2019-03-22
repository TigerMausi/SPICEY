import axios from "axios";

//CREATES A CLONE OF AXIOS that includes CSRF PROTECTION
var instance = axios.create({
    xsrfCookieName: "mytoken",
    xsrfHeaderName: "csrf-token"
});

export default instance;
