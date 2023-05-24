//function.js

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("formulario").addEventListener('submit', validarFormulario);
});

function esNulo(valor)
{
    if (valor == 0)
    {
        alert('Completar los campos obligatorios');
        return;
    }
}

function tieneLargoMax(valor, largoMax)
{
    if(valor > largoMax)
    {
        alert('Al menos un campo excede la cantidad de caracteres permitidos');
        return;
    }
}

function esEmail(valor, limite)
{
    if(valor <= 0 || valor <= (limite - 1))
    {
        alert('La direccion de correo electrónico ingresada no es válida');
        return;
    }
}

function validarFormulario(evento)
{
    evento.preventDefault();
    var nombre = document.getElementById('nombre').value;
    esNulo(nombre.length);
    tieneLargoMax(nombre.length, 50);
    var apellido = document.getElementById('apellido').value;
    esNulo(apellido.length);
    tieneLargoMax(apellido.length, 50);
    var telefono = document.getElementById('telefono').value;
    esNulo(telefono.length);
    tieneLargoMax(telefono.length, 15);
    var email = document.getElementById('email').value;
    esNulo(email.length);
    tieneLargoMax(email.length, 320);
    esEmail(email.indexOf("@"), email.length);
    var comentario = document.getElementById('comentario').value;
    esNulo(comentario.length);
    tieneLargoMax(comentario.length, 1000);
    this.submit();
}