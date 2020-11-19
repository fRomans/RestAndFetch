let flag;
let urlForFetch;
$('#ModalEdit').on('show.bs.modal', function (event) {
    let elementId = $(event.relatedTarget).data('id');
    let elementName = $(event.relatedTarget).data('name');
    // debugger
    // if (условие)debugger
    let elementPassword = $(event.relatedTarget).data('password');
    let elementMoney = $(event.relatedTarget).data('money');
    let elementAuthorities = $(event.relatedTarget).data('authorities');
    flag = $(event.relatedTarget).data('flag');

    if (elementAuthorities === "[ROLE_ADMIN, ROLE_USER]" || elementAuthorities === "[ROLE_USER, ROLE_ADMIN]") {
        $('#select option[value="ROLE_ADMIN,ROLE_USER"]').prop('selected', true);
    } else if (elementAuthorities === "[ROLE_USER]") {
        $('#select option[value="ROLE_USER"]').prop('selected', true);

    } else if (elementAuthorities === "[ROLE_ADMIN]") {
        $('#select option[value="ROLE_ADMIN"]').prop('selected', true);
    }

    $("#inputName").val(elementName);
    $("#inputId").val(elementId);
    // $("#inputPassword").val(elementPassword); не надо выводить пароль
    $("#inputMoney").val(elementMoney);
});

$('#ModalDelete').on('show.bs.modal', function (event) {
    let elementId = $(event.relatedTarget).data('id');
    let elementName = $(event.relatedTarget).data('name');
    let elementMoney = $(event.relatedTarget).data('money');
    let elementAuthorities = $(event.relatedTarget).data('authorities');
    flag = $(event.relatedTarget).data('flag');

    $("#inputNameDelete").val(elementName);
    $("#inputIdDelete").val(elementId);
    $("#inputMoneyDelete").val(elementMoney);
    $("#selectDelete").val(elementAuthorities);
});


const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8'
}


async function sendRequest() {
    let id;
    let name;
    let pass;
    let money;
    let role;

    if (flag == "edit") {
        urlForFetch = "/admin/update";
        id = document.forms['editForm'].elements['inputId'].value;
        name = document.forms['editForm'].elements['inputName'].value;
        pass = document.forms['editForm'].elements['inputPassword'].value;
        money = document.forms['editForm'].elements['inputMoney'].value;
        role = document.forms['editForm'].elements['select'].value;
    } else if (flag == "delete") {
        urlForFetch = "/admin/delete";
        id = document.forms['deleteForm'].elements['inputIdDelete'].value;
        name = document.forms['deleteForm'].elements['inputNameDelete'].value;
        pass = document.forms['deleteForm'].elements['inputPasswordDelete'].value;
        money = document.forms['deleteForm'].elements['inputMoneyDelete'].value;
        role = document.forms['deleteForm'].elements['selectDelete'].value;
    }
    let rawResponseEdit = await fetch(urlForFetch,
        {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                name: name,
                password: pass,
                money: money,
                role: [role]
            }),
        })
        .then(function (response) {

            console.log(response);
            return response.json();
        })
        .then(function (data) {


            $("#showAllUserForm tbody > tr").empty();

            let users = data;
            let resultRole = "";
            for (let i = 0; i < users.length; i++) {


                for (let j = 0; j < users[i].role.length; j++) {
                    if (j == 0) {
                        resultRole += JSON.stringify(users[i].role[j]['authority']);
                    } else if (j > 0) {
                        resultRole += "," + JSON.stringify(users[i].role[j]['authority']);
                    }
                }

                $('#showAllUserForm tbody').append("<tr>\n" +
                    "                                        <td>" + users[i].id + "</td>\n" +
                    "                                        <td>" + users[i].name + "</td>\n" +
                    "                                        <td>" + users[i].money + "</td>\n" +
                    "                                        <td>" + resultRole + "</td>\n" +
                    "\n" +
                    "                                        <td>\n" +
                    "\n" +
                    "                                            <button type=\"submit\"\n" +
                    "                                                    class=\"btn btn-info btn-md\" data-toggle=\"modal\"\n" +
                    "                                                    data-target=\"#ModalEdit\"\n" +
                    "                                                    data-name=" + users[i].name + "\n" +
                    "                                                    data-money=" + users[i].money + "\n" +
                    "                                                    data-authorities=" + resultRole + "\n" +
                    "                                                    data-id=" + users[i].id + "\n" +
                    "                                                    data-flag=" + "edit" + "\n" +
                    ">Edit\n" +
                    "                                            </button>\n" +
                    "\n" +
                    "                                        </td>\n" +
                    "                                        <td>\n" +
                    "\n" +
                    "                                            <button type=\"submit\"\n" +
                    "                                                    class=\"btn btn-danger btn-md\" data-toggle=\"modal\"\n" +
                    "                                                    data-target=\"#ModalDelete\"\n" +
                    "                                                    data-name=" + users[i].name + "\n" +
                    "                                                    data-money=" + users[i].money + "\n" +
                    "                                                    data-authorities=" + resultRole + "\n" +
                    "                                                    data-id=" + users[i].id + "\n" +
                    "                                                    data-flag=" + "delete" + "\n" +
                    ">Delete\n" +
                    "                                            </button>\n" +
                    "\n" +
                    "                                        </td>\n" +
                    "                                    </tr>");

                resultRole = "";
            }
        });
};


async function addNewUser() {

    // let id = document.forms['addForm'].elements['addId'].value;
    let name = document.forms['addForm'].elements['addName'].value;
    let pass = document.forms['addForm'].elements['addPassword'].value;
    let money = document.forms['addForm'].elements['addMoney'].value;
    let role = document.forms['addForm'].elements['selectAdd'].value;

    let rawResponseAdd = await fetch("/admin/add",
        {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // id: id,
                name: name,
                password: pass,
                money: money,
                role: [role]
            }),
        })
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function showTable(data) {


            $("#showAllUserForm tbody > tr").empty();

            let users = data;
            let resultRole = "";
            for (let i = 0; i < users.length; i++) {


                for (let j = 0; j < users[i].role.length; j++) {
                    if (j == 0) {
                        resultRole += JSON.stringify(users[i].role[j]['authority']);
                    } else if (j > 0) {
                        resultRole += "," + JSON.stringify(users[i].role[j]['authority']);
                    }
                }

                $('#showAllUserForm tbody').append("<tr>\n" +
                    "                                        <td>" + users[i].id + "</td>\n" +
                    "                                        <td>" + users[i].name + "</td>\n" +
                    "                                        <td>" + users[i].money + "</td>\n" +
                    "                                        <td>" + resultRole + "</td>\n" +
                    "\n" +
                    "                                        <td>\n" +
                    "\n" +
                    "                                            <button type=\"submit\"\n" +
                    "                                                    class=\"btn btn-info btn-md\" data-toggle=\"modal\"\n" +
                    "                                                    data-target=\"#ModalEdit\"\n" +
                    "                                                    data-name=" + users[i].name + "\n" +
                    "                                                    data-money=" + users[i].money + "\n" +
                    "                                                    data-authorities=" + resultRole + "\n" +
                    "                                                    data-id=" + users[i].id + "\n" +
                    "                                                    data-flag=" + "edit" + "\n" +
                    ">Edit\n" +
                    "                                            </button>\n" +
                    "\n" +
                    "                                        </td>\n" +
                    "                                        <td>\n" +
                    "\n" +
                    "                                            <button type=\"submit\"\n" +
                    "                                                    class=\"btn btn-danger btn-md\" data-toggle=\"modal\"\n" +
                    "                                                    data-target=\"#ModalDelete\"\n" +
                    "                                                    data-name=" + users[i].name + "\n" +
                    "                                                    data-money=" + users[i].money + "\n" +
                    "                                                    data-authorities=" + resultRole + "\n" +
                    "                                                    data-id=" + users[i].id + "\n" +
                    "                                                    data-flag=" + "delete" + "\n" +
                    ">Delete\n" +
                    "                                            </button>\n" +
                    "\n" +
                    "                                        </td>\n" +
                    "                                    </tr>");

                resultRole = "";
            }
        });
    $('#togglePaneAdminPanelShow').tab('show');


}


// if (flag == "edit") {
//     urlForFetch = '/admin/update';
// } else if (flag == "delete") {
//     urlForFetch = '/admin/delete';
// }

// $("#load").html(msg);

// const content = await rawResponse.json();
// console.log(content);

// document.querySelector("#userId").innerHTML="y"
//
// $("#userId").val("3");
// $("#userUsername").val("3");
// $("#userMoney").val("3");
// $("#userAuthorities").val("3");
// document.querySelector("#userMoney1").innerHTML=money;

//         if (users[i].role) {

// for (let j=0; j<=users[i].role.length; j++){
//     role1+=JSON.stringify(users[i].role[j]);

//       }

// let users111 = '';
//
// users.forEach((value, key) => {
//     //JSON.stringify(users[i].role[j])
//
//     let lll = users.role;
//     alert(lll.forEach((value) => console.log(value)));
//
// })
// for (let i in users) {
//     for (let j in users.role[i]) {
//
//         //users111 += users.role.forEach();
//     }
