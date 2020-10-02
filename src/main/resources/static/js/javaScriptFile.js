

$('#ModalEdit').on('show.bs.modal', function (event) {
    // var elementId = $(event.relatedTarget).data('id');
    var elementName = $(event.relatedTarget).data('name');
    // debugger
    // if (условие)debugger
    var elementPassword = $(event.relatedTarget).data('password');
    var elementMoney = $(event.relatedTarget).data('money');
    var elementAuthorities = $(event.relatedTarget).data('authorities');


// if (elementAuthorities==="ROLE_ADMIN"){
//     $("#role1").html(elementAuthorities);
// }else if (elementAuthorities==="ROLE_USER"){
//     $("#role2").html(elementAuthorities);
// }else if (elementAuthorities==="ROLE_ADMIN, ROLE_USER" ){
//     $("#role3").html(elementAuthorities);
// }

    $("#inputName").html("dsadaddadadsad"+elementName);
    $("#inputPassword").html(elementPassword);
    $("#inputMoney").html(elementMoney);
});

