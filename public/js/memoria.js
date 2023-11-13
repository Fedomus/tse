
class Formulario {

    areaTipo;
    areaId;
    area;
    areaNombre;
    areaDescripcion;
    areaDescripcionMin = 50;
    areaDescripcionMax = 100;
    accionDescripcionMin = 200;
    accionDescripcionMax = 500;
    accionResultadosMin = 50;
    accionResultadosMax = 100;
    accionRealizadaResumenMin= 200;
    accionRealizadaResumenMax= 500;
    accionProyectadaResumenMin= 200;
    accionProyectadaResumenMax= 500;
    sintesisMin = 500;
    sintesisMax = 1000;
    registrarArea = document.getElementById("registrar-area")
    registrarMemoria = document.getElementById("registrar-memoria")
    botonExportar = document.getElementById("boton-exportar");

    start(){

        let memoria = JSON.parse(localStorage.getItem('memoria')) || null;

        if(!memoria){
            this.cargarRegistrarArea();
        } else {
            this.cargarRegistrarAcciones();
        }
    }

    async cargarRegistrarArea(){

        this.registrarArea.style.display = 'inline-block';
        this.registrarMemoria.style.display = 'none';
        this.botonExportar.style.display = 'none';

        this.cargarSelectGerencias()

        this.cargarSelectSubgerencias()
    
        this.cargarSelectCoordinaciones()

        this.cargarSelectDepartamentos()

        await this.cargarBotonRegistrarAreaContrinuar()
    }

    async cargarRegistrarAcciones(){

        this.registrarArea.style.display = 'none';
        this.registrarMemoria.style.display = 'inline-block';
        this.botonExportar.style.display = 'inline-block';

        let memoria = JSON.parse(localStorage.getItem("memoria"))

        let { areaTipo, areaNombre } = memoria;

        this.cargarBotonVolver();

        await this.cargarListaAcciones(areaNombre);

        await this.cargarSelectsEje();

        await this.cargarFormularioAccionesRealizadas(areaNombre, areaTipo);

        await this.cargarFormularioAccionesProyectadas(areaNombre);

        await this.cargarFormularioSintesis(areaNombre);

        await this.cargarBotonExportar(areaNombre, areaTipo);
    }

    cargarSelectGerencias(){

        let select = document.getElementById("lista-gerencias");

        fetch("/api/gerencias")
        .then(response => response.json())
        .then(data => {
            for (const gerencia of data) {
        
                select.innerHTML += `
            
                    <option id="${gerencia.idgrencia}">${gerencia.gerencianombre}</option>
            
                `
            }
        })


        let input = document.getElementById("input-gerencia");

        const cargarAreaInfo = () => {
            this.cargarAreaInfo()
        }

        const cargarDatos = (tipo, id, nombre) => {
            this.areaTipo = tipo; 
            this.areaId = id;
            this.areaNombre = nombre;
        }

        const vaciarInfo = () => this.vaciarAreaInfo();

        input.addEventListener('change', function(event){

            document.getElementById("input-subgerencia").value="";
            document.getElementById("input-coordinacion").value="";
            document.getElementById("input-departamento").value="";

            let target = event.target.value;
            let datalist = select.childNodes;

            if(!target){
                vaciarInfo();
            }

            let existeArea = false;

            for (var i = 0; i < datalist.length; i++) {
                if (datalist[i].value === target) {

                    existeArea = true
                    cargarDatos("gerencia", datalist[i].id, target);
                    cargarAreaInfo()

                    break;
                }
            }

            if(!existeArea) {
                vaciarInfo()
            }

        })
    
    }

    cargarSelectSubgerencias(){

        let select = document.getElementById("lista-subgerencias")

        fetch("/api/subgerencias")
        .then(response => response.json())
        .then(data => {

            for (const subgerencia of data) {
            
                select.innerHTML += `
            
                    <option id="${subgerencia.idsubgerencia}">${subgerencia.subgerencianombre}</option>
            
                `
            }

        })

        let input = document.getElementById("input-subgerencia");

        const cargarAreaInfo = () => {
            this.cargarAreaInfo()
        }

        const cargarDatos = (tipo, id, nombre) => {
            this.areaTipo = tipo; 
            this.areaId = id;
            this.areaNombre = nombre
        }

        const vaciarInfo = () => this.vaciarAreaInfo();

        input.addEventListener('change', function(event){

            document.getElementById("input-gerencia").value="";
            document.getElementById("input-coordinacion").value="";
            document.getElementById("input-departamento").value="";

            let target = event.target.value;
            let datalist = select.childNodes;

            if(!target){
                vaciarInfo();
            }

            let existeArea = false;

            for (var i = 0; i < datalist.length; i++) {
                if (datalist[i].value === target) {

                    existeArea = true
                    cargarDatos("subgerencia", datalist[i].id, target);
                    cargarAreaInfo()

                    break;
                }
            }

            if(!existeArea) {
                vaciarInfo();
            }


        })
    }

