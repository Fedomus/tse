function comprobarCamposYNuevaPass(){
    let form = new FormData(document.getElementById('form-newpass'))
    let body = {
        pass: form.get('pass'),
        newPass: form.get('newPass'),
        newPass2: form.get('newPass2')
    }
    
    if(body.pass&&body.newPass&&body.newPass2) {
        abrirModal('modal-newpass')
    } else {
        mostrarError('¡Campos incompletos!')
    }
}