let editForm = document.forms['editForm']

$(async function () {
    await editUser()
})

async function getUserById(id) {
    let userFetch = await fetch(`http://localhost:8080/rest/${id}`)
    return await userFetch.json()
}

async function openAndFillEditModal(form, modal, id) {
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

async function editModalData(id) {
    const modal = new bootstrap.Modal(document.querySelector('#editModal'))
    await openAndFillEditModal(editForm, modal, id)
}

async function editUser() {
    editForm.addEventListener('submit', e => {
        e.preventDefault()

        let checkRole = () => {
            let roles = []
            let option = document.querySelector("#rolesEdit").options

            for (let i = 0; i < option.length; i++) {
                if (option[i].selected) {
                    roles.push(roleList[i])
                }
            }

            return roles
        }

        //todo is correct url?
        fetch('http://localhost:8080/rest/edit/' + editForm.id.value, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
            },

            body: JSON.stringify({
                id: editForm.id.value,
                firstname: editForm.firstname.value,
                lastname: editForm.lastname.value,
                age: editForm.age.value,
                username: editForm.username.value,
                password: editForm.password.value,
                roles: checkRole()

            })
        })

            .then(() => {
                $('#editCloseButton').click();
                getTableWithAllUsers();
            })

    })


}
