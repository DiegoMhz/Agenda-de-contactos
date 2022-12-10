const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const form = document.querySelector('#form');
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

