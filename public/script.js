const loginBtn = document.querySelector("#login-form-submit");

loginBtn.addEventListener("click",()=> {
    var formdata = new FormData();
    formdata.append("branch", "");
    formdata.append("password", "");

    var myHeaders = new Headers();

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:3000/api/auth/login", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
})

