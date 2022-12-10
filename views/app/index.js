
const form = document.querySelector('#formulario');
const inputNombre = document.querySelector('#nombre');
const inputTelefono = document.querySelector('#telefono');
const lista = document.querySelector('#lista');
const formato = document.querySelector('.formato');
// BOTONES
const btnCrear = document.querySelector('#boton-crear');
// Editar
const btnSiEdit =  document.querySelector('#si-edit');
console.log(btnSiEdit);
// REGEX
let regex = /([0-9]){3}-[0-9]{7}$/;
let nombre= /^[a-zA-Z0-9 ]{0,40}$/;
let reg = /([0-9]){3}-[0-9]{7}$/;
// TEXTO 
const textoEdit = document.querySelector('#texto-edit');
const textoContacto = document.querySelector('#texto-contacto');
textoEdit.classList.add('displaynone')
btnSiEdit.classList.add('displaynone')

// CERRAR SESION
const logoutBtn = document.querySelector('#logout-btn')
logoutBtn.addEventListener('click', async e => {
await axios.get('/api/logout');
window.location.pathname = '/';
});
// ----------------------------------------------------------------------------------

// AXIOS GET
const getTodos = async () => {
	const { data } = await axios.get('/api/todos', {
		withCredentials: true
	})
    console.log(data);
    data.forEach(element => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `
        <li id=${element.id}  class="font-normal">
        ${element.text} ${element.telefono} <button class="delete">❌</button> <button class="edit">EDIT</button>
        </li>
 `;
 lista.append(listItem);
     inputNombre.value = '';
     inputTelefono.value = '';
	})
    }
    getTodos();
// ---------------------------------------------------------------------------------------------

    // AXIOS POST
btnCrear.addEventListener('click', async e => {
    e.preventDefault();
    const nombre = inputNombre.value;
    const telefono = inputTelefono.value;
     regex = /([0-9]){3}-[0-9]{7}$/;
   console.log (regex.test(inputTelefono.value.botonCrear))
    if (!regex.test(inputTelefono.value)){
        document.querySelector('#formato-div').classList.add('formato-div')
        document.querySelector('.formato').classList.add('formato-error')
    } else {
        document.querySelector('#formato-div').classList.remove('formato-div')
        document.querySelector('.formato').classList.remove('formato-error')
        console.log('la buena');

        const addTodo = async () => {
            const { data } = await axios.post('/api/todos', {text: nombre,
                telefono: telefono}, {
                withCredentials: true
            })
            console.log(data);
            const listItem = document.createElement('div');
            listItem.classList.add('div')
            listItem.innerHTML = `
            <li id=${data.id}>
            ${data.text} ${data.telefono} <button class="delete">❌</button>
            <button class="edit">EDIT</button>
            </li>
     `;
     lista.appendChild(listItem);
         inputNombre.value = '';
         inputTelefono.value = '';

         const botonBorrar = listItem.children[0].children[0];
         botonBorrar.addEventListener('click', e => {
             e.target.parentElement.remove();
         })

            }
    addTodo();
}
});
// -------------------------------------------------------------------------------------------------------
// AXIOS DELETE

lista.addEventListener('click', async e => {
    if (e.target.classList.contains('delete')) {
        const id = e.target.parentElement.id;
        e.target.parentElement.remove();
        await axios.delete(`/api/todos/${id}`);
    }
    })
// ------------------------------------------------------------------------------------

// AXIOS PATCH
// EDITAR NUMERO 
// --------------CLICK EN EL BOTON EDIT ---------------------------------------- 
const ul = document.querySelector('ul')
lista.addEventListener('click',async e =>{
    e.preventDefault();
    const id = e.target.parentElement.id;
    if (e.target.classList.contains('edit')) {
        textoEdit.classList.remove('displaynone')
        textoContacto.classList.add('displaynone')
        btnCrear.classList.add('displaynone')
        btnSiEdit.classList.remove('displaynone')
        const li = e.target.parentElement;
        datosText = li.innerText
        const  editNombre = datosText.split(' ')[0];
        const editNumero =  datosText.split(' ')[1];
        const X = datosText.split(' ')[2];
        ul.innerHTML = `
        <li>
        ${editNombre} ${editNumero} 
        </li>
          `;
        inputNombre.value = `${editNombre}`
        inputTelefono.value = `${editNumero}`
        btnSiEdit.removeAttribute('disabled')
        btnCrear.disabled = true

// ---------------------CLICK EN EL BOTON EDITAR CONTACTO --------------------------------------
    btnSiEdit.addEventListener('click',async e =>{
           const inputNombreEdit = inputNombre.value
           const inputTelefonoEdit = inputTelefono.value
           if (regex.test(inputTelefonoEdit)) {
            await axios.patch(`/api/todos/${id}`,{text: inputNombreEdit,
                    telefono: inputTelefonoEdit});
                        li.innerHTML = `
                        <li id=${id}>
                        ${inputNombreEdit} ${inputTelefonoEdit} <button class="delete">❌</button>
                        <button class="edit">EDIT</button>
                        </li>
                     `;   
                     formato.classList.remove('formato-error')    
                     inputNombre.value = ''  
                     inputTelefono.value = '' 
                     inputNombre.placeholder = 'Nombre'
                     inputTelefono.placeholder = 'Numero'
                     btnCrear.disabled = false;
           }
           else{
            formato.classList.add('formato-error')
            e.preventDefault();
           }
    
            })
        }});

