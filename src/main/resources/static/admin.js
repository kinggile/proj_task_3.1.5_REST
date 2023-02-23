$(async function () {
    await getTableWithAllUsers();
})

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
                                 <button type="button" class="btn btn-info" style="color: white"
                                                    data-bs-toggle="modal" data-bs-target="#modal">
                                                Edit
                                 </button>
                            </td>
                            
                              <td>
                                  <button type="button" class="btn btn-danger"
                                                    data-bs-toggle="modal" data-bs-target="#modal">
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

