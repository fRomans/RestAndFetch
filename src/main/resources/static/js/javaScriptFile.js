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
    let   id = document.forms['editForm'].elements['inputId'].value;
    let   name = document.forms['editForm'].elements['inputName'].value;
    let   pass = document.forms['editForm'].elements['inputPassword'].value;
    let   money = document.forms['editForm'].elements['inputMoney'].value;
    let   role = document.forms['editForm'].elements['select'].value;


    let rawResponse =  await fetch('/admin/update',
        {
            // mode: 'cors',
            method: "POST",
            headers: {Accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({
                id: id,
                name: name,
                pass: pass,
                money: money,
                role: role
            })
        });
    const content = await rawResponse.json();

    console.log(content);
    }





