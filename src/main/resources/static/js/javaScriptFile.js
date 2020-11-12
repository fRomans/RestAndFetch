$('#ModalEdit').on('show.bs.modal', function (event) {
    let elementId = $(event.relatedTarget).data('id');
    let elementName = $(event.relatedTarget).data('name');
    // debugger
    // if (условие)debugger
    let elementPassword = $(event.relatedTarget).data('password');
    let elementMoney = $(event.relatedTarget).data('money');
    let elementAuthorities = $(event.relatedTarget).data('authorities');


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

$('#ModalDelete').on('show.bs.modal', function Delete(event) {
    let elementId = $(event.relatedTarget).data('id');
    let elementName = $(event.relatedTarget).data('name');
    let elementMoney = $(event.relatedTarget).data('money');
    let elementAuthorities = $(event.relatedTarget).data('authorities');

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
    let id = document.forms['editForm'].elements['inputId'].value;
    let name = document.forms['editForm'].elements['inputName'].value;
    let pass = document.forms['editForm'].elements['inputPassword'].value;
    let money = document.forms['editForm'].elements['inputMoney'].value;
    let role = document.forms['editForm'].elements['select'].value;


    let rawResponse = await fetch('/admin/update',
        {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
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
            for ( let i = 0; i < users.length; i++){
            $('#showAllUserForm tbody').append("<tr>\n" +
                "                                        <td>"+users[i].id+"</td>\n" +
                "                                        <td>"+users[i].name+"</td>\n" +
                "                                        <td>"+users[i].money+"</td>\n" +
                "                                        <td>"+users[i].role+"</td>\n" +
                "\n" +
                "                                        <td>\n" +
                "\n" +
                "                                            <button type=\"submit\"\n" +
                "                                                    class=\"btn btn-info btn-md\" data-toggle=\"modal\"\n" +
                "                                                    data-target=\"#ModalEdit\"\n" +
                "                                                    data-name="+users[i].name+"\n" +
                "                                                    data-money="+users[i].money+"\n" +
                "                                                    data-authorities="+users[i].role+"\n" +
                "                                                    data-id="+users[i].id+"\n" +
                ">Edit\n" +
                "                                            </button>\n" +
                "\n" +
                "                                        </td>\n" +
                "                                        <td>\n" +
                "\n" +
                "                                            <button type=\"submit\"\n" +
                "                                                    class=\"btn btn-danger btn-md\" data-toggle=\"modal\"\n" +
                "                                                    data-target=\"#ModalDelete\"\n" +
                "                                                    th:data-name=\"${user.getUsername()}\"\n" +
                "                                                    th:data-money=\"${user.getMoney()}\"\n" +
                "                                                    th:data-password=\"${user.getPassword()}\"\n" +
                "                                                    th:data-authorities=\"${user.getAuthorities()}\"\n" +
                "                                                    th:data-id=\"${user.getId()}\">Delete\n" +
                "                                            </button>\n" +
                "\n" +
                "                                        </td>\n" +
                "                                    </tr>");
            }

        });


};

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

