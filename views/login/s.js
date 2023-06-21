const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const form = document.querySelector('#form');
const menuMobile = document.querySelector('#menu-mobile');
const menuBar = document.querySelector('#menu-bar');
const menuIcon = document.querySelector('#menu-icon');

menuIcon.addEventListener('click', e => {
    console.log('yes');
    menuBar.classList.toggle('hidden')
    menuMobile.classList.toggle('show');
});
form.addEventListener('submit', async e =>{
    e.preventDefault();

    try {
       const credentials ={
        email: emailInput.value,
        password: passwordInput.value
       }
      const {data} = await axios.post('/api/login/', credentials )
      window.location.pathname = `/app/${data}`;
    } catch (error) {
        const errorText = (error.response.data.error);
        const div = document.createElement('div')
        div.innerHTML = `<div id="div-error">
        <p class="text-center text-red-500 font-bold">Email o contraseña invalida;</p>
    </div>`
        form.appendChild(div)
    }

})

