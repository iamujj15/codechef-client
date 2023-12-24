import Cookies from "js-cookie";

let fetchAuth = async () => {
    let auth = false;
    let user_id = "";
    try {
        let cookieValue = Cookies.get("user_jwt_auth");
        let cookieArr = "";
        let username = "";
        let tkn = "";
        if (cookieValue) {
            cookieArr = cookieValue.split(";");
            username = cookieArr[0];
        }
        if (cookieArr.length > 1)
            tkn = cookieArr[1];
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${tkn}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: username,
            }),
            credentials: "include"
        });
        const responseData = await res.json();
        if (res.status >= 200 && res.status < 300) {
            auth = responseData.authentic_request;
            user_id = username;
        }
    } catch (err) {
        console.log(err.message);
    }

    return { auth, user_id };
};

export default fetchAuth;