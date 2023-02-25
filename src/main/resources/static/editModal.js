let editForm = document.forms['editForm']

$(async function () {
    await editUser()
})
async function getUserById(id) {
    let userFetch = await fetch(`http://localhost:8080/rest/${id}`)
    return await userFetch.json()
    // todo return await?
}

async function openAndFillModal(form, modal, id) {
    modal.show()

    let user = await getUserById(id)

    form.id.value = user.id
    form.id.firstname = user.firstname
}

async function editModalData(id) {
    const modal = new bootstrap.Modal(document.querySelector('#editModal'))
    await openAndFillModal(editForm, modal, id)
}

async function editUser() {
    editForm.addEventListener('submit', e => {
        e.preventDefault()

        //todo is correct url?
        fetch('http://localhost:8080/rest/edit/' + editForm.id.value, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
            },

            body: JSON.stringify({
                id: editForm.id.value,
                firstname: editForm.firstname.value
            })
        })

            .then(() => {
                $('#editCloseButton').click();
                getTableWithAllUsers();
            })

    })


}