    cargarSelectCoordinaciones(){

        let select = document.getElementById("lista-coordinaciones")

        fetch("/api/coordinaciones")
        .then(response => response.json())
        .then(data => {

            for (const coord of data) {
            
                select.innerHTML += `
            
                    <option id="${coord.idcoordinacion}">${coord.coordinacionnombre}</option>
            
                `
            }

        })

        let input = document.getElementById("input-coordinacion");

        const cargarAreaInfo = () => {
            this.cargarAreaInfo()
        }

        const cargarDatos = (tipo, id, nombre) => {
            this.areaTipo = tipo; 
            this.areaId = id;
            this.areaNombre = nombre;
        }

        const vaciarInfo = () => this.vaciarAreaInfo();

        input.addEventListener('change', function(event){

            document.getElementById("input-gerencia").value="";
            document.getElementById("input-subgerencia").value="";
            document.getElementById("input-departamento").value="";

            let target = event.target.value;
            let datalist = select.childNodes;

            if(!target){
                vaciarInfo();
            }

            let existeArea = false;

            for (var i = 0; i < datalist.length; i++) {
                if (datalist[i].value === target) {

                    existeArea = true
                    cargarDatos("coordinacion", datalist[i].id, target);
                    cargarAreaInfo()

                    break;
                }
            }

            if(!existeArea) {
                vaciarInfo()
            }

        })
    }

    cargarSelectDepartamentos(){
        let select = document.getElementById("lista-departamentos")

        fetch("/api/departamentos")
        .then(response => response.json())
        .then(data => {

            for (const dep of data) {
            
                select.innerHTML += `
            
                    <option id="${dep.iddepartamento}">${dep.departamentonombre}</option>
            
                `
            }
        })

        let input = document.getElementById("input-departamento");

        const cargarAreaInfo = () => {
            this.cargarAreaInfo()
        }

        const cargarDatos = (tipo, id, nombre) => {
            this.areaTipo = tipo; 
            this.areaId = id;
            this.areaNombre = nombre
        }

        const vaciarInfo = () => this.vaciarAreaInfo();

        input.addEventListener('change', function(event){

            document.getElementById("input-gerencia").value="";
            document.getElementById("input-subgerencia").value="";
            document.getElementById("input-coordinacion").value="";

            let target = event.target.value;
            let datalist = select.childNodes;

            if(!target){
                vaciarInfo();
            }

            let existeArea = false;

            for (var i = 0; i < datalist.length; i++) {
                if (datalist[i].value === target) {

                    existeArea = true
                    cargarDatos("departamento", datalist[i].id, target);
                    cargarAreaInfo()

                    break;
                }
            }

            if(!existeArea) {
                vaciarInfo()
            }

        })
    }

    async obtenerGerenciaPorId(id){
        return fetch("/api/gerencias")
        .then(response => response.json())
        .then(data => {
            for (const g of data) {
                if(g.idgrencia == id){
                    return g
                }
            }
        })
    }

    async obtenerSubgerenciaPorId(id){
        return fetch("/api/subgerencias")
        .then(response => response.json())
        .then(data => {
            for (const sub of data) {
                if(sub.idsubgerencia == id){
                    return sub
                }
            }
        })
    }

    async obtenerCoordinacionPorId(id){
        return fetch("/api/coordinaciones")
        .then(response => response.json())
        .then(data => {
            for (const coord of data) {
                if(coord.idcoordinacion == id){
                    return coord
                }
            }
        })
    }

    vaciarAreaInfo(){
        document.getElementById("info-area-vacio").style.display='flex';
        document.getElementById("info-area-completo").style.display='none';
    }


    completarAreaInfo(html){
        document.getElementById("info-area-vacio").style.display='none';
        document.getElementById("info-area-completo").style.display='inline-block';
        document.getElementById("info-area-completo").innerHTML = html;
        loadFormularioStyles();
        this.cargarTextareaDescripcion()
    }

