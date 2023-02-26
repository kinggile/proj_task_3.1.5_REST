
$(async function () {
    await getTableWithUserInfo()
    await headerFillingUser()
})


async function getTableWithUserInfo() {
    const table = $('#tbodyUser')
    table.empty()

    await fetch("http://localhost:8080/rest")
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                let fillingTable = `$(
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.firstname}</td>
                            <td>${user.lastname}</td>
                            <td>${user.age}</td>
                            <td>${user.username}</td>
                            <td>${user.roles.map(r => r.role.substring(5))}</td>
                        </tr>
                    )`

                table.append(fillingTable)
            })
        })
        .catch(err => console.log(err))
}


async function headerFillingUser() {
    await fetch('http://localhost:8080/rest/info')
        .then(res => res.json())
        .then(info => {
                $('#loginUser').append(info.username)
                let roles = info.roles.map(r => r.role.substring(5) + " ")
                $('#userRoleHeaderUser').append(roles)
            }
        )
}