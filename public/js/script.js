//*--------------------------- NAVBAR -------------------------*/


function closeOffcanvas() {
    // Close the opend dropdown
    document.getElementById('off-canvas-nav').className = 'off-canvas oc-close';
    document.querySelector('.main-content').className ='main-content width100';
}

function openOffcanvas() {
    document.querySelector('.main-content').className ='main-content width70';
    document.getElementById('off-canvas-nav').className = 'off-canvas oc-open';
}

function loadNavbar(){
    // Get all the dropdown from document
    document.querySelectorAll('.dropdown-btn').forEach(dropDownFunc);

    // Dropdown Open and Close function
    function dropDownFunc(dropDown) {

        if(dropDown.classList.contains('click-dropdown') === true){
            dropDown.addEventListener('click', function (e) {
                e.preventDefault();        
        
                if (this.nextElementSibling.classList.contains('dropdown-active') === true) {
                    // Close the clicked dropdown
                    this.parentElement.classList.remove('dropdown-open');
                    this.nextElementSibling.classList.remove('dropdown-active');
        
                } else {
                    // Close the opend dropdown
                    closeDropdown();
        
                    // add the open and active class(Opening the DropDown)
                    this.parentElement.classList.add('dropdown-open');
                    this.nextElementSibling.classList.add('dropdown-active');
                }
            });
        }

        if(dropDown.classList.contains('hover-dropdown') === true){

            dropDown.onmouseover  =  dropDown.onmouseout = dropdownHover;

            function dropdownHover(e){
                if(e.type == 'mouseover'){
                    // Close the opend dropdown
                    closeDropdown();

                    // add the open and active class(Opening the DropDown)
                    this.parentElement.classList.add('dropdown-open');
                    this.nextElementSibling.classList.add('dropdown-active');
                    
                }
            }
        }

    };


    let btnMenu = document.getElementById('open-menu');

    if(btnMenu) {
        btnMenu.addEventListener('click', function() {
            openOffcanvas()
        })
    }

    // Listen to the doc click
    window.addEventListener('click', function (e) {

        // Close the menu if click happen outside menu
        if (e.target.closest('.dropdown-contenedor') === null) {
            // Close the opend dropdown
            closeDropdown();
        }

        if (e.target.closest('.off-canvas') === null && e.target.closest('.open-menu') === null) {
            closeOffcanvas();
        }

   

    });

    // Close the openend Dropdowns
    function closeDropdown() { 

        // remove the open and active class from other opened Dropdown (Closing the opend DropDown)
        document.querySelectorAll('.dropdown-contenedor').forEach(function (container) { 
            container.classList.remove('dropdown-open')
        });

        document.querySelectorAll('.dropdown-menu').forEach(function (menu) { 
            menu.classList.remove('dropdown-active');
        });
    }

    // close the dropdown on mouse out from the dropdown list
    document.querySelectorAll('.dropdown-menu').forEach(function (dropDownList) { 
        // close the dropdown after user leave the list
        dropDownList.onmouseleave = closeDropdown;
    });
}

//*---------------------------------------------------PESTAÑAS-----------------------------------------------------*//

function easyTabs() {
  
    var groups = document.querySelectorAll('.t-container');

    //if t-container
    if (groups.length > 0) {

        for(i = 0; i < groups.length; i++){
            //tabs
            var tabs = groups[i].querySelectorAll('.t-tab');
            for(t = 0; t < tabs.length; t++){
                tabs[t].setAttribute("index", t+1);
                if(t==0)tabs[t].className="t-tab selected";
            }
            //contents
            var contents = groups[i].querySelectorAll('.t-content');
            for(c = 0; c < contents.length; c++){
                contents[c].setAttribute("index", c+1);
                if(c==0)contents[c].className="t-content selected";
            }
            if(tabs.length!=contents.length) alert('ERROR: \r\nEl número de elementos <li> y <div> de algún grupo de pestañas creado no es el correcto. Por favor, revísalo para corregir el error.');
        }
        
    //clicks
        var clicks = document.querySelectorAll('.t-tab');
        for(i = 0; i < clicks.length; i++){
            clicks[i].onclick = function() {
                closeOffcanvas();
            //remove tab selected classes
                var tSiblings = this.parentElement.children;
                for(i = 0; i < tSiblings.length; i++){
                    tSiblings[i].className="t-tab";
                }
                //add tab selected class
                this.className="t-tab selected";
                var idx = this.getAttribute("index"); 
                // if(idx==6)document.getElementById('t-multiple').className='t-container showit';
                // else 
                //     if(this.parentElement.parentElement.getAttribute('id')=='t-principal')document.getElementById('t-multiple').className='t-container';
                // selected content
                var cSiblings = document.querySelectorAll('.t-content');
                for(i = 0; i < cSiblings.length; i++){
                    //remove content selected classes
                    cSiblings[i].className="t-content";
                    //add content selected classes					
                    if(cSiblings[i].getAttribute("index")==idx){
                        cSiblings[i].className="t-content selected";
                    }
                }
            }					
        }
    }
}


//*-----------------------------------------------FORM - SELECTS--------------------------------------------------*//

const selectFormEjes = document.querySelector('#form-nuevohito-ejes');
const selectFormObjetivos = document.querySelector('#form-nuevohito-objetivos');
const selectFormLineas = document.querySelector('#form-nuevohito-lineas');
const selectFormPlanesdeaccion = document.querySelector('#form-nuevohito-planesdeaccion');

function crearSelects(data, selectEjes, selectObjetivos, selectLineas, selectPlanesdeaccion){
    
    for (const eje of data.ejes) {
        let html = `<option style="padding: 100px;" value=${eje.idejes}>${eje.ejesnombre}</option>`
        selectEjes.innerHTML += html
    }
    selectEjes.addEventListener('change', () => opcionesObjetivos(data, selectEjes, selectObjetivos, selectLineas, selectPlanesdeaccion))

    function opcionesObjetivos(data, selectEjes, selectObjetivos, selectLineas, selectPlanesdeaccion){
        selectObjetivos.innerHTML = '<option selected value style="padding: 100px;"></option>';
        selectLineas.innerHTML = '';
        selectPlanesdeaccion.innerHTML = '';
        let ejeElegido = selectEjes.value;
        let objetivos = data.objetivos.filter(objetivo => objetivo.objetivoseje == ejeElegido);
        for (const obj of objetivos) {
            let html = `<option class="select-option class="select-option"" value=${obj.idobjetivos}>${obj.objetivosnombre}</option>`
            selectObjetivos.innerHTML += html
        }
        selectObjetivos.addEventListener('change', () => opcionesLineas(data, selectObjetivos, selectLineas, selectPlanesdeaccion))
    }
    
    function opcionesLineas(data, selectObjetivos, selectLineas, selectPlanesdeaccion){
        selectLineas.innerHTML = '<option selected value style="padding: 100px;"></option>';
        selectPlanesdeaccion.innerHTML = '';
        let objetivoElegido = selectObjetivos.value;
        let lineas = data.lineas.filter(linea => linea.lineasobjetivo == objetivoElegido)
        for (const linea of lineas) {
            let html = `<option style="padding: 100px;" value=${linea.idlineas}>${linea.lineasnombre}</option>`;
            selectLineas.innerHTML += html
        }
        selectLineas.addEventListener('change', () => opcionesPlanesdeaccion(data, selectLineas, selectPlanesdeaccion))
    }
    
    function opcionesPlanesdeaccion(data, selectLineas, selectPlanesdeaccion){
        selectPlanesdeaccion.innerHTML = '<option selected value></option>';
        let lineaElegida = selectLineas.value;
        let planesDeAccion = data.planesDeAccion.filter(linea => linea.planesdeaccionlinea == lineaElegida)
        for (const plan of planesDeAccion) {
            let html = `<option class="select-option class="select-option"" value=${plan.idplanesdeaccion}>${plan.planesdeaccionnombre}</option>`;
            selectPlanesdeaccion.innerHTML += html
        }
    }
}


//*------------------------------------ OBTENER TARJETAS ---------------------------------------*//


async function obtenerTarjetas() {
    return fetch('http://localhost:8080/api/tarjetas')
    .then(response => response.json())
    .then(result => {
        return result
    })
    .catch(err => {
        console.error(err);
    })
} 


//*--------------------------------------------- MODAL ------------------------------------------------/

function abrirModal(id) {
    document.getElementById(id).style.display = "block";
    window.onclick = function(event){
        if (event.target == document.getElementById(id)) {
            document.getElementById(id).style.display = "none";
        }
    }
}

function cerrarModal(id) {
    document.getElementById(id).style.display = "none";
}

//*------------------------------------------------ MAPA ----------------------------------------------*//

const mapa = document.getElementById('mapa')
const ejesContainer = document.getElementById('ejes-container');

async function crearMapa(data) {

    let tarjetas = await obtenerTarjetas()

    for (const eje of data.ejes) {
        ejesContainer.innerHTML += `
        <details>
            <summary class="eje eje-${eje.idejes}" id="eje-${eje.idejes}">
                ${eje.ejesnombre}
            </summary>
        </details>
        `
    }

    let ejes = ejesContainer.children;

    for (const e of ejes) {

        let idEje = e.children[0].id.split('-')[1];

        let objetivos = data.objetivos.filter(obj => obj.objetivoseje == idEje);

        let objetivosContainer = document.createElement('div')

        objetivosContainer.className = "objetivos-container"
            
        for (const obj of objetivos) {
            objetivosContainer.innerHTML += `
                <details>
                    <summary class="objetivo eje-${idEje}" id="objetivo-${obj.idobjetivos}">
                        ${obj.objetivosnombre}
                    </summary>
                </details>
            `
        }

        e.append(objetivosContainer)

        let objetivosHtml = objetivosContainer.children

        for (const obj of objetivosHtml) {

            let idObjetivo = obj.children[0].id.split('-')[1];

            let lineas = data.lineas.filter(linea => linea.lineasobjetivo == idObjetivo);
        
            let lineasContainer = document.createElement('div');

            lineasContainer.className="lineas-container";
        
            for (const linea of lineas) {
        
                lineasContainer.innerHTML += `
                <details>
                    <summary class="linea eje-${idEje}" id="linea-${linea.idlineas}">${linea.lineasnombre}</summary>
                </details> 
                `
            }

            obj.append(lineasContainer)

            let lineasHtml = lineasContainer.children;
        
            for (const linea of lineasHtml) {
        
                let idLinea = linea.children[0].id.split('-')[1];

                let planes = data.planesDeAccion.filter(plan => plan.planesdeaccionlinea == idLinea)
            
                let planesContainer = document.createElement('div');

                planesContainer.className="planes-container";
                planesContainer.id ="planes-container"

                for (const plan of planes) {

                    planesContainer.innerHTML += `
                        <details>
                            <summary class="plan" id="plan-${plan.idplanesdeaccion}">
                                ${plan.planesdeaccionnombre}
                            </summary>
                        </details>
                    `
                }

                linea.append(planesContainer)

                let planesHtml = planesContainer.children;

                for (const plan of planesHtml) {

                    let idPlan = plan.children[0].id.split('-')[1];

                    let tarjetasFiltradas = tarjetas.filter(t => t.tarjetasplandeaccion == idPlan)

                    let tarjetasContainer = document.createElement('div');

                    tarjetasContainer.className= "tarjetas-container";

                    if(tarjetasFiltradas.length) {

                        tarjetasContainer.innerHTML = `
                            <table class="table">
                                <tr>
                                    <th>Fecha</th>
                                    <th>Título</th>
                                    <th>Área</th>
                                </tr>
                            </table>
                    

                        `
                        for (const t of tarjetasFiltradas) {
                            tarjetasContainer.children[0].innerHTML += `
                                <tr>
                                    <td>${new Date(t.tarjetasfecha).toLocaleDateString()}</td>
                                    <td>
                                        <button class="mapa-titulo" onclick="abrirModal('modal-${t.idtarjetas}');">${t.tarjetastitulo}</button>
                                        <div id="modal-${t.idtarjetas}" class="modal">
                                          <div class="modal-content">
                                            <div class="boton-cerrar">
                                                <button class="close" onclick="cerrarModal('modal-${t.idtarjetas}')">&times;</button>
                                            </div>
                                            <div class="card" id="t-${t.idtarjetas}">
                                                <div class="card-body">
                                                    <p class="text-muted">${t.tarjetasfecha}</p>
                                                    <h5 class="card-title contenido">${t.tarjetastitulo}</h5>
                                                    <p class="card-text contenido">${t.tarjetascuerpo}</p>
                                                    <br>
                                                    <p class="text-muted small">${t.tarjetasexpediente ? '<b>Expediente:</b>' + item.tarjetasexpediente : ''}</p>
                                                    <p class="text-muted small">${t.tarjetasactoadministrativo ? '<b>Acto Administrativo:</b>' + item.tarjetasactoadministrativo : ''}</p>
                                                    <p class="text-muted small"><b>Palabras clave: </b>${t.tarjetastags}</p>
                                                    <p class="text-muted small"><b>Area: </b>${t.areasnombre}</p>
                                                </div>
                                            </div>
                                          </div>
                                        </div>
                                    </td>
                                    <td>${t.areasnombre}</td>
                                </tr>
                            
                            `
                        }   
                    } else {
                        tarjetasContainer.innerHTML = '<p class="small">Aún no hay tarjetas cargadas...</p>'
                    }
                    plan.append(tarjetasContainer)
                }
            }
        }  
    }
}     

//*------------------------------------- TAGS -------------------------------------*//

function agregarTag(event, id, tagClass){

    const containerTags = document.getElementById(id);

    let tagsValues = [];

    for (const t of containerTags.children) {
        tagsValues.push(t.innerHTML)
    }

    if ((event.target.value.length > 0) && (!tagsValues.find(elem => elem == event.target.value))) {
        var text = document.createTextNode(event.target.value);
        var p = document.createElement('p');
        containerTags.appendChild(p);
        p.appendChild(text);
        p.classList.add(tagClass);
        let tags= document.getElementsByClassName(tagClass);
        for(let i = 0; i < tags.length; i++) {
            let elem = tags[i]
            elem.addEventListener('click', () => {
                elem.remove();
            });
        }
    }
}



//*---------------------------------------------FILTROS ----------------------------------------------*//

const selectFiltrosEjes = document.querySelector('#select-filtros-ejes');
const selectFiltrosObjetivos = document.querySelector('#select-filtros-objetivos');
const selectFiltrosLineas = document.querySelector('#select-filtros-lineas');
const selectFiltrosPlanesdeaccion = document.querySelector('#select-filtros-planesdeaccion');
// const selectTag = document.querySelector('#hashtags');

async function busqueda() {

    let plan, linea, objetivo, eje;
    
    plan = selectFiltrosPlanesdeaccion.options[selectFiltrosPlanesdeaccion.selectedIndex]
    linea = selectFiltrosLineas.options[selectFiltrosLineas.selectedIndex]
    objetivo = selectFiltrosObjetivos.options[selectFiltrosObjetivos.selectedIndex]
    eje = selectFiltrosEjes.options[selectFiltrosEjes.selectedIndex]

    let valorPlandeaccion = plan ? plan.innerText : null;
    let valorLinea = linea ? linea.innerText : null;
    let valorObjetivo = objetivo ? objetivo.innerText : null;
    let valorEje = eje ? eje.innerText : null;

    if(valorPlandeaccion) aplicarFiltro('plan', valorPlandeaccion)
    else if (valorLinea) aplicarFiltro('linea', valorLinea)
    else if (valorObjetivo) aplicarFiltro('objetivo', valorObjetivo)
    else if (valorEje) aplicarFiltro('eje', valorEje)
    else aplicarFiltro('todos', 'ninguno');

}

async function aplicarFiltro(variable, valor){

    let tarjetas = await obtenerTarjetas();

    let tarjetasFiltradas1 = [];
    let tarjetasFiltradas2 = [];

    if(variable !== 'todos'){
        for (const t of tarjetas) {

            switch(variable){
                case 'eje':
                    if(t.ejesnombre == valor) tarjetasFiltradas1.push(t)
                    break;
                case 'objetivo':
                    if(t.objetivosnombre == valor) tarjetasFiltradas1.push(t)
                    break;
                case 'linea':
                    if(t.lineasnombre == valor) tarjetasFiltradas1.push(t)
                    break;
                case 'plan':
                    if(t.planesdeaccionnombre == valor) tarjetasFiltradas1.push(t)
                    break;
            }
        }
    } else {
        tarjetasFiltradas1 = tarjetas
    }

    let tags = document.getElementsByClassName('filtro-tag');
   
    let coincidencia;

    if(tags.length){
        let tagsElegidos = [];
        for(let i = 0; i < tags.length; i++){
            tagsElegidos.push(tags[i].innerText)
        }
        for (const t of tarjetasFiltradas1) {
            let palabrasClave = t.tarjetastags.split(', ')
            for (const i of tagsElegidos) {
                if(palabrasClave.find(elem => elem === i)){
                    coincidencia = true;
                } else {
                    coincidencia = false;
                    break;
                }
            }
            if(coincidencia)tarjetasFiltradas2.push(t)
        }
        paginarTarjetas(tarjetasFiltradas2)
    }else {
        paginarTarjetas(tarjetasFiltradas1)
    }

}


//*-------------------------------PAGINACION DE LAS TARJETAS-----------------------------------*//


function simpleTemplating(data) {
    let html = '';
    $.each(data, function(index, item){
        html += `
            <div class="card" id="t-${item.idtarjetas}">
              <div class="card-body">
                <p class="text-muted">${new Date(item.tarjetasfecha).toLocaleDateString()}</p>
                <h5 class="card-title contenido">${item.tarjetastitulo}</h5>
                <p class="card-text contenido">${item.tarjetascuerpo}</p>
                <br>
                <p class="text-muted small">${item.tarjetasexpediente ? '<b>Expediente:</b>' + item.tarjetasexpediente : ''}</p>
                <p class="text-muted small">${item.tarjetasactoadministrativo ? '<b>Acto Administrativo:</b>' + item.tarjetasactoadministrativo : ''}</p>
                <p class="text-muted small"><b>Palabras clave: </b>${item.tarjetastags}</p>
                <p class="text-muted small"><b>Area: </b>${item.areasnombre}</p>
                <hr>
                <details>
                    <summary class="small">Plan estratégico</summary>
                    <div>
                        <br>
                        <p class="text-muted small"><b>Eje: </b>${item.ejesnombre}</p>
                        <p class="text-muted small"><b>Objetivo estratégico: </b>${item.objetivosnombre}</p>
                        <p class="text-muted small"><b>Línea estratégica: </b>${item.lineasnombre}</p>
                        <p class="text-muted small"><b>Plan de acción: </b>${item.planesdeaccionnombre}</p>
                    </div>
                </details>
                
              </div>
            </div>
        `
    });
    return html;
}

async function paginarTarjetas(tarjetasData) {
    $('#pagination-container').pagination({
        dataSource: tarjetasData,
        pageSize: 8,
        showPrevious: true,
        showNext: true,
        showSizeChanger: true,
        sizeChangerOptions: [2, 4, 8, 16, 30, 60],
        callback: function(data){
            let html = simpleTemplating(data);
            $('#tarjetas').html(html)
        }
    });
}


//*--------------------------------- TOASTIFY ----------------------------/

const optionsToastify = {
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
}

function mostrarMensaje(mensaje) {
    Toastify({
        style: {
            background: "#0979ce",
        },
        text:mensaje,
        ...optionsToastify
    }).showToast();
}

function mostrarError(mensaje) {
    Toastify({
        style: {
            background: "#d43131",
        },
        text:mensaje,
        ...optionsToastify
    }).showToast();
}

//*------------------------------------- HITOS -------------------------------------/


const requestOptions = {
    method: 'POST',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', 
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data) // body data type must match "Content-Type" header
}

function cargarFormEdicion(idTarjeta) {

    let formContainer = document.getElementById('form-editarhito-' + idTarjeta);

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

    let data = {
        titulo: form.titulo.value,
        cuerpo: form.cuerpo.value,
        expediente: form.expediente.value,
        actoadministrativo: form.actoadministrativo.value,
    }

    let tagContainer = document.getElementById('tags-editarhito-' + idTarjeta);

    let tags= [];

    for (const child of tagContainer.children) {
        tags.push(child.innerHTML)
    }

    data.tags = tags.join(',')

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


async function agregarTarjeta(event) {

    event.preventDefault();

    let form = new FormData(document.getElementById('form-nuevatarjeta'));

    let body = {
        eje: document.getElementById('form-nuevohito-ejes').value,
        objetivo: document.getElementById('form-nuevohito-objetivos').value,
        linea: document.getElementById('form-nuevohito-lineas').value,
        plandeaccion: document.getElementById('form-nuevohito-planesdeaccion').value,
        expediente: form.get('expediente'),
        actoadministrativo: form.get('actoadministrativo'),
        titulo: document.getElementById('nuevatarjeta-titulo').value,
        cuerpo: document.getElementById('nuevatarjeta-cuerpo').value
    }

    let tags = [];

    let tagContainer = document.getElementById('nuevohito-tags')

    for (const child of tagContainer.children) {
        tags.push(child.innerHTML)
    }

    body.tags = tags.join(',')

    if(body.eje && body.objetivo && body.linea && body.plandeaccion && body.tags) {
        fetch('/tse/nuevo', {body: JSON.stringify(body), ...requestOptions})
        .then((response) => {
            if(response.status == 200) {
                mostrarMensaje("¡Se envío la tarjeta a evaluación!")
                setTimeout(() => {
                    window.location.href='/tse'
                }, 2000)
            }
        })
    } else {
        cerrarModal('modal-nuevatarjeta')
        mostrarError('¡campos incompletos!')
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