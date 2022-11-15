export const setAuthToken = (user) => {
    const currentUser = {
        email: user.email
    }
    console.log(currentUser)

    // get jwt token
    fetch('https://genius-car-server-liart-eight.vercel.app/jwt', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            // local storage is easiest but  not the best place to store token

            localStorage.setItem("genius-token", data.token)



        })
}