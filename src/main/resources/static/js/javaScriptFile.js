$('#ModalEdit').on('show.bs.modal', function (event) {
    var elementId = $(event.relatedTarget).data('id');
    var elementName = $(event.relatedTarget).data('name');
    // debugger
    // if (условие)debugger
    var elementPassword = $(event.relatedTarget).data('password');
    var elementMoney = $(event.relatedTarget).data('money');
    var elementAuthorities = $(event.relatedTarget).data('authorities');


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
    var elementId = $(event.relatedTarget).data('id');
    var elementName = $(event.relatedTarget).data('name');
    var elementMoney = $(event.relatedTarget).data('money');
    var elementAuthorities = $(event.relatedTarget).data('authorities');

    $("#inputNameDelete").val(elementName);
    $("#inputIdDelete").val(elementId);
    $("#inputMoneyDelete").val(elementMoney);
    $("#selectDelete").val(elementAuthorities);
});



const headers = {
    'Content-Type': 'application/json'
}
function sendRequest(method, urlRequest) {
    return fetch(urlRequest,{
            method: method,
        headers: headers
        }
        ).then(response=>{
            if (response.ok){
       return  response.json()
            }
                return response.json().then(onerror=>{
                    const e = new Error('Все плоооооохо!!!!!!!!!!!!!!')
                    console.log('!!!!!!!!!!!!!!!!!' + e)
                })
    })
}
