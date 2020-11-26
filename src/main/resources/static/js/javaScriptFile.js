let flag;
let urlForFetch;
$('#ModalEdit').on('show.bs.modal', function (event) {
    let elementId = $(event.relatedTarget).data('id');
    let elementName = $(event.relatedTarget).data('name');
    let elementPassword = $(event.relatedTarget).data('password');
    let elementMoney = $(event.relatedTarget).data('money');
    let elementAuthorities = $(event.relatedTarget).data('authorities');
    flag = $(event.relatedTarget).data('flag');


    if (elementAuthorities === "[ROLE_ADMIN,ROLE_USER]" || elementAuthorities === "[ROLE_USER,ROLE_ADMIN]" ||
        elementAuthorities === "[ROLE_ADMIN, ROLE_USER]" || elementAuthorities === "[ROLE_USER, ROLE_ADMIN]"
    ) {
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
    if (elementAuthorities === "[ROLE_ADMIN,ROLE_USER]" || elementAuthorities === "[ROLE_USER,ROLE_ADMIN]") {
        $("#selectDelete").val("ROLE_ADMIN,ROLE_USER");
    } else if (elementAuthorities === "[ROLE_USER]") {
        $("#selectDelete").val("ROLE_USER");
    } else if (elementAuthorities === "[ROLE_ADMIN]") {
        $("#selectDelete").val('ROLE_ADMIN');
    }
});


const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8'
}

async function editUser() {

    let id = document.forms['editForm'].elements['inputId'].value;
    let name = document.forms['editForm'].elements['inputName'].value;
    let money = document.forms['editForm'].elements['inputMoney'].value;
    let role = document.forms['editForm'].elements['select'].value;
    let pass = document.forms['editForm'].elements['inputPassword'].value;

    let rawResponseEdit = await fetch("/admin/update",
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
            let resultRole = [];
            for (let i = 0; i < users.length; i++) {

                for (let j = 0; j < users[i].role.length; j++) {
                    let roleElement = users[i].role[j]['authority'];
                    resultRole.push(roleElement);
                }

                $('#showAllUserForm tbody').append(`<tr>
                                                            <td>${users[i].id}</td>\n" +
                                                            <td>${users[i].name}</td>\n" +
                                                            <td> ${users[i].money}</td>
                                                           <td>${resultRole}</td>
<!--                    ediiiiit      -->
                                                           <td>
                    
                                                                <button type="submit\"
                                                                       class="btn btn-info btn-md" data-toggle="modal"
                                                                        data-target="#ModalEdit"
                                                                      data-name="${users[i].name}"
                                                                        data-money="${users[i].money}"
                                                                        data-authorities=[${resultRole}]
                                                                        data-id="${users[i].id}"
                                                                       data-flag="edit"
                                                                                       >Edit</button>
                    
                                                          </td>
                                                          <td>
                    
                                                               <button type="submit"
                                                                        class="btn btn-danger btn-md" data-toggle="modal"
                                                                       data-target="#ModalDelete"
                                                                        data-name="${users[i].name}"
                                                                       data-money="${users[i].money}"
                                                                        data-authorities=[${resultRole}]
                                                                        data-id="${users[i].id} "
                                                                       data-flag="delete"
                                                                                       >Delete</button>
                    
                                                            </td>
                                                        </tr>`);

                resultRole = [];
            }
        });
};

async function deleteUser() {

    let id = document.forms['editForm'].elements['inputId'].value;
    let name = document.forms['editForm'].elements['inputName'].value;
    let pass = document.forms['editForm'].elements['inputPassword'].value;
    let money = document.forms['editForm'].elements['inputMoney'].value;
    let role = document.forms['editForm'].elements['select'].value;

    let rawResponseEdit = await fetch("/admin/delete",
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
            let resultRole = [];
            for (let i = 0; i < users.length; i++) {

                for (let j = 0; j < users[i].role.length; j++) {
                    let roleElement = users[i].role[j]['authority'];
                    resultRole.push(roleElement);
                }

                $('#showAllUserForm tbody').append(`<tr>
                                                            <td>${users[i].id}</td>\n" +
                                                            <td>${users[i].name}</td>\n" +
                                                            <td> ${users[i].money}</td>
                                                           <td>${resultRole}</td>
<!--                        deletteeeeeeeeeee-->
                                                           <td>
                    
                                                                <button type="submit\"
                                                                       class="btn btn-info btn-md" data-toggle="modal"
                                                                        data-target="#ModalEdit"
                                                                      data-name="${users[i].name}"
                                                                        data-money="${users[i].money}"
                                                                        data-authorities=[${resultRole}]
                                                                        data-id="${users[i].id}"
                                                                       data-flag="edit"
                                                                                       >Edit</button>
                    
                                                          </td>
                                                          <td>
                    
                                                               <button type="submit"
                                                                        class="btn btn-danger btn-md" data-toggle="modal"
                                                                       data-target="#ModalDelete"
                                                                        data-name="${users[i].name}"
                                                                       data-money="${users[i].money}"
                                                                        data-authorities=[${resultRole}]
                                                                        data-id="${users[i].id} "
                                                                       data-flag="delete"
                                                                                       >Delete</button>
                    
                                                            </td>
                                                        </tr>`);

                resultRole = [];
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
            let resultRole = [];
            for (let i = 0; i < users.length; i++) {

                for (let j = 0; j < users[i].role.length; j++) {
                    let roleElement = users[i].role[j]['authority'];
                    resultRole.push(roleElement);
                }

                $('#showAllUserForm tbody').append(`
                                     <tr>
                                       <td>${users[i].id}</td>
                                       <td>${users[i].name}</td>
                                       <td>${users[i].money}</td>
                                       <td>${resultRole}</td>
                                       <td>
<!-- addddddddddddddddddddddddddddddd-->
                                           <button type="submit" +
                                                    class="btn btn-info btn-md" data-toggle="modal" 
                                                    data-target="#ModalEdit"
                                                    data-name="${users[i].name} "
                                                    data-money=" ${users[i].money}"
                                                    data-authorities=[${resultRole}]
                                                    data-id="${users[i].id}"
                                                   data-flag="edit"
                                           >Edit</button>
                                            

                                       </td>
                                       <td>

                                        <button type="submit"
                                                  class="btn btn-danger btn-md" data-toggle="modal"
                                                  data-target=\\"#ModalDelete\\"
                                                data-name="${users[i].name}"
                                                data-money="${users[i].money}" 
                                                data-id="${users[i].id}"
                                                data-authorities=[${resultRole}]
                                                    data-flag="delete" 
                                        >Delete</button>

                                       </td>
                                     </tr>                                    
                                  `);

                resultRole = [];
                ;
            }
        });
    $('#togglePaneAdminPanelShow').tab('show');


};


