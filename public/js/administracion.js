document.addEventListener("DOMContentLoaded", async () => {

    $('#bandeja-tags').select2({
    theme:"bootstrap"
    })

    $.fn.dataTable.moment('DD/MM/YYYY');
    
    let tablas = ['#tablausuarios', '#tablaareas', '#tablatarjetas', '#tablarechazadas'];
    for (const tabla of tablas) {
        $(tabla).DataTable({
            "order": [[0, "desc"]],
            "pageLength": 25,
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
            },
            // "scrollX": true,
            // "responsive": true,
        });
    }

    $('#tablaaprobadas').DataTable({
        "order": [[0, "desc"]],
        "pageLength": 25,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        },
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'copy',
                text: 'Copiar'
            },
            {
                extend: 'excel',
                text: 'Exportar Excel',
                filename: 'FichasAprobadas_' + new Date().toLocaleDateString()
            }
        ]
    });

    let tags= document.getElementsByClassName('hito-tag');
    for(let i = 0; i < tags.length; i++) {
        let elem = tags[i]
        elem.addEventListener('click', () => {
            elem.remove();
        });
    }

});


//*-------------------------------- FICHAS ------------------------------------//

function cargarFormEdicion(idTarjeta) {

    let formContainer = document.getElementById('editar-ficha-' + idTarjeta);

    let tarjetaContainer = document.getElementById('tarjetaevaluandose-' + idTarjeta);

    let botonesContainer = document.getElementById('seccion-botones-' + idTarjeta);

    tarjetaContainer.classList.add('noTiene')

    botonesContainer.classList.add('noTiene')

    formContainer.classList.remove('noTiene')

    let containerTags = document.getElementById('tags-editarhito-' + idTarjeta)
    for(let i = 0; i < containerTags.children.length; i++) {
        let elem = containerTags.children[i]
        elem.addEventListener('click', () => {
            elem.remove();
        });
    }

}

function abrirEditarHito(idTarjeta) {

    document.getElementById('modal-tarjetaEvaluandose-' + idTarjeta).classList.remove('noTiene');

    document.getElementById('tarjetaevaluandose-' + idTarjeta).classList.remove('noTiene')

    document.getElementById('form-editarhito-' + idTarjeta).classList.add('noTiene');

    document.getElementById('seccion-botones-' + idTarjeta).classList.remove('noTiene');

    abrirModal('modal-tarjetaEvaluandose-' + idTarjeta);
    
}



async function aprobarHito(idTarjeta) {
    if(idTarjeta) {
        fetch('/admin/hito/aprobar/' + idTarjeta, requestOptions)
        .then(response => {

            if(response.status == 200) {

                mostrarMensaje('¡Se ha aprobado la tarjeta!')

                setTimeout(() => {
                    window.location.href='/admin'
                }, 2000);
            }
        })
    }
}

async function evaluarHito(idTarjeta) {

    if(idTarjeta) {

        fetch('/admin/hito/evaluar/' + idTarjeta, requestOptions)
        .then(response => {

            if(response.status == 200) {

                mostrarMensaje('¡Se ha enviado a evaluación la tarjeta!')

                setTimeout(() => {
                    window.location.href='/admin'
                }, 2000);
            }
        })
    }
}

async function rechazarHito(idTarjeta) {
    if(idTarjeta) {
        fetch('/admin/hito/rechazar/' + idTarjeta, requestOptions)
        .then(response => {

            if(response.status == 200) {

                mostrarMensaje('¡Se ha rechazado la tarjeta!')

                setTimeout(() => {
                    window.location.href='/admin'
                }, 2000);
            }
        })
    }
}

