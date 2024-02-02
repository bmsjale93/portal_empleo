/***********************************
* FUNCIÓN PARA MOSTRAR/FILTRAR OFERTAS
***********************************/

document.addEventListener("DOMContentLoaded", function () {
    // Inicialización de elementos del DOM
    initFormAndDisplayOffers();
});

function initFormAndDisplayOffers() {
    const filterForm = document.getElementById("filterForm");
    const offersContainer = document.getElementById("offersContainer");

    // Manejo del evento submit del formulario
    filterForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto
        const keyword = document.getElementById("searchKeyword").value;
        const category = document.getElementById("categorySelect").value;
        filterAndDisplayOffers(keyword, category, offersContainer);
    });

    // Datos de muestra para las ofertas de trabajo
    const sampleOffers = [
        { title: "Desarrollador Frontend", category: "tecnologia", description: "Trabajo de desarrollo frontend usando React." },
        { title: "Marketing Digital", category: "marketing", description: "Especialista en SEO y marketing en redes sociales." },
        { title: "Analista de Datos", category: "tecnologia", description: "Análisis de grandes volúmenes de datos." },
        // Añadir más ofertas según sea necesario
    ];

    // Mostrar todas las ofertas inicialmente
    filterAndDisplayOffers("", "all", offersContainer, sampleOffers);
}

/**
 * Filtra y muestra las ofertas basándose en la palabra clave y la categoría seleccionada.
 * @param {string} keyword Palabra clave para la búsqueda.
 * @param {string} category Categoría seleccionada para filtrar.
 * @param {HTMLElement} container Elemento contenedor donde se mostrarán las ofertas.
 * @param {Array} offers Lista de ofertas para filtrar y mostrar.
 */
function filterAndDisplayOffers(keyword, category, container, offers) {
    let filteredOffers = filterOffers(keyword, category, offers);
    displayOffers(filteredOffers, container);
}

/**
 * Filtra las ofertas por palabra clave y categoría.
 * @param {string} keyword Palabra clave para la búsqueda.
 * @param {string} category Categoría para filtrar.
 * @param {Array} offers Lista de ofertas.
 * @returns {Array} Ofertas filtradas.
 */
function filterOffers(keyword, category, offers) {
    return offers.filter(offer => {
        const matchesKeyword = keyword ? offer.title.toLowerCase().includes(keyword.toLowerCase()) || 
        offer.description.toLowerCase().includes(keyword.toLowerCase()) : true;
        
        const matchesCategory = category !== "all" ? offer.category === category : true;
        return matchesKeyword && matchesCategory;
    });
}

/**
 * Muestra las ofertas filtradas en el HTML.
 * @param {Array} offers Ofertas para mostrar.
 * @param {HTMLElement} container Elemento contenedor para las ofertas.
 */
function displayOffers(offers, container) {
    container.innerHTML = ""; // Limpia el contenedor de ofertas

    offers.forEach(offer => {
        const offerElement = document.createElement("div");
        offerElement.className = "offer";
        offerElement.innerHTML = `<h3>${offer.title}</h3><p>${offer.description}</p>`;
        container.appendChild(offerElement);
    });
}
