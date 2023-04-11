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
    return fetch('/api/tarjetas')
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
const opcionesContainer = document.getElementById('opciones-container');
const barraDirecciones = document.getElementById('barra-direcciones');
const mapaReferencias = document.getElementById('mapa-referencias');
const mapaTitulo = document.getElementById('mapa-titulo')

class Mapa {

    idEje
    eje
    idObjetivo
    objetivo
    idLinea
    linea
    idPlan
    plan
    area
    tarjetas

    constructor(data) {

        this.data = data

        obtenerTarjetas()
        .then(result => {

            this.tarjetas = result

        })
        
    }

    cargarTitulo(titulo) {

        mapaTitulo.innerHTML = `
        
            <h5>${titulo}</h5>
        `

    }

    cargarEjes() {

        this.idEje = '';

        this.cargarTitulo('Seleccionar Eje')

        barraDirecciones.innerHTML = `
        <span id="direcciones-eje">Eje</span>
        `

        mapaReferencias.innerHTML = ''

        opcionesContainer.innerHTML = '';

        for (const eje of this.data.ejes) {

            opcionesContainer.innerHTML += `
                <div class="mapa-opciones" id="eje-${eje.idejes}">
                    ${eje.ejesnombre}
                </div>
            `

        }
    
        let ejes = opcionesContainer.children;
    
        for (const e of ejes) {
    
            e.onclick = () => {

                let idEje = e.id.split('-')[1];

                this.eje = e.innerText;
                this.idEje = idEje

                this.cargarObjetivos()

            }

        }
     
    }

    cargarObjetivos() {

        this.idObjetivo = '';

        this.cargarTitulo('Seleccionar Objetivo Estratégico')

        barraDirecciones.innerHTML =`
        <span id="direcciones-eje">Eje</span>
        > <span id="direcciones-objetivo">Objetivo Estratégico</span>
        `

        let direccionesEje= document.getElementById('direcciones-eje');

        direccionesEje.onclick = () => {

            this.cargarEjes()

        }
        
        direccionesEje.className = 'direcciones-link';
        

        mapaReferencias.innerHTML = `<p class="small"><b>Eje: </b>${this.eje}</p>`;

        let objetivos = this.data.objetivos.filter(obj => obj.objetivoseje == this.idEje);

        opcionesContainer.innerHTML = '';

        for (const obj of objetivos) {

            opcionesContainer.innerHTML += `

                <div class="mapa-opciones" id="objetivo-${obj.idobjetivos}">
                    ${obj.objetivosnombre}
                </div>
            `
        }

        for (const objetivo of opcionesContainer.children) {

            let idObjetivo = objetivo.id.split('-')[1];
            
            objetivo.onclick = () => {

                this.objetivo = objetivo.innerText;
                this.idObjetivo = idObjetivo;

                this.cargarLineas()

            }
        }

    }

    cargarLineas() {

        this.idLinea = '';

        this.cargarTitulo('Seleccionar Línea Estratégica')

        barraDirecciones.innerHTML = `
        <span id="direcciones-eje" class="direcciones-link">Eje</span>
        > <span id="direcciones-objetivo" class="direcciones-link">Objetivo Estratégico</span>
        > <span id="direcciones-linea">Linea Estratégica</span>
        `

        let direccionesobjetivo = document.getElementById('direcciones-objetivo');

        direccionesobjetivo.onclick = () => {

            this.cargarObjetivos()

        }

        let direccionesEje = document.getElementById('direcciones-eje')

        direccionesEje.onclick = () => {

            this.cargarEjes()

        }

        mapaReferencias.innerHTML = `
        <p class="small"><b>Eje: </b>${this.eje}</p>
        <p class="small"><b>Objetivo Estratégico: </b>${this.objetivo}</p>
        
        `;

        let lineas = this.data.lineas.filter(linea => linea.lineasobjetivo == this.idObjetivo);

        opcionesContainer.innerHTML = ''

        for (const linea of lineas) {

            opcionesContainer.innerHTML += `
            <div class="mapa-opciones" id="linea-${linea.idlineas}">${linea.lineasnombre}</div>
            `
        }

        document.getElementById('direcciones-objetivo').onclick = () => {

            barraDirecciones.innerHTML = `
                <a href="/tse">> Eje:</a>${this.eje}
            `

            this.cargarObjetivos()

        }

        for (const l of opcionesContainer.children) {

            l.onclick = () => {

                this.idLinea = l.id.split('-')[1];
                this.linea = l.innerText;

                this.cargarPlanes()

            }

        }

    }