async function guardarYAprobarHito(idTarjeta) {

    let form = document.getElementById('form-editarhito-' + idTarjeta);

    let tagContainer = document.getElementById('tags-editarhito-' + idTarjeta);

    let tags= [];

    for (const child of tagContainer.children) {
        tags.push(child.innerHTML)
    }

    let data = {
        titulo: form.titulo.value,
        cuerpo: form.cuerpo.value,
        expediente: form.expediente.value,
        actoadministrativo: form.actoadministrativo.value,
        tags: tags
    }

    if(idTarjeta) {
        
        if(data.titulo && data.cuerpo && data.tags) {

            fetch('/admin/hito/guardaryaprobar/' + idTarjeta, {body: JSON.stringify(data), ...requestOptions})
            .then(response => {
                if(response.status == 200) {

                    mostrarMensaje('¡Se ha guardado y aprobado la tarjeta!')

                    setTimeout(() => {
                        window.location.href='/admin'
                    }, 2000);
                }
            })
            .catch((err) => {
                cerrarModal('modal-guardaryaprobarhito-' + idTarjeta)
                cerrarModal('modal-tarjetaEvaluandose' + idTarjeta)
                mostrarError('¡Hubo un error!')
            })
        } else {
            cerrarModal('modal-guardaryaprobarhito-' + idTarjeta)
            mostrarError('¡Campos incompletos!')
        }
    }
}




//*------------------------------------ USUARIOS ----------------------------------/

function cargarFormAlta() {
    document.getElementById('tabla-usuarios').classList.add('noTiene');
    document.getElementById('form-alta').classList.remove('noTiene');
}

function cargarTablaUsuarios() {
    document.getElementById('tabla-usuarios').classList.remove('noTiene');
    document.getElementById('form-alta').classList.add('noTiene');
}

async function altaUsuario(event){

    event.preventDefault();

    const form = new FormData(document.getElementById('form-newuser'));

    const body = {
        nombre: form.get('nombre'),
        area: parseInt(document.getElementById('newuser-select-area').value)
    }

    if(body.nombre && body.area) {

        fetch('/admin/alta', {body: JSON.stringify(body), ...requestOptions})
        .then(response => {
            if(response.status == 200) {
                mostrarMensaje('¡Se ha creado el nuevo usuario!')
                setTimeout(() => {
                    window.location.href='/admin'
                }, 2000);
            } 
            if(response.status == 201) {
                cerrarModal('modal-confirmar-alta')
                mostrarError('¡Ya existe un usuario con ese nombre!')
            }
        })
    } else  {
        cerrarModal('modal-confirmar-alta')
        mostrarError('¡Campos incompletos!')
    }
}


async function actualizarContrasenia() {
    let form = new FormData(document.getElementById('form-newpass'))
    let body = {
        pass: form.get('pass'),
        newPass: form.get('newPass'),
        newPass2: form.get('newPass2')
    }
    
    if(body.pass&&body.newPass&&body.newPass2) {
        if(body.newPass == body.newPass2) {
            fetch('/auth/newpass', {body: JSON.stringify(body), ...requestOptions})
            .then(response=> {
                if(response.status==200) {
                    mostrarMensaje('¡Contraseña modificada!')
                    setTimeout(() => {
                        window.location.href='/tse'
                    }, 2000)
                }else if(response.status==201) {
                    cerrarModal('modal-newpass');
                    mostrarError('¡Contraseña incorrecta!')
                } else {
                    cerrarModal('modal-newpass')
                    mostrarError('¡Hubo un error!')
                }
            })
        } else {
            cerrarModal('modal-newpass');
            mostrarError('¡Las contraseñas no son idénticas')
        }
    } else {
        cerrarModal('modal-newpass');
        mostrarError('¡Campos incompletos!')
    }
}


//*--------------------------------- AREAS --------------------------------/


async function editarArea(e, idArea) {
    e.preventDefault()
    const form = new FormData(document.getElementById('form-editArea-' + idArea));
    const body = {
        iniciales: form.get('iniciales'),
        nombre: form.get('nombre')
    }
    if(body.iniciales && body.nombre) {
        fetch('/admin/areas/' + idArea, {body: JSON.stringify(body), ...requestOptions})
        .then((response) => {
            if(response.status == 200) {
                mostrarMensaje('¡Se ha editado el área!')
                setTimeout(() => {
                    window.location.href='/admin'
                }, 2000);
            } 
        })
    } else {
        cerrarModal('modal-area-' + idArea)
        mostrarError('¡Campos incompletos!')
    }
}

