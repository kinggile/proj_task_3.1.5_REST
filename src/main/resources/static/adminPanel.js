$(async function () {
    await getTableWithAllUsers()
})

headerFilling();

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
                                 style="color: white" data-bs-target="#editModal">
                                                Edit
                                 </button>
                            </td>
                            
                              <td>
                                  <button type="button" id="deleteBtn" class="btn btn-danger" data-bs-toggle="modal"
                                  data-bs-target="#deleteModal">
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


function headerFilling() {
    fetch("http://localhost:8080/rest")
        .then(res => res.json())
        .then(data => {
            $('#login').append(data.username)
            let role = data.roles.map(r => r.role.substring(5))
            $('#roleUser').append(role)
        })
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

