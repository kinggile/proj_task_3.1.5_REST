$(async function () {
    await getTableWithAllUsers();
})


const fetchService = {
    head: {
        "Accept-Type": "application/json",
        "Content-Type": "application/json"
    },

    findAllUsers: async () => await fetch("http://localhost:8080/rest"),
    addNewUser: async (user) => await fetch("http://localhost:8080/rest/new", {
        method: "POST",
        headers: fetchService.head,
        body: JSON.stringify(user)
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
                                 <button type="button" class="btn btn-info" style="color: white" data-bs-toggle="modal">
                                                Edit
                                 </button>
                            </td>
                            
                              <td>
                                  <button type="button" class="btn btn-danger" data-bs-toggle="modal">
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

