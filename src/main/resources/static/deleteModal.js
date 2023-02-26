let deleteForm = document.forms['deleteForm']

$(async function () {
    await deleteUser()
})

// async function getUserById(id) {
//     let userFetch = await fetch(`http://localhost:8080/rest/${id}`)
//     return await userFetch.json()
// }

async function openAndFillDeleteModal(form, modal, id) {
    modal.show()

    let user = await getUserById(id)

    form.id.value = user.id
    form.firstname.value = user.firstname
    form.lastname.value = user.lastname
    form.age.value = user.age
    form.username.value = user.username
    form.password.value = user.password
    form.roles.value = user.roles.id
}

async function deleteModalData(id) {
    const modal = new bootstrap.Modal(document.querySelector('#deleteModal'))
    await openAndFillDeleteModal(deleteForm, modal, id)
}

async function deleteUser() {
    deleteForm.addEventListener('submit', e => {
        e.preventDefault()

        let checkRole = () => {
            let roles = []
            let option = document.querySelector("#rolesDelete").options

            for (let i = 0; i < option.length; i++) {
                if (option[i].selected) {
                    roles.push(roleList[i])
                }
            }

            return roles
        }

        //todo is correct url?
        fetch('http://localhost:8080/rest/delete/' + deleteForm.id.value, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                id: deleteForm.id.value,
                firstname: deleteForm.firstname.value,
                lastname: deleteForm.lastname.value,
                age: deleteForm.age.value,
                username: deleteForm.username.value,
                password: deleteForm.password.value,
                roles: checkRole()

            })
        })

            .then(() => {
                $('#deleteCloseButton').click();
                getTableWithAllUsers();
            })
    })
}


