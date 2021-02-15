$('#sub').click(function () {

    let user = document.querySelector('#username').value
    let pass = document.querySelector('#pass').value

    //console.log(user, pass)

    fetch("http://localhost:3000/login", {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            firstname : user,
            password : pass
        })
    }).then(res => {
        return res.json()
    }).then(data => {
        //console.log(data.accessToken)
        let token = data.accessToken
        fetch("http://localhost:3000/members", {
            method : 'GET',
            headers : {
                'Authorization' : `bearer ${token}`
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            if(data != ""){
                window.location.href = "home.html"
            } else {
                alert("Something wrong")
                location.reload()
            }
        })
    })


})