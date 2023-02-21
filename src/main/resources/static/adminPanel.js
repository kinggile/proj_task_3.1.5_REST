$(async function () {
    await getTableWithAllUsers();
})




async function getTableWithAllUsers() {
    const table = $('#allUsersTable tbody')
    table.empty()

    fetch("http://localhost:8080/admin/rest")
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