    cargarAreaInfo(){

        let html;

        switch (this.areaTipo){
            case "gerencia":
                fetch("/api/gerencias")
                .then(response => response.json())
                .then(data => {
                    for(const e of data) {
                        if(e.idgrencia == this.areaId){
                            html = `
                            <br>
                            <p><span class="texto">área seleccionada: </span><span class="texto-blanco" id="area-seleccionada">${e.gerencianombre}</span></p>
                            ${e.idgrencia == 1 ? '<span class="texto small">Superior: </span><span class="texto-blanco small">Presidencia</span>' : '<span class="texto small">Superior: </span><span class="texto-blanco small">Gerencia General</span>'}
                            <br><br>
                            <div class="textarea writing">
                                <textarea id="descripcion" name="descripcion" required>${e.gerenciadescripcion ?? ""}</textarea>
                                <label id='label-descripcion' class="texto-blanco" for="descripcion">Descripción (entre 50 y 100 palabras)</label>
                                <span></span>
                            </div>
                            <br>
                            <p class="texto small"><span>Cantidad de palabras: </span><span id="descripcion-caracteres"></span></p>
                            `
                            this.area = e;
                            this.completarAreaInfo(html)
                            break;
                        }
                    }
                    
                })
                break;

            case "subgerencia":
                fetch("/api/subgerencias")
                .then(response => response.json())
                .then(async data => {
                    for(const e of data) {
                        if(e.idsubgerencia == this.areaId){

                            let gerencia;

                            if(e.subgerenciagerencia) {

                                gerencia = await this.obtenerGerenciaPorId(e.subgerenciagerencia);

                            }

                            html = `
                            <br>
                            <p><span class="texto">área seleccionada: </span><span class="texto-blanco" id="area-seleccionada">${e.subgerencianombre}</span></p>
                            ${gerencia 
                                ? '<span class="texto small">Superior: </span><span class="texto-blanco small">' + gerencia.gerencianombre + '</span>'  
                                : '<span class="texto small">Superior: </span><span class="texto-blanco small">Presidencia</span>'}
                            <br><br>
                            <div class="textarea writing">
                                <textarea id="descripcion" name="descripcion" required>${e.subgerenciadescripcion ?? ""}</textarea>
                                <label id='label-descripcion' class="texto-blanco" for="descripcion">Descripción (entre 50 y 100 palabras)</label>
                                <span></span>
                            </div>
                            <br>
                            <p class="texto small"><span>Cantidad de palabras: </span><span id="descripcion-caracteres"></span></p>
                            `
                            this.area = e;
                            this.completarAreaInfo(html)
                            break;
                        }
                    }
                    
                })
                break;

            case "coordinacion":
                fetch("/api/coordinaciones")
                .then(response => response.json())
                .then(async data => {
                    for(const coord of data) {
                        if(coord.idcoordinacion == this.areaId){

                            let superior;
                            let gerencia, subgerencia;

                            if(coord.coordinacionsubgerencia){
                                subgerencia = await this.obtenerSubgerenciaPorId(coord.coordinacionsubgerencia)
                                superior = subgerencia.subgerencianombre
                            } else if(coord.coordinaciongerencia) {
                                gerencia = await this.obtenerGerenciaPorId(coord.coordinaciongerencia)
                                superior = gerencia.gerencianombre
                            }

                            html = `
                            <br>
                            <p><span class="texto">Area: </span><span class="texto-blanco" id="area-seleccionada">${coord.coordinacionnombre}</span></p>
                            ${superior 
                                ? '<span class="texto small">Superior: </span><span class="texto-blanco small">' + superior + '</span>' 
                                : '<span class="texto small">Superior: </span><span class="texto-blanco small">Presidencia</span>'}
                            <br><br>
                            <div class="textarea writing">
                                <textarea id="descripcion" name="descripción" required>${coord.coordinaciondescripcion ?? ""}</textarea>
                                <label id='label-descripcion' class="texto-blanco" for="descripcion">Descripción (entre 50 y 100 palabras)</label>
                                <span></span>
                            </div>
                            <br>
                            <p class="texto small"><span>Cantidad de palabras: </span><span id="descripcion-caracteres"></span></p>
                            `
                            this.area = coord;
                            this.completarAreaInfo(html)
                            break;
                        }
                    }
                    
                })
                break;

                case "departamento":
                    fetch("/api/departamentos")
                    .then(response => response.json())
                    .then(async data => {
                        for(const dep of data) {
                            if(dep.iddepartamento == this.areaId){

                                let superior;
                                let gerencia, subgerencia, coordinacion;

                                if(dep.departamentocoordinacion){
                                    coordinacion = await this.obtenerCoordinacionPorId(dep.departamentocoordinacion)
                                    superior = coordinacion.coordinacionnombre;
                                } else if(dep.departamentosubgerencia){
                                    subgerencia = await this.obtenerSubgerenciaPorId(dep.departamentosubgerencia)
                                    superior = subgerencia.subgerencianombre
                                } else if(dep.departamentogerencia) {
                                    gerencia = await this.obtenerGerenciaPorId(dep.departamentogerencia)
                                    superior = gerencia.gerencianombre
                                }

                                html = `
                                <br>
                                <p><span class="texto">Area: </span><span class="texto-blanco" id="area-seleccionada">${dep.departamentonombre}</span></p>
                                ${superior 
                                    ? '<span class="texto small">Superior: </span><span class="texto-blanco small">' + superior + '</span>' 
                                    : '<span class="texto small">Superior: </span><span class="texto-blanco small">Presidencia</span>'}
                                <br><br>
                                <div class="textarea writing">
                                    <textarea id="descripcion" name="descripcion" required>${dep.departamentodescripcion ?? ""}</textarea>
                                    <label id='label-descripcion' class="texto-blanco" for="descripcion">Descripción (entre 50 y 100 palabras)</label>
                                    <span></span>
                                </div>
                                <br>
                                <p class="texto small"><span>Cantidad de palabras: </span><span id="descripcion-caracteres" style="color:'red';"></span></p>
                                `
                                this.area = dep;
                                this.completarAreaInfo(html)
                                break;
                            }
                        }
                        
                    })
                    break;

            default:
                break;
        }
        
    }

    async cargarTextareaDescripcion(){

        let descripcion = document.getElementById("descripcion");
        let label = document.getElementById("label-descripcion");
        let cantidadCaracteres = document.getElementById("descripcion-caracteres");
        let botonContinuar = document.getElementById("registrar-area-continuar")

        let cantidadPalabras = this.contarPalabras(descripcion.value);

        cantidadCaracteres.innerHTML = cantidadPalabras;

        if(descripcion.value.length) {
            descripcion.style.height = descripcion.scrollHeight + "px";
            label.style.top = '0px';
            label.style['font-size'] = '.9em';    
        }
       
        if(cantidadPalabras >= this.areaDescripcionMin && cantidadPalabras <= this.areaDescripcionMax){
            botonContinuar.disabled = false;
            cantidadCaracteres.style.color = 'green';
            this.areaDescripcion = descripcion.value;
        }
        else {
            botonContinuar.disabled = true;
            cantidadCaracteres.style.color = 'red'
        }

        descripcion.onkeyup = () => {

            this.cargarTextareaDescripcion()
        }
    }


    async cargarBotonRegistrarAreaContrinuar(){

        let boton = document.getElementById("registrar-area-continuar");

        boton.onclick = async () => {

            let areaTipo = this.areaTipo;

            let areaNombre = this.areaNombre;

            let areaDescripcion = document.getElementById("descripcion").value;

            await fetch("/api/areas", {
                method: 'PUT',
                mode: 'cors',
                cache: 'no-cache', 
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer', 
                body: JSON.stringify({
                    areaTipo,
                    areaNombre,
                    areaDescripcion
                })
            })

            localStorage.setItem('memoria', JSON.stringify({
                areaNombre,
                areaTipo,
            }));

            let memoria = await this.obtenerMemoria(areaNombre);

            if(!memoria) {

                await fetch("/api/memorias", {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache', 
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer', 
                    body: JSON.stringify({
                        anio: new Date().getFullYear(),
                        areaNombre,
                        areaTipo
                    })
                })
            }


            await this.cargarRegistrarAcciones();

        }
    }

    cargarBotonVolver(){

        let boton = document.getElementById("registrar-memoria-volver");

        boton.onclick = () => {

            localStorage.removeItem("memoria");

            location.reload();
        }
    }

    async obtenerMemoria(areaNombre){
        let memoriasResponse = await fetch("/api/memorias")
        let memorias = await memoriasResponse.json();

        for (const memoria of memorias) {

            if(memoria.area == areaNombre){
                return memoria
            }
        }

        return null;
    }


    async obtenerArea(tipo, nombre){

        let response;
        let areas;

        switch(tipo){
            case "gerencia":
                response = await fetch("/api/gerencias");
                areas = await response.json()
                for (const a of areas) {
                    if(a.gerencianombre == nombre){
                        return a
                    }
                }
            case "subgerencia":
                response = await fetch("/api/subgerencias");
                areas = await response.json()
                for (const a of areas) {
                    if(a.subgerencianombre == nombre){
                        return a
                    }
                }
            case "coordinacion":
                response = await fetch("/api/coordinaciones");
                areas = await response.json()
                for (const a of areas) {
                    if(a.coordinacionnombre == nombre){
                        return a
                    }
                }
            case "departamento":
                response = await fetch("/api/departamentos");
                areas = await response.json()
                for (const a of areas) {
                    if(a.departamentonombre == nombre){
                        return a
                    }
                }

        }

    }

    async obtenerAreaDescripcion(tipo, nombre){

        let area = await this.obtenerArea(tipo, nombre);

        switch (tipo) {
            case 'gerencia':
                return area.gerenciadescripcion;
    
            case 'subgerencia':
                return area.subgerenciadescripcion;

            case 'coordinacion':
                return area.coordinaciondescripcion;
    
            case 'departamento':
                return area.departamentodescripcion;
        
            default:
                break;
        }
    }

    async cargarFormularioAccionesRealizadas(areaNombre, areaTipo){

        let areaDescripcion = await this.obtenerAreaDescripcion(areaTipo, areaNombre);

        document.getElementById("registrar-memoria-area").innerHTML = areaNombre;
        document.getElementById("registrar-memoria-area-descripcion").innerHTML = areaDescripcion;

        this.cargarTituloAccionRealizada();
        this.cargarTextareaDescripcionAccionRealizada();
        this.cargarTextareaResultadosAccionRealizada();
        this.cargarTextareaResumenAccionRealizada();
        await this.cargarDatalistTags();

        let form = document.getElementById("formulario-accion-realizada");

        form.onsubmit = async (e) => {

            e.preventDefault()

            if(this.checkFormAccionRealizadaCompleto()){

                const requestOptions = {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache', 
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer', 
                }

                let memoria = await this.obtenerMemoria(areaNombre)

                let formData = new FormData(form);

                let requestData = Object.fromEntries(formData);

                let arrayTags = [];
                
                let tags= document.getElementsByClassName("hito-tag-realizada");
                for(let i = 0; i < tags.length; i++) {
                    let elem = tags[i]
                    arrayTags.push(elem.innerHTML);
                }

                requestData.tags=arrayTags;

                requestData.memoria = memoria.id

                requestData.tipo = "realizada"

                await fetch("/api/acciones", {
                    ...requestOptions,
                    body: JSON.stringify(requestData)
                })
         
                window.location.reload()
            }
            
        }
       
    }

    async cargarListaAcciones(areaNombre){

        let responseAcciones = await fetch("/api/acciones")
        let acciones = await responseAcciones.json()

        let accionesRealizadasFiltradas = acciones.filter(elem => elem.acciontipo == 'realizada' && elem.area == areaNombre)
        let accionesProyectadasFiltradas = acciones.filter(elem => elem.acciontipo == 'proyectada' && elem.area == areaNombre)

        let seccionAccionesRealizadas = document.getElementById("seccion-acciones-realizadas");
        let seccionAccionesProyectadas = document.getElementById("seccion-acciones-proyectadas");

        let divAccionesRealizadas = document.createElement('div');
        let divAccionesProyectadas = document.createElement("div");

        let htmlAccionesRealizadas = "";
        let htmlAccionesProyectadas = "";

        if(!accionesRealizadasFiltradas.length){
            htmlAccionesRealizadas = "<p class='texto-blanco'>Aún no hay acciones cargadas...</p>"
        } 
        else {

            for (let i = 0; i < accionesRealizadasFiltradas.length; i ++) {

                let arealizada = accionesRealizadasFiltradas[i]

                htmlAccionesRealizadas += `
                <details>
                    <summary style="padding: 10px; background: none;">${arealizada.acciontitulo}</summary>
                    <p style="padding: 10px;">${arealizada.accionresumen}</p>
                </details>
                `
            }
        }

        if(!accionesProyectadasFiltradas.length){
            htmlAccionesProyectadas = "<p class='texto-blanco'>Aún no hay acciones cargadas...</p>"
        }
        else {
            for (let i = 0; i < accionesProyectadasFiltradas.length; i ++) {

                let aproyectada = accionesProyectadasFiltradas[i];

                htmlAccionesProyectadas += `
                <details>
                    <summary style="padding: 10px; background: none;">${aproyectada.acciontitulo}</summary>
                    <p style="padding: 10px;">${aproyectada.accionresumen}</p>
                </details>
                `
            }
        }

        divAccionesRealizadas.innerHTML = htmlAccionesRealizadas;
        divAccionesProyectadas.innerHTML = htmlAccionesProyectadas;

        seccionAccionesRealizadas.append(divAccionesRealizadas);
        seccionAccionesProyectadas.append(divAccionesProyectadas);

    
    }

    contarPalabras(string){
        if(string.length){
            let array = string.split(' ');
            return array.length - 1
        } else {
            return 0
        }
    
    }

    async cargarSelectsEje(){

        let pegiResponse = await fetch("/api/pegi")
        let pegi = await pegiResponse.json();
        
        let selectRealizada = document.getElementById("accion-realizada-eje");
        let selectProyectada = document.getElementById("accion-proyectada-eje");

        for (const eje of pegi.ejes) {
            
            selectRealizada.innerHTML += `
                <option value="${eje.ejesnombre}">${eje.ejesnombre}</option>
            `

            selectProyectada.innerHTML += `
            <option value="${eje.ejesnombre}">${eje.ejesnombre}</option>
        `

        }

    }

    cargarTextareaDescripcionAccionRealizada(){

        let textarea = document.getElementById("accion-realizada-descripcion");

        let cantidadPalabras = this.contarPalabras(textarea.value);
        
        let contador = document.getElementById("descripcion-cantidad-palabras");

        contador.innerText = cantidadPalabras;

        if (
            (cantidadPalabras >= this.accionDescripcionMin)
            && 
            (cantidadPalabras <= this.accionDescripcionMax)
        ){
            contador.style.color = 'green'
        } else {
            contador.style.color = 'red'
        }

        textarea.onkeyup = () => {

            this.cargarTextareaDescripcionAccionRealizada();

            this.cargarBotonGuardarAccionRealizada();

        }

    }


    cargarTextareaResultadosAccionRealizada(){

        let textarea = document.getElementById("accion-realizada-resultados");

        let cantidadPalabras = this.contarPalabras(textarea.value);
        
        let contador = document.getElementById("resultados-cantidad-palabras");

        contador.innerText = cantidadPalabras;

        if (
            (cantidadPalabras >= this.accionResultadosMin)
            && 
            (cantidadPalabras <= this.accionResultadosMax)
        ){
            contador.style.color = 'green'
        } else {
            contador.style.color = 'red'
        }

        textarea.onkeyup = () => {

            this.cargarTextareaResultadosAccionRealizada();

            this.cargarBotonGuardarAccionRealizada();

        }

    }

    cargarTextareaResumenAccionRealizada(){

        let textarea = document.getElementById("accion-realizada-resumen");

        let cantidadCaracteres = parseInt(textarea.value.length);

        let contador = document.getElementById("resumen-cantidad-palabras");

        contador.innerText = cantidadCaracteres;

        if (
            (cantidadCaracteres >= this.accionRealizadaResumenMin)
            && 
            (cantidadCaracteres <= this.accionRealizadaResumenMax)
        ){
            contador.style.color = 'green'
        } else {
            contador.style.color = 'red'
        }

        textarea.onkeyup = () => {

            this.cargarTextareaResumenAccionRealizada();

            this.cargarBotonGuardarAccionRealizada();

        }
    }
    

    async cargarDatalistTags(){

        let selectRealizada = document.getElementById("lista-tags");
        let selectProyectada = document.getElementById("aproyectada-lista-tags");

        let tagsResponse = await fetch("/api/tags")
        let tags = await tagsResponse.json()

        for (const tag of tags) {
            
            selectRealizada.innerHTML += `
            <option id="${tag.idtags}">${tag.tagsnombre}</option>
            `

            selectProyectada.innerHTML += `
            <option id="${tag.idtags}">${tag.tagsnombre}</option>
            `
            
        }


        let inputRealizada = document.getElementById("input-tags");
        let inputProyectada = document.getElementById("aproyectada-input-tags");
        let tagsContainerRealizada = document.getElementById("tags-container");
        let tagsContainerProyectada = document.getElementById("aproyectada-tags-container");

        const cargarBotonRealizada = () => {
            this.cargarBotonGuardarAccionRealizada();
        }

        const cargarBotonProyectada = () => {
           this.cargarBotonGuardarAccionProyectada();
        }

        inputRealizada.addEventListener('change', function(event){

            let target = event.target.value;
            let datalist = selectRealizada.childNodes;

            let existeTag = false;

            for (var i = 0; i < datalist.length; i++) {
                if (datalist[i].value === target) {

                    existeTag = true
                    break;
                }
            }

            if(existeTag){

                let tagsValues = [];
            
                for (const t of tagsContainerRealizada.children) {
                    tagsValues.push(t.innerHTML)
                }
            
                if (
                    (event.target.value.length > 0) 
                    && 
                    (!tagsValues.find(elem => elem == event.target.value))
                    &&
                    (tagsValues.length <= 10)
                    ) {
                        var text = document.createTextNode(event.target.value);
                        var span = document.createElement('span');
                        tagsContainerRealizada.appendChild(span);
                        span.appendChild(text);
                        span.classList.add("hito-tag-realizada");
                        let tags= document.getElementsByClassName("hito-tag-realizada");
                        for(let i = 0; i < tags.length; i++) {
                            let elem = tags[i]
                            elem.addEventListener('click', () => {
                                elem.remove();
                                cargarBotonRealizada();
                            });
                        }

                        inputRealizada.value = "";

                        cargarBotonRealizada();
                    }
            }

        })


        inputProyectada.addEventListener('change', function(event){

            let target = event.target.value;
            let datalist = selectProyectada.childNodes;

            let existeTag = false;

            for (var i = 0; i < datalist.length; i++) {
                if (datalist[i].value === target) {

                    existeTag = true
                    break;
                }
            }

            if(existeTag){

                let tagsValues = [];
            
                for (const t of tagsContainerProyectada.children) {
                    tagsValues.push(t.innerHTML)
                }
            
                if (
                    (event.target.value.length > 0) 
                    && 
                    (!tagsValues.find(elem => elem == event.target.value))
                    &&
                    (tagsValues.length <= 10)
                    ) {
                        var text = document.createTextNode(event.target.value);
                        var span = document.createElement('span');
                        tagsContainerProyectada.appendChild(span);
                        span.appendChild(text);
                        span.classList.add("hito-tag-proyectada");
                        let tags= document.getElementsByClassName("hito-tag-proyectada");
                        for(let i = 0; i < tags.length; i++) {
                            let elem = tags[i]
                            elem.addEventListener('click', () => {
                                elem.remove();
                                cargarBotonProyectada();
                            });
                        }

                        inputProyectada.value = "";

                        cargarBotonProyectada();
                    }
            }

        })

    }

    checkFormAccionRealizadaCompleto(){
        let titulo = document.getElementById("accion-realizada-titulo")
        let descripcion = document.getElementById("accion-realizada-descripcion");
        let resultados = document.getElementById("accion-realizada-resultados");
        let resumen = document.getElementById("accion-realizada-resumen");
        let tags= document.getElementsByClassName("hito-tag-realizada");

        let tituloLength = titulo.value.length;
        let descripcionCantidadPalabras = this.contarPalabras(descripcion.value);
        let resultadosCantidadPalabras = this.contarPalabras(resultados.value);
        let resumenLength = resumen.value.length;
        let tagsCantidad = tags.length;

        if(
            (tituloLength > 0 && tituloLength <= 255)
            &&
            (descripcionCantidadPalabras >= this.accionDescripcionMin && descripcionCantidadPalabras <= this.accionDescripcionMax)
            &&
            (resultadosCantidadPalabras >= this.accionResultadosMin && resultadosCantidadPalabras <= this.accionResultadosMax)
            &&
            (resumenLength >= this.accionRealizadaResumenMin && resumenLength <= this.accionRealizadaResumenMax)
            &&
            (tagsCantidad >= 4 && tagsCantidad <= 10)
        ) {
            return true;
        } 
            
        return false;
        

    }

    cargarTituloAccionRealizada(){
        let input = document.getElementById("accion-realizada-titulo");
        input.onchange = () => {
            this.cargarBotonGuardarAccionRealizada();
        }
    }

    cargarBotonGuardarAccionRealizada(){

        let boton = document.getElementById("accion-realizada-agregar");

        if(this.checkFormAccionRealizadaCompleto()){
            boton.disabled = false;
        } else {
            boton.disabled = true;
        }

    }


    async cargarSintesisGestion(areaNombre){

        let textareaSintesis = document.getElementById("textarea-sintesis");
        let label = document.getElementById("label-sintesis");

        let memoria = await this.obtenerMemoria(areaNombre); 

        if(memoria.sintesis){

            textareaSintesis.innerHTML = memoria.sintesis;
            textareaSintesis.style.height = textareaSintesis.scrollHeight + "px";
            label.style.top = '0px';
            label.style['font-size'] = '.9em';   

        }

    }

    cargarTextareaSintesisGestion(){

        let textareaSintesis = document.getElementById("textarea-sintesis");

        let contador = document.getElementById("sintesis-cantidad-palabras");

        let cantidadPalabras = parseInt(textareaSintesis.value.length);

        contador.innerText = cantidadPalabras;

        if(cantidadPalabras >= 500 && cantidadPalabras <= 1000){
            contador.style.color = 'green';
        } else {
            contador.style.color = 'red';
        }

        textareaSintesis.onkeyup = () => {

            this.cargarTextareaSintesisGestion();

            this.cargarBotonGuardarSintesis();

        }
    }

    cargarBotonGuardarSintesis(){

        let boton = document.getElementById("sintesis-guardar");
        let textareaSintesis = document.getElementById("textarea-sintesis");

        let cantidadCaracteres = textareaSintesis.value.length;

        if(cantidadCaracteres >= this.sintesisMin && cantidadCaracteres <= this.sintesisMax){
            boton.disabled = false;
        } else {
            boton.disabled = true;
        }
    }

    async cargarFormularioAccionesProyectadas(areaNombre) {

        await this.cargarTextareaResumenAccionProyectada();

        this.cargarTituloAccionProyectada();

        this.cargarBotonGuardarAccionProyectada();

        let form = document.getElementById("formulario-accion-proyectada");

        form.onsubmit = async (e) => {

            e.preventDefault()

            if(this.checkFormAccionProyectadaCompleto()){

                const requestOptions = {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache', 
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer', 
                }

                let memoria = await this.obtenerMemoria(areaNombre)

                let formData = new FormData(form);

                let requestData = Object.fromEntries(formData);

                let arrayTags = [];
                
                let tags= document.getElementsByClassName("hito-tag-proyectada");
                for(let i = 0; i < tags.length; i++) {
                    let elem = tags[i]
                    arrayTags.push(elem.innerHTML);
                }

                requestData.tags=arrayTags;

                requestData.memoria = memoria.id

                requestData.tipo = "proyectada"

                await fetch("/api/acciones", {
                    ...requestOptions,
                    body: JSON.stringify(requestData)
                })

                window.location.reload()
         
            }
        }

    }

    async cargarTextareaResumenAccionProyectada() {

        let textarea = document.getElementById("accion-proyectada-resumen");

        let cantidadCaracteres = parseInt(textarea.value.length);

        let contador = document.getElementById("aproyectada-resumen-cantidad-palabras");

        contador.innerText = cantidadCaracteres;

        if (
            (cantidadCaracteres >= this.accionProyectadaResumenMin)
            && 
            (cantidadCaracteres <= this.accionProyectadaResumenMax)
        ){
            contador.style.color = 'green'

        } else {
            contador.style.color = 'red'
        }

        textarea.onkeyup = () => {

            this.cargarTextareaResumenAccionProyectada();
            
            this.cargarBotonGuardarAccionProyectada();

        }

    }

    cargarTituloAccionProyectada(){
        let input = document.getElementById("accion-proyectada-titulo");
        input.onchange = () => {
            this.cargarBotonGuardarAccionProyectada();
        }
    }


    cargarBotonGuardarAccionProyectada(){

        let boton = document.getElementById("accion-proyectada-agregar");

        if(this.checkFormAccionProyectadaCompleto()){
            boton.disabled = false;
        } else {
            boton.disabled = true;
        }

    }

    checkFormAccionProyectadaCompleto(){

        let titulo = document.getElementById("accion-proyectada-titulo");
        let resumen = document.getElementById("accion-proyectada-resumen");
        let tags= document.getElementsByClassName("hito-tag-proyectada");

        let tituloLength = titulo.value.length;
        let resumenLength = resumen.value.length;
        let tagsCantidad = tags.length;

        if(
            (tituloLength > 0 && tituloLength <= 255)
            &&
            (resumenLength >= this.accionProyectadaResumenMin && resumenLength <= this.accionProyectadaResumenMax)
            &&
            (tagsCantidad >= 4 && tagsCantidad <= 10)
        ){
            return true
        }
        return false
    }


    async cargarFormularioSintesis(areaNombre){

        await this.cargarSintesisGestion(areaNombre)
        this.cargarTextareaSintesisGestion()
        this.cargarBotonGuardarSintesis()

        let form = document.getElementById("formulario-sintesis");
        
        form.onsubmit = async (e) => {

            e.preventDefault()

            const requestOptions = {
                method: 'PUT',
                mode: 'cors',
                cache: 'no-cache', 
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer', 
            }

            let memoria = await this.obtenerMemoria(areaNombre)

            let formData = new FormData(form);

            let requestData = Object.fromEntries(formData);

            requestData.id = memoria.id

            await fetch("/api/memorias", {
                ...requestOptions,
                body: JSON.stringify(requestData)
            })

            window.location.reload()
        }

    }


    async cargarBotonExportar(areaNombre, areaTipo){

        let boton = document.getElementById("boton-exportar");

        boton.onclick = async () => {

            let responseAcciones = await fetch("/api/acciones")
            let acciones = await responseAcciones.json()

            let areaDescripcion = await this.obtenerAreaDescripcion(areaTipo, areaNombre);

            let memoria = await this.obtenerMemoria(areaNombre);

            let accionesRealizadas = acciones.filter(elem => elem.acciontipo == 'realizada' && elem.area == areaNombre)
            let accionesProyectadas = acciones.filter(elem => elem.acciontipo == 'proyectada' && elem.area == areaNombre)

            let preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><head></head><body>";
            let postHtml = "</body></html>";

            let html = `<h1>${areaNombre}</h1><p>${areaDescripcion}</p><h2>Acciones Realizadas</h2>`;

            if(accionesRealizadas.length){

                for (let index = 0; index < accionesRealizadas.length; index++) {

                    const element = accionesRealizadas[index];
    
                    html+= `
                        <h3>${index + 1}. ${element.acciontitulo}</h3>
                        <h4>Descripción</h4>
                        <p>${element.acciondescripcion}</p>
                        <h4>Resultados</h4>
                        <p>${element.accionresultados}</p>
    
                    `
                }

            }
            else{
                html+=`<p>Aún no hay acciones cargadas...</p>`
            }

            html += '<h2>Acciones Proyectadas</h2>'

            if(accionesProyectadas.length){

                for (let index = 0; index < accionesProyectadas.length; index++) {

                    const element = accionesProyectadas[index];
    
                    html+= `
                        <h3>${index + 1}. ${element.acciontitulo}</h3>
                        <h4>Descripción</h4>
                        <p>${element.accionresumen}</p>
    
                    `
                }

            }
            else{
                html+=`<p>Aún no hay acciones cargadas...</p>`
            }

            html+='<h2>Síntesis de gestión</h2>'

            if(memoria.sintesis){
                html += `<p>${memoria.sintesis}</p>`
            }
            else{
                html+=`<p>Aún no hay síntesis cargada</p>`
            }

            let documento = preHtml+html+postHtml
            
            var blob = new Blob(['ufeff', documento], {
                type: 'application/msword'
            });

            let url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(documento);
    
            let filename = areaNombre+'.doc';

            var downloadLink = document.createElement("a");

            document.body.appendChild(downloadLink);
            
            if(navigator.msSaveOrOpenBlob ){
                navigator.msSaveOrOpenBlob(blob, filename);
            }else{
                // Create a link to the file
                downloadLink.href = url;
                
                // Setting the file name
                downloadLink.download = filename;
                
                //triggering the function
                downloadLink.click();
            }
            
            document.body.removeChild(downloadLink);
        }

    }
    
}





document.addEventListener("DOMContentLoaded", function(){
    
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let miFormulario = new Formulario()

    miFormulario.start();

});