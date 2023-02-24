$(async function () {
    await getTableWithAllUsers();
})


let roleList = [
    {id: 1, role: "ROLE_ADMIN"},
    {id: 2, role: "ROLE_USER"}
]


const fetchService = {
    head: {
        // "Accept-Type": "application/json",
        "Content-Type": "application/json"
    },

    findAllUsers: async () => await fetch("http://localhost:8080/rest"),

    addNewUser: async (user) => await fetch("http://localhost:8080/rest/new", {
        method: "POST",
        headers: fetchService.head,
        body: JSON.stringify(user)
    }),

    updateUser: async (user, id) => await fetch(`http://localhost:8080/rest/edit/${id}`, {
        method: "PATCH",
        headers: fetchService.head,
        body: JSON.stringify(user)
    }),

    deleteUser: async (id) => await fetch(`http://localhost:8080/rest/delete/${id}`, {
        method: "DELETE",
        // headers: fetchService.head
    })
}

async function getTableWithAllUsers() {
    const table = $('#tbodyAllUsers')
    table.empty()

    await fetchService.findAllUsers()
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
                                 style="color: white">
                                                Edit
                                 </button>
                            </td>
                            
                              <td>
                                  <button type="button" id="deleteBtn" class="btn btn-danger" data-bs-toggle="modal">
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




// window.onload = function() {
//     if (window.jQuery) {
//         // jQuery is loaded
//         alert("Yeah!");
//     } else {
//         // jQuery is not loaded
//         alert("Doesn't Work");
//     }
// }