    cargarPlanes() {

        this.idPlan = '';

        this.cargarTitulo('Seleccionar Plan de Acción')

        barraDirecciones.innerHTML = `
        <span id="direcciones-eje" class="direcciones-link">Eje</span>
        > <span id="direcciones-objetivo" class="direcciones-link">Objetivo Estratégico</span>
        > <span id="direcciones-linea" class="direcciones-link">Linea Estratégica</span>
        > <span id="direcciones-plan">Plan de Acción</span>
        `
        

        document.getElementById('direcciones-linea').onclick = () => {

            this.cargarLineas()

        }
        document.getElementById('direcciones-objetivo').onclick = () => {

            this.cargarObjetivos()
        }

        document.getElementById('direcciones-eje').onclick = () =>  {

            this.cargarEjes()

        }

        mapaReferencias.innerHTML = `
        <p class="small"><b>Eje: </b>${this.eje}</p>
        <p class="small"><b>Objetivo Estratégico: </b>${this.objetivo}</p>
        <p class="small"><b>Linea Estratégica: </b>${this.linea}</p>`;

        let planes = this.data.planesDeAccion.filter(plan => plan.planesdeaccionlinea == this.idLinea);

        opcionesContainer.innerHTML = ''

        for (const p of planes) {

            opcionesContainer.innerHTML += `
            <div class="mapa-opciones" id="plan-${p.idplanesdeaccion}">${p.planesdeaccionnombre}</div>
            `
            
        }

        for (const plan of opcionesContainer.children) {

            plan.onclick = () => {

                this.idPlan = plan.id.split('-')[1];
                this.plan = plan.innerText;

                this.cargarTarjetas()

            }

        }

    }

    cargarTarjetas() {

        this.area = '';

        this.cargarTitulo('Fichas de Gestión');

        barraDirecciones.innerHTML = `
        <span id="direcciones-eje" class="direcciones-link">Eje</span>
        > <span id="direcciones-objetivo" class="direcciones-link">Objetivo Estratégico</span>
        > <span id="direcciones-linea" class="direcciones-link">Linea Estratégica</span>
        > <span id="direcciones-plan" class="direcciones-link">Plan de Acción</span>
        > <span id="direcciones-plan">Fichas de Gestión</span>
        `

        document.getElementById('direcciones-linea').onclick = () => {

            this.cargarLineas()

        }
        document.getElementById('direcciones-objetivo').onclick = () => {

            this.cargarObjetivos()
        }

        document.getElementById('direcciones-eje').onclick = () =>  {

            this.cargarEjes()

        }
        document.getElementById('direcciones-plan').onclick = () => {

            this.cargarPlanes()

        }

        this.data.planesDeAccion.filter(plan => {

            if(plan.idplanesdeaccion == this.idPlan) {

                this.area = `${plan.areasdescripcion} (${plan.areasnombre})`
            }

        })


        mapaReferencias.innerHTML = `
        <p class="small"><b>Eje: </b>${this.eje}</p>
        <p class="small"><b>Objetivo Estratégico: </b>${this.objetivo}</p>
        <p class="small"><b>Linea Estratégica: </b>${this.linea}</p>
        <p class="small"><b>Plan de Acción: </b>${this.plan}</p>
        <p class="small"><b>Área: </b>${this.area}</p>
        `;

        let tarjetasFiltradas = this.tarjetas.filter(t => t.tarjetasplandeaccion == this.idPlan);

        let tarjetasContainer = document.createElement('div');

        tarjetasContainer.className= "tarjetas-container";

        opcionesContainer.innerHTML = ''

        if(tarjetasFiltradas.length) {

            tarjetasContainer.innerHTML = `
                <table class="table" id="mapa-fichas">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Título</th>
                            <th>Expediente</th>
                            <th>Acto Administrativo</th>
                        </tr>
                    </thead>
                    <tbody id="tabla-fichas">
                    
                    </tbody>
                </table>
                <div id="modals"></div>
        
            `

            opcionesContainer.append(tarjetasContainer)

            let filas = '';
            let modals = '';

            for (const t of tarjetasFiltradas) {

                filas += `
                    <tr class="mapa-ficha" onclick="abrirModal('modal-${t.idtarjetas}');">
                        <td>${moment(t.tarjetasfecha).format('DD/MM/YYYY')}</td>
                        <td>${t.tarjetastitulo}</td>
                        <td>${t.tarjetasexpediente}</td>
                        <td>${t.tarjetasactoadministrativo}</td>
                    </tr>
              
                `
                modals += `<div id="modal-${t.idtarjetas}" class="modal">
                                <div class="modal-content">
                                    <div class="boton-cerrar">
                                        <button class="close" onclick="cerrarModal('modal-${t.idtarjetas}')">&times;</button>
                                    </div>
                                    <div class="card" id="t-${t.idtarjetas}">
                                        <div class="card-body">
                                            <p class="text-muted">${moment(t.tarjetasfecha).format('DD/MM/YYYY')}</p>
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
                            </div>`
                
            } 

            document.getElementById('tabla-fichas').innerHTML = filas
            document.getElementById('modals').innerHTML = modals

        } else {
            tarjetasContainer.innerHTML = '<p class="small">Aún no hay fichas cargadas...</p>'
            opcionesContainer.append(tarjetasContainer)

        }

        $.fn.dataTable.moment('DD/MM/YYYY');

        $('#mapa-fichas').dataTable({
                "order": [[0, "desc"]],
                "pageLength": 25,
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                },
                buttons: [ 'copy', 'csv', 'excel' ]
                // "scrollX": true,
                // "responsive": true,
        })

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

