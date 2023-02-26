let deleteForm = document.forms['deleteForm']

$(async function () {
    await deleteUser()
})

// async function getUserByIdforDelete(id) {
//     let userFetch = await fetch(`http://localhost:8080/rest/${id}`)
//     return await userFetch.json()
// }
//
// async function openAndFillDeleteModal(form, modal, id) {
//     modal.show()
//
//     let user = await getUserByIdforDelete(id)
//
//     form.id.value = user.id
//     form.firstname.value = user.firstname
//     form.lastname.value = user.lastname
//     form.age.value = user.age
//     form.username.value = user.username
//     form.password.value = user.password
//     form.roles.value = user.roles.id
// }

async function deleteModalData(id) {
    const modal = new bootstrap.Modal(document.querySelector('#deleteModal'))
    await openAndFillEditModal(deleteForm, modal, id)
}

async function deleteUser() {
    deleteForm.addEventListener('submit', e => {
        e.preventDefault()

        // let checkRole = () => {
        //     let roles = []
        //     let option = document.querySelector("#rolesDelete").options
        //
        //     for (let i = 0; i < option.length; i++) {
        //         if (option[i].selected) {
        //             roles.push(roleList[i])
        //         }
        //     }
        //
        //     return roles
        // }

        fetch('http://localhost:8080/rest/delete/' + deleteForm.id.value, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })

            .then(() => {
                // document.querySelector("#deleteCloseButton").click()
                $('#deleteCloseButton').click();

                // deleteCloseButton
                getTableWithAllUsers();
            })
    })
}


