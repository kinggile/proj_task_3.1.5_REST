$(async function () {
    await getTableWithAllUsers()
    await headerFilling()
})

let roleList = [
    {id: 1, role: "ROLE_ADMIN"},
    {id: 2, role: "ROLE_USER"}
]


async function getTableWithAllUsers() {
    const table = $('#tbodyAllUsers')
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
                            
                            <td>
                                 <button type="button" id="editBtn" class="btn btn-info" data-bs-toggle="modal"
                                 style="color: white" onclick="editModalData(${user.id})">
                                                Edit
                                 </button>
                            </td>
                            
                            <td>
                                 <button type="button" id="deleteBtn" class="btn btn-danger" data-bs-toggle="modal"
                                  onclick="deleteModalData(${user.id})">
                                                Delete
                                 </button>
                            </td>
                        </tr>
                    )`

                table.append(fillingTable)
            })
        })
        .catch(err => console.log(err))
}


async function headerFilling() {
    await fetch('http://localhost:8080/rest/info')
        .then(res => res.json())
        .then(info => {
                $('#login').append(info.username)
                let roles = info.roles.map(r => r.role.substring(5) + " ")
                $('#userRoleHeader').append(roles)
            }
        )
}


// window.onload = function() {
//     if (window.jQuery) {
//         // jQuery is loaded
//         alert("Yeah!");
//     } else {
//         // jQuery is not loaded
//         alert("Doesn't Work");
//     }
// }

