$('#ModalEdit').on('show.bs.modal', function (event) {
    // var elementId = $(event.relatedTarget).data('id');
    var elementName = $(event.relatedTarget).data('name');
    // debugger
    // if (условие)debugger
    var elementPassword = $(event.relatedTarget).data('password');
    var elementMoney = $(event.relatedTarget).data('money');
    var elementAuthorities = $(event.relatedTarget).data('authorities');


    if (elementAuthorities === "[ROLE_ADMIN, ROLE_USER]") {
        $('#select option[value="ROLE_ADMIN,ROLE_USER"]').prop('selected', true);
    } else if (elementAuthorities === "[ROLE_USER]") {
        $('#select option[value="ROLE_USER"]').prop('selected', true);

    } else if (elementAuthorities === "[ROLE_ADMIN]") {
        $('#select option[value="ROLE_ADMIN"]').prop('selected', true);
    }

    $("#inputName").val(elementName);

    // $("#inputPassword").val(elementPassword); не надо выводить пароль
    $("#inputMoney").val(elementMoney);
});

