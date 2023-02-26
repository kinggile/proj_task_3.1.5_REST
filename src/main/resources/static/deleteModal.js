let deleteForm = document.forms['deleteForm']

$(async function () {
    await deleteUser()
})


async function deleteModalData(id) {
    const modal = new bootstrap.Modal(document.querySelector('#deleteModal'))
    await openAndFillModal(deleteForm, modal, id)
}

async function deleteUser() {
    deleteForm.addEventListener('submit', e => {
        e.preventDefault()
        
        fetch('http://localhost:8080/rest/delete/' + deleteForm.id.value, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })

            .then(() => {
                $('#deleteCloseButton').click();

                getTableWithAllUsers();
            })
    })
}


