document.addEventListener("DOMContentLoaded", async () => {

    irArriba();

    paginarTarjetas(await obtenerTarjetas())

    $('#filtro-hashtags').select2({
    theme:"bootstrap"
    });
    
    $('#hito-hashtags').select2({
    theme:"bootstrap"
    });

    
    
    fetch('/api/sessiondata')
    .then(response => response.json())
    .then(result => {
        sessionStorage.setItem('area', result.area)
        if(result.area != 17 && result.area != 18 && result.area != 8) {
            fetch('/api/pegi2')
            .then(response => response.json())
            .then(result => {
                crearSelects(result, selectFormEjes, selectFormObjetivos, selectFormLineas, selectFormPlanesdeaccion)
            })
            .catch(err => {
                console.error(err);
            });
        }
    })
    .catch(err => {
        console.error(err);
    });
    
    fetch('/api/pegi')
    .then(response => response.json())
    .then(result => {

        new Mapa(result).cargarEjes()

        crearSelects(result, selectFiltrosEjes, selectFiltrosObjetivos, selectFiltrosLineas, selectFiltrosPlanesdeaccion)
        
    })
    .catch(err => {
        console.error(err);
    });
});



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
        
            <h5 style="text-transform:uppercase;">${titulo}</h5>
        `

    }

    cargarEjes() {

        this.idEje = '';

        this.cargarTitulo('eje')

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

        this.cargarTitulo('Objetivo Estratégico')

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

        this.cargarTitulo('Línea Estratégica')

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

        this.cargarTitulo('Plan de Acción')

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
            tarjetasContainer.innerHTML = '<p class="small">Aún no hay fichas...</p>'
            opcionesContainer.append(tarjetasContainer)

        }

        $.fn.dataTable.moment('DD/MM/YYYY');

        $('#mapa-fichas').dataTable({
                "order": [[0, "desc"]],
                "pageLength": 25,
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                }
                // "scrollX": true,
                // "responsive": true,
        })

    }

}


//*-----------------------------------------------FORM - SELECTS--------------------------------------------------*//


const selectFormEjes = document.querySelector('#form-nuevohito-ejes');
const selectFormObjetivos = document.querySelector('#form-nuevohito-objetivos');
const selectFormLineas = document.querySelector('#form-nuevohito-lineas');
const selectFormPlanesdeaccion = document.querySelector('#form-nuevohito-planesdeaccion');

function crearSelects(data, selectEjes, selectObjetivos, selectLineas, selectPlanesdeaccion){
    
    for (const eje of data.ejes) {
        let html = `<option class="select-option" value=${eje.idejes}>${eje.ejesnombre}</option>`
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
            let html = `<option class="select-option" value=${obj.idobjetivos}>${obj.objetivosnombre}</option>`
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
            let html = `<option class="select-option" value=${linea.idlineas}>${linea.lineasnombre}</option>`;
            selectLineas.innerHTML += html
        }
        selectLineas.addEventListener('change', () => opcionesPlanesdeaccion(data, selectLineas, selectPlanesdeaccion))
    }
    
    function opcionesPlanesdeaccion(data, selectLineas, selectPlanesdeaccion){
        selectPlanesdeaccion.innerHTML = '<option selected value></option>';
        let lineaElegida = selectLineas.value;
        let planesDeAccion = data.planesDeAccion.filter(linea => linea.planesdeaccionlinea == lineaElegida)
        for (const plan of planesDeAccion) {
            let html = `<option class="select-option" value=${plan.idplanesdeaccion}>${plan.planesdeaccionnombre}</option>`;
            selectPlanesdeaccion.innerHTML += html
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

//*------------------------------- FICHAS ----------------------------//

const avisoLink = document.getElementById('aviso-link');
const avisoParrafo = document.getElementById('aviso-parrafo');
const boxAviso = document.getElementById('box-aviso');

function switchAviso() {

    let opcion = avisoLink.children[1].innerText;

    switch(opcion) {

        case 'Ocultar':

            avisoParrafo.classList.add('noTiene');
            boxAviso.classList.add('ver-mas');
            avisoLink.children[1].innerText = 'Leer más...'
            break;

        case 'Leer más...':

            avisoParrafo.classList.remove('noTiene');
            boxAviso.classList.remove('ver-mas');
            avisoLink.children[1].innerText = 'Ocultar'
            break;
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
                mostrarMensaje("¡Se envió la tarjeta a evaluación!")
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


//*--------------------------------- INFO ---------------------------------//


function irArriba(){

    $('.ir-arriba').on('click',
        function(){ 

            $('body,html').animate({ 
                scrollTop:0
            },100); 
        }
    );

    $(window).on('scroll',
        function(){

            if($(this).scrollTop() > 200){ 
                $('.ir-arriba').fadeIn();
            }else{ 
                $('.ir-arriba').fadeOut()
            }
        }
    );
    $('.ir-abajo').on('click', 
        function(){ 
            $('body,html').animate(
                { 
                    scrollTop: 1000
                }
            ,1000); 
        }
    );
}