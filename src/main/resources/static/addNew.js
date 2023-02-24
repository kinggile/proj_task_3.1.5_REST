
let newUserForm = document.forms["addNewUserForm"]

$(async function () {
    await addUser();
})

async function addUser() {
    newUserForm.addEventListener("submit", (ev) => {
        ev.preventDefault()

        let checkRole = () => {
            let roles = []
            let option = document.querySelector("#role").options

            for (let i = 0; i < option.length; i++) {
                if (option[i].selected) {
                    roles.push(roleList[i])
                }
            }

            return roles;
        }

        fetch("http://localhost:8080/rest/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                id: newUserForm.id.value,
                firstname: newUserForm.firstname.value,
                lastname: newUserForm.lastname.value,
                age: newUserForm.age.value,
                username: newUserForm.username.value,
                password: newUserForm.password.value,
                roles: checkRole()
            })
        })

            .then(() => {
                newUserForm.reset()
                getTableWithAllUsers();
                $("#test").click()
            })
    })
}