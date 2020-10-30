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
    'Content-Type': 'application/json'
}
let obj;
let editButton = document.getElementById('buttonEdit');
editButton.addEventListener('click', function (ev) {
    let id = document.forms['editForm'].elements['inputId'].value;
    let name = document.forms['editForm'].elements['inputName'].value;
    let pass = document.forms['editForm'].elements['inputPassword'].value;
    let money = document.forms['editForm'].elements['inputMoney'].value;
    let role = document.forms['editForm'].elements['select'].value;

    obj = {
        id:id,
        name: name,
        pass: pass,
        money: money,
        role: role
    }
})

async function sendRequest(method, urlRequest) {
    let response = await fetch(urlRequest,
        {
            method: method,
            headers: headers,
            body: JSON.stringify(obj)
        }).then(function (response) {
        if (response.ok) { // если HTTP-статус в диапазоне 200-299
            // получаем тело ответа (см. про этот метод ниже)
            let json =  response.json();
            console.log(json);
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    })
}




