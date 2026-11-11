// Este simulador es un panel para que
// los cocineros de la pizzería puedan ir eligiendo
//las nuevas pizzas del menú



class Pizza {
    constructor(id, variedad, precio, tacc) {
        this.id = id;
        this.variedad = variedad.toLowerCase();
        this.precio = parseFloat(precio);
        this.tacc = tacc;
    }
}

const pizza1 = new Pizza(0, "Margarita", 16000, "Tiene TACC");
const pizza2 = new Pizza(1, "Especial", 20000, "Sin TACC");
const pizza3 = new Pizza(2, "Hawaiana", 22000, "Sin TACC");
const pizza4 = new Pizza(3, "Napolitana", 21000, "Tiene TACC");

const pizzas = [pizza1, pizza2, pizza3, pizza4];


const formulario = document.querySelector("#form-pizza");
const inputVariedad = document.querySelector("#variedad");
const inputPrecio = document.querySelector("#precio");
const selectTacc = document.querySelector("#tacc");

const buscador = document.querySelector("#buscador");

const btnTodas = document.querySelector("#btn-todas");
const btnSinTacc = document.querySelector("#btn-sin-tacc");

const contenedorPizzas = document.querySelector("#contenedor-pizzas");
const mensaje = document.querySelector("#mensaje");


// Mostrar las pizzas en pantalla
function renderizarPizzas(listaPizzas) {

    contenedorPizzas.innerHTML = "";

    if (listaPizzas.length === 0) {
        contenedorPizzas.innerHTML = `
            <p class="sin-resultados">
                No encontramos pizzas disponibles.
            </p>
        `;
        return;
    }

    listaPizzas.forEach((pizza) => {

        contenedorPizzas.innerHTML += `
            <div class="card-pizza">

                <h3>${pizza.variedad}</h3>

                <p>Precio: $${pizza.precio.toLocaleString("es-AR")}</p>

                <p>${pizza.tacc}</p>

                <button class="btn-eliminar" data-id="${pizza.id}">
                    Eliminar
                </button>

            </div>
        `;

    });

}


/* AGREGAR NUEVAS PIZZAS */

// Evento: envío del formulario

formulario.addEventListener("submit", (e) => {


    e.preventDefault();

    // Captura de los valores de los inputs
    const variedad = inputVariedad.value.trim();
    const precio = Number(inputPrecio.value);
    const tacc = selectTacc.value;

    // Validación de los datos
    if (variedad === "" || precio <= 0 || !tacc) {
        mensaje.textContent = "Completá todos los campos correctamente.";
        return;
    }

    // Creación un nuevo objeto Pizza
    const nuevoId = Math.max(...pizzas.map(pizza => pizza.id)) + 1;

    const nuevaPizza = new Pizza(
        nuevoId,
        variedad,
        precio,
        tacc
    );

    // Se agrega la pizza nueva al array
    pizzas.push(nuevaPizza);

    // Actualización el menú
    renderizarPizzas(pizzas);

    // Mensaje
    mensaje.textContent = `¡${variedad} se agregó correctamente al menú!`;

    // Limpiar formulario
    formulario.reset();

});



// Mostrar las pizzas al cargar la página
renderizarPizzas(pizzas);


/* BUSCADOR DE PIZZAS */
//Evento para buscar pizzas
buscador.addEventListener("input", () => {

    const textoBuscado = buscador.value.toLowerCase().trim();

    // Filtrar las pizzas según su variedad
    const resultado = pizzas.filter((pizza) =>
        pizza.variedad.includes(textoBuscado)
    );

    renderizarPizzas(resultado);

});


/* FILTRO DE PIZZAS SIN TACC */

// Botón para mostrar todas las pizzas

btnTodas.addEventListener("click", () => {

    buscador.value = "";

    renderizarPizzas(pizzas);

    mensaje.textContent = "Estás viendo todas nuestras pizzas.";

});


// Botón para mostrar solamente pizzas sin TACC

btnSinTacc.addEventListener("click", () => {

    buscador.value = "";

    const sinTacc = pizzas.filter(
        (pizza) => pizza.tacc === "Sin TACC"
    );

    renderizarPizzas(sinTacc);

    mensaje.textContent = "Mostrando pizzas sin TACC.";

});

/* ELIMINAR PIZZAS */


contenedorPizzas.addEventListener("click", (e) => {

    // Verifica si se hizo click en un botón Eliminar
    if (e.target.classList.contains("btn-eliminar")) {

        // Recupera el ID de la pizza
        const id = Number(e.target.dataset.id);

        // Busca la posición de esa pizza
        const indice = pizzas.findIndex(
            (pizza) => pizza.id === id
        );

        // Elimina la pizza del array
        if (indice !== -1) {
            pizzas.splice(indice, 1);
        }

        // Volver a mostrar el menú
        renderizarPizzas(pizzas);

        // Mostrar un mensaje
        mensaje.textContent = "La pizza fue eliminada del menú.";

    }

});
