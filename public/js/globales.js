document.addEventListener('DOMContentLoaded', () => {

    
    loadNavbar();

    easyTabs();

    closeOffcanvas();


})

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
    // window.addEventListener('click', function (e) {

    //     // Close the menu if click happen outside menu
    //     if (e.target.closest('.dropdown-contenedor') === null) {
    //         // Close the opend dropdown
    //         closeDropdown();
    //     }

    //     if (e.target.closest('.off-canvas') === null && e.target.closest('.open-menu') === null) {
    //         closeOffcanvas();
    //     }

   

    // });

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
                // closeOffcanvas();
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

//*------------------------------------- REQUEST-OPTIONS -------------------------------------/

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