    let area = document.getElementById('filtro-area');

    let areaElegida = area.options[area.selectedIndex].value;

    let coincidencia;

    if(areaElegida.length) {

        tarjetasFiltradas1 = tarjetasFiltradas1.filter(t => t.tarjetasareas == areaElegida)
    }

    if(tags.length){

        let tagsElegidos = [];

        for(let i = 0; i < tags.length; i++){
            tagsElegidos.push(tags[i].innerText)
        }

        for (const t of tarjetasFiltradas1) {

            let palabrasClave = t.tarjetastags

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
    } else {
        paginarTarjetas(tarjetasFiltradas1)
    }
}

async function buscarTituloDescripcion() {

    let tarjetas = await obtenerTarjetas();

    let valor = document.getElementById('filtro-titulocuerpo').value;

    if(valor.length) {

        let tarjetasFiltradas = [];

        for (const t of tarjetas) {
            
            if(
                (t.tarjetascuerpo.includes(valor))
                || (t.tarjetastitulo.includes(valor))
            ) {

                tarjetasFiltradas.push(t)

            }
        }

        paginarTarjetas(tarjetasFiltradas)

    } else {

        paginarTarjetas(tarjetas)
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
                    <summary class="small desplegable-plan">Plan estratégico</summary>
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
const avisoLink = document.getElementById('aviso-link');
const avisoParrafo = document.getElementById('aviso-parrafo');

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

function switchAviso() {

    let opcion = avisoLink.children[1].innerText;

    switch(opcion) {

        case 'Ocultar':

            avisoParrafo.classList.add('noTiene');
            avisoLink.children[1].innerText = 'Ver'
            break;

        case 'Ver':

            avisoParrafo.classList.remove('noTiene');
            avisoLink.children[1].innerText = 'Ocultar'
            break;
    }


}

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


async function agregarTarjeta(event) {

    event.preventDefault();

    let form = new FormData(document.getElementById('form-nuevatarjeta'));

    let tags = [];

    let tagContainer = document.getElementById('nuevohito-tags')

    for (const child of tagContainer.children) {
        tags.push(child.innerHTML)
    }

    let body = {
        eje: document.getElementById('form-nuevohito-ejes').value,
        objetivo: document.getElementById('form-nuevohito-objetivos').value,
        linea: document.getElementById('form-nuevohito-lineas').value,
        plandeaccion: document.getElementById('form-nuevohito-planesdeaccion').value,
        expediente: form.get('expediente'),
        actoadministrativo: form.get('actoadministrativo'),
        titulo: document.getElementById('nuevatarjeta-titulo').value,
        cuerpo: document.getElementById('nuevatarjeta-cuerpo').value,
        tags: tags
    }

    if(
        (body.eje && body.objetivo && body.linea && body.plandeaccion && body.tags && body.titulo && body.cuerpo) 
        && body.cuerpo.length <= 500
        ){
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