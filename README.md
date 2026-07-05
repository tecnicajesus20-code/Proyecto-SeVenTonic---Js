# Proyecto-SeVenTonic---Js
Proyecto_Conciertos_SalcedoKleiderson/
│
├── index.html                      # Vista pública (Contiene el diseño base, los eventos y los modales de Login e Info)
├── admin.html                      # Vista principal del Administrador (Dashboard / Panel de control)
├── README.md                       # Documentación del proyecto
│
├── administracion/                 # Carpetas de subpáginas exclusivas del administrador (HTMLs independientes)
│   ├── gestion-eventos.html        # Formulario para crear/editar eventos y asignarles categoría
│   ├── categorias.html             # Gestión y visualización de las categorías (Musical, Deportivo, etc.)
│   └── reporte-ventas.html         # Panel con métricas y reportes de los tickets vendidos
│
├── css/
│   ├── styles.css                  # Estilos generales y variables dinámicas (Neon Pulse / Adaptable)
│   ├── responsive.css              # Estilos responsivos para que se vea bien en celulares y tablets
│   └── admin-pages.css             # Estilos específicos para el dashboard y sus 3 subpáginas
│
├── js/
│   ├── main.js                     # Lógica de la vista pública (control de los modales de Login e Info)
│   ├── admin.js                    # Lógica del dashboard principal de administración
│   ├── storage.js                  # Manejo de localStorage (guardar eventos, usuarios y ventas en el navegador)
│   ├── components.js               # Web Components reutilizables (ej: header, footer, tarjetas de eventos)
│   ├── data-seed.js                # Datos iniciales quemados (conciertos, deportes y negocios por defecto)
│   └── modulos-admin/              # Lógica específica para las tres subpáginas del admin
│       ├── gestion-eventos.js
│       ├── categorias.js
│       └── reporte-ventas.js
│
└── assets/
    └── img/

    # GUÍA DE REFERENCIA JAVASCRIPT Y ESTÁNDARES PARA EL PROYECTO
> [!IMPORTANT]
> **INSTRUCCIÓN PARA LA IA:** Este documento describe detalladamente los conceptos, métodos, APIs y patrones de diseño de JavaScript que se han aprendido y aplicado en clase. Al desarrollar o modificar código para este proyecto, debes ceñirte estrictamente a estas tecnologías y patrones de implementación para mantener la coherencia con el aprendizaje del estudiante.
---
## 📋 Resumen de Tecnologías y Conceptos Aprendidos
A continuación se detallan las herramientas de JavaScript agrupadas por categoría, con ejemplos prácticos basados en los talleres realizados en clase.
---
### 1. Variables, Ámbito y Tipos de Datos
*   **Declaración de Variables:**
    *   `const`: Para valores u objetos de referencia constante (no reasignables). **(Uso preferente)**.
    *   `let`: Para variables cuyo valor cambiará a lo largo del tiempo.
    *   `var`: Evitar su uso debido al hoisting y a que no respeta el ámbito de bloque (ej. se filtra fuera de bloques `if`).
*   **Inspección y Conversión:**
    *   `typeof(variable)`: Permite inspeccionar el tipo de dato actual (`string`, `number`, `object`, `function`, etc.).
    *   `Number(texto)`: Conversión explícita de `string` a `number`. Si la conversión falla, produce `NaN` (Not-a-Number).
*   **Métodos de String Comunes:**
    *   `.trim()`: Remueve espacios en blanco al inicio y final del texto.
    *   `.toUpperCase()` / `.toLowerCase()`: Conversión de mayúsculas/minúsculas.
    *   `.includes("subcadena")`: Verifica si un texto contiene a otro (devuelve boolean).
```javascript
// Ejemplo práctico de variables y strings
let nombreProducto = "  teclado gamer  ";
const precioTexto = "120000";
let nombreLimpio = nombreProducto.trim(); // "teclado gamer"
let nombreMayus = nombreLimpio.toUpperCase(); // "TECLADO GAMER"
let contieneGamer = nombreLimpio.toLowerCase().includes("gamer"); // true
const precio = Number(precioTexto); // 120000 (number)
const total = precio * 2;
```
---
### 2. Estructuras de Control y Comparadores
*   **Comparación Estricta:**
    *   `==` (Igualdad abstracta): Compara valores intentando conversión de tipos (ej. `18 == "18"` es `true`). **Evitar**.
    *   `===` (Igualdad estricta): Compara valor y tipo de dato (ej. `18 === "18"` es `false`). **Usar siempre**.
*   **Condicionales:**
    *   `if`, `else if`, `else`: Para ramificaciones lógicas.
    *   `switch / case / break / default`: Para evaluar múltiples valores concretos de una variable de forma limpia.
*   **Estructuras Repetitivas (Bucles):**
    *   `for (let i = 0; i < limite; i++)`: Iteración estándar para rangos de números o recorrer arrays manualmente.
    *   `while (condicion)`: Repetición basada en una condición booleana.
```javascript
// Uso de if y comparadores estrictos
if (totalCalculado >= 200000 && disponible === true) {
    console.log("Aplica envío gratis");
} else {
    console.log("No aplica envío gratis");
}
// Estructura Switch
switch (metodoPago) {
    case "efectivo":
        console.log("Pago en efectivo");
        break;
    case "tarjeta":
        console.log("Pago con tarjeta");
        break;
    default:
        console.log("Método de pago no válido");
}
```
---
### 3. Funciones y Programación de Callbacks
*   **Declaraciones Clásicas:** `function miFuncion(a, b) { return a + b; }`
*   **Arrow Functions:** `(a, b) => a + b` (muy usadas en iteraciones y promesas).
*   **Callbacks (Funciones como parámetros):** Pasar una función como argumento a otra para delegar su ejecución.
```javascript
// Definición de callbacks
function suma(num1, num2) { return num1 + num2; }
function mul(num1, num2) { return num1 * num2; }
// Función de orden superior
function realizar_operacion(num1, num2, operacionCallback) {
    const resultado = operacionCallback(num1, num2);
    console.log("El resultado es:", resultado);
}
// Invocación
realizar_operacion(2, 4, suma); // 6
realizar_operacion(2, 4, mul);  // 8
```
---
### 4. Objetos Literales, Desestructuración y Operador Spread
*   **Estructura de Objeto:** Colecciones de clave-valor. Pueden incluir funciones internas como métodos utilizando la palabra clave `this` para acceder a sus propias propiedades.
*   **Object Helpers:**
    *   `Object.keys(objeto)`: Devuelve un array con los nombres de las propiedades.
    *   `Object.values(objeto)`: Devuelve un array con los valores de las propiedades.
    *   `Object.assign(destino, origen)`: Copia propiedades de un objeto a otro.
*   **Desestructuración (Destructuring):** Extraer propiedades directamente a variables locales con posibilidad de renombrado.
*   **Operador de Propagación (Spread Operator `...`):** Clonar objetos y fusionar sus propiedades de forma declarativa.
```javascript
// Objeto con método y 'this'
const persona = {
    nombre: "Julio Ernesto",
    edad: 27,
    ciudad: "Zipaquira",
    saludar: function () {
        console.log("Hola soy " + this.nombre + " y tengo " + this.edad + " años.");
    }
};
// Desestructuración con renombrado
const { id: idusuario, nombre } = usuario;
// Spread Operator para fusionar objetos
const system = {
    so: "LINUX",
    soft: "Windows",
    ...usuario // Copia todas las propiedades del objeto usuario aquí
};
```
---
### 5. Arrays y Métodos de Orden Superior (Métodos Funcionales)
Se prefiere la manipulación de arrays mediante métodos declarativos frente a bucles `for` tradicionales.
*   `push(elemento)`: Inserta al final del array.
*   `pop()`: Remueve y retorna el último elemento del array.
*   `map(callback)`: Crea un nuevo array transformando cada elemento.
*   `filter(callback)`: Filtra los elementos que cumplen una condición booleana.
*   `reduce(callback, valorInicial)`: Reduce los elementos a un único valor acumulado (ej. sumas, concatenaciones).
*   `forEach(callback)`: Itera los elementos para ejecutar efectos secundarios (muy útil para renderizar elementos en el DOM).
```javascript
const precios = [10000, 20000, 30000, 40000];
// 1. Transformar agregando el IVA (19%)
const preciosConIva = precios.map(p => p * 1.19);
// 2. Filtrar mayores a 20000
const costosos = preciosConIva.filter(p => p > 20000);
// 3. Sumar el total acumulado
const totalAcumulado = costosos.reduce((acumulador, p) => acumulador + p, 0);
```
---
### 6. Colecciones Modernas (Set y Map)
*   **Set:** Colección de elementos únicos (no permite duplicados).
*   **Map:** Colección estructurada de clave-valor que permite cualquier tipo de dato como clave y mantiene el orden de inserción.
```javascript
// Set para valores únicos
const miSet = new Set([1, 2, 2, 3]); // Contiene: {1, 2, 3}
// Map para estructuras clave-valor dinámicas
const miMap = new Map();
miMap.set("nombre", "Javier");
miMap.set("edad", 18);
const nombreMap = miMap.get("nombre");
```
---
### 7. Manejo de JSON
*   `JSON.stringify(objeto)`: Convierte un objeto o array en una cadena de texto en formato JSON. Utilizado para almacenamiento o transmisión de datos.
*   `JSON.parse(textoJSON)`: Convierte una cadena JSON en un objeto de JavaScript útil.
```javascript
// Conversión a JSON y viceversa
const jsonString = JSON.stringify(persona);
const nuevoObjeto = JSON.parse(jsonString);
```
---
### 8. Manipulación Avanzada del DOM
Este es el pilar de la interactividad del proyecto. Se deben utilizar los selectores y las APIs nativas del DOM sin dependencias externas.
#### Selectores y Atributos
*   `document.querySelector("#id / .clase / tag")`: Selección del primer nodo que coincida con el selector CSS.
*   `element.textContent`: Modificación o lectura segura de texto plano.
*   `element.innerHTML`: Modificación del marcado HTML interno. *(Usar con precaución para evitar problemas de XSS)*.
*   `element.getAttribute("attr")`, `element.setAttribute("attr", "valor")`, `element.removeAttribute("attr")`: Manejo de atributos HTML (ej. remover `disabled` para habilitar un botón).
#### Gestión de Clases CSS (`classList`)
*   `classList.add("nombreClase")` / `classList.remove("nombreClase")`
*   `classList.toggle("nombreClase")`: Alterna la presencia de la clase.
*   `classList.contains("nombreClase")`: Devuelve un boolean indicando si la clase está presente.
*   `classList.replace("claseVieja", "claseNueva")`
#### Creación, Inserción y Reemplazo de Elementos
*   `document.createElement("tag")`: Crea un nodo de elemento HTML en memoria (ej. `article`, `div`, `p`, `button`).
*   `parent.append(hijo1, hijo2, ...)`: Inserta uno o más elementos al **final** de los hijos de un contenedor.
*   `parent.prepend(hijo1, hijo2, ...)`: Inserta elementos al **inicio** de los hijos de un contenedor.
*   `element.before(nuevoHermano)`: Inserta un nodo inmediatamente **antes** del elemento objetivo.
*   `element.after(nuevoHermano)`: Inserta un nodo inmediatamente **después** del elemento objetivo.
*   `element.remove()`: Remueve el elemento del documento de manera directa.
*   `element.replaceWith(nuevoElemento)`: Reemplaza el nodo actual con uno nuevo.
*   `parent.replaceChildren(hijo1, hijo2)`: Limpia por completo el contenedor padre y le asigna los nuevos hijos provistos.
    *   *Tip:* `parent.replaceChildren()` (sin argumentos) se utiliza para vaciar un contenedor rápidamente antes de realizar un nuevo render.
#### Navegación por el Árbol del DOM (DOM Traversal)
*   `element.parentElement`: Acceso al elemento contenedor directo.
*   `element.children` / `element.children.length`: Colección de hijos directos y cantidad total de los mismos.
*   `element.firstElementChild`: Acceso al primer hijo del elemento.
```javascript
// Ejemplo de creación e inserción estructurada
const contenedor = document.querySelector("#contenedor-productos");
const tarjeta = document.createElement("article");
tarjeta.classList.add("producto");
const titulo = document.createElement("h3");
titulo.textContent = "Mouse Óptico";
const btnEliminar = document.createElement("button");
btnEliminar.textContent = "Eliminar";
// Evento anidado con navegación DOM
btnEliminar.addEventListener("click", function () {
    const parentCard = btnEliminar.parentElement;
    if (parentCard) {
        parentCard.remove(); // Se elimina la tarjeta
        actualizarEstadisticas(); // Llamada a función de actualización de interfaz
    }
});
// Ensamblado dinámico
tarjeta.append(titulo, btnEliminar);
contenedor.append(tarjeta);
```
---
### 9. Manejo de Formularios (`FormData`)
Para el envío de formularios y recolección de entradas, se utiliza la API `FormData`, evitando extraer valor por valor de forma manual.
*   `new FormData(formularioHTML)`: Recopila automáticamente todos los pares `name`-`value` del formulario.
*   `event.preventDefault()`: Detiene la recarga de página por defecto de los eventos `"submit"`.
*   Métodos de `FormData`: `.get("name")`, `.append("clave", valor)`, `.delete("clave")`.
```javascript
const formulario = document.querySelector("#mi-formulario");
formulario.addEventListener("submit", function (event) {
    event.preventDefault(); // Detiene recarga de página
    
    const datos = new FormData(formulario);
    const nombre = datos.get("inputNombre");
    const email = datos.get("inputEmail");
    
    console.log("Nombre enviado:", nombre);
    console.log("Email enviado:", email);
});
```
---
### 10. Asincronía, API Fetch y Promesas
El manejo de solicitudes remotas o locales de datos JSON se realiza mediante `fetch` combinándolo preferentemente con la sintaxis moderna `async / await` y control de excepciones mediante bloques `try / catch`.
*   **Creación de Promesas:** `new Promise((resolve, reject) => { ... })`
*   **Consumo clásico de Promesas:** `.then().catch().finally()`
*   **Consumo Moderno (Async/Await):**
    *   Declaración con `async function`.
    *   Uso de `await` para pausar la ejecución secuencial hasta que la promesa se resuelva.
    *   Envolver en `try / catch` para captura de errores de red o parseo.
```javascript
// Carga asíncrona de archivos locales JSON mediante Fetch y Async-Await
async function cargarEquipos() {
    try {
        const respuesta = await fetch("data/equipos.json");
        
        // Parsear a objeto JS
        const datos = await respuesta.json();
        
        // Visualizar en consola como tabla (Ideal para depuración)
        console.table(datos.equipos);
        
        // Renderizar en el DOM
        renderizarEquipos(datos.equipos);
        
    } catch (error) {
        console.error("Error al cargar los datos de equipos:", error);
    }
}
```
---
## 🛠️ Guía de Arquitectura de Implementación en un Proyecto
Cuando se inicie el desarrollo de un proyecto que requiera aplicar lo anterior, la estructura de código JavaScript debe seguir las siguientes pautas organizativas:
### 1. Estructura de Directorios Recomendada
```text
mi-proyecto/
│
├── index.html
├── css/
│   └── styles.css
├── data/
│   └── datos.json             # Archivos JSON locales para simular base de datos
└── js/
    ├── main.js                # Archivo principal de inicialización y eventos
    ├── components.js          # Creadores de elementos dinámicos (UI)
    └── api.js                 # Manejo de Fetch y operaciones asíncronas
```
### 2. Patrón de Flujo de Datos y Renderizado de Interfaz
El flujo estándar para listar e interactuar con datos dinámicos debe estructurarse así:
1. **Inicio**: Cargar página o disparar evento de usuario.
2. **Fetch**: Llamar a función asíncrona con `fetch` para descargar la información (de un backend o un archivo JSON local).
3. **Limpieza**: Limpiar el contenedor llamando a `replaceChildren()`.
4. **Iteración**: Recorrer la colección descargada mediante `.forEach()`.
5. **Creación**: Crear dinámicamente cada elemento de la interfaz con `document.createElement()`.
6. **Mapeo de Atributos y Eventos**:
   * Asignar valores a las propiedades (`textContent`, `classList.add()`, etc.).
   * Asignar listeners directamente dentro del bucle de creación (ej: el botón *Eliminar* que referencia a su elemento contenedor mediante `parentElement` y ejecuta `remove()`).
7. **Inserción**: Utilizar `.append()` o `.prepend()` para agregar los elementos al contenedor visible.
8. **Estadísticas**: Actualizar contadores totales llamando a una función resumen que cuente los elementos hijos con `children.length`.
### 3. Buenas Prácticas Requeridas para el Proyecto
1.  **Limpieza del Contenedor previa al Renderizado:** Siempre que se carguen o filtren datos, limpia el elemento padre llamando a `parent.replaceChildren()` antes de iterar e insertar nuevos elementos. Esto evita duplicación de tarjetas.
2.  **Mapeo Seguro de Eventos en Tarjetas Dinámicas:** Al crear tarjetas de productos, equipos o filas de tablas con botones de acción (ej. botón *"Eliminar"* o *"Editar"*), asigna el event listener directamente en la función que crea la tarjeta (como se vio en el `Taller-Dom-Avanzado`), usando `parentElement.remove()` o llamadas pasándole el objeto específico.
3.  **Actualización Automática de Resúmenes/Estadísticas:** Encapsula la lógica de contar o calcular totales en una función (ej. `actualizarResumen()`). Ejecuta esta función inmediatamente después de cualquier acción que altere los elementos en el DOM (como agregar o eliminar elementos).
4.  **Consistencia de Datos:** Utiliza `FormData` para capturar la información del usuario en formularios. Valida y formatea los datos (con `.trim()`, `.toUpperCase()`, y conversiones numéricas `Number()`) antes de insertarlos en tus estructuras de datos o enviarlos al DOM.
5.  **Depuración:** Utiliza `console.table(datos)` para depurar listas de objetos en consola de forma ágil, y maneja de manera explícita los errores con `try / catch` en todas las funciones que hagan llamadas asíncronas (`fetch`).

como es el proyecto esta aqui 
 Conciertos Conectados
Plataforma web para la gestión y venta de entradas de conciertos.

Este es el proyecto final del módulo de JavaScript. Consiste en desarrollar una aplicación web completa que permite a una empresa organizadora de conciertos administrar su catálogo de eventos y a los clientes comprar entradas de forma simulada.

📖 Descripción del Proyecto
Conciertos Conectados es una plataforma que conecta a la empresa organizadora con sus clientes a través de una interfaz web. El proyecto se divide en dos partes principales:

Panel de Administración: Permite al personal de la empresa gestionar toda la información: categorías, eventos y ventas.

Vista Pública: Permite a los clientes explorar los eventos, ver sus detalles, agregarlos a un carrito de compras y simular la compra de entradas.

Toda la información se guarda de forma persistente en el navegador del usuario utilizando localStorage, lo que significa que no se necesita una base de datos externa para que la aplicación funcione.

🚀 Funcionalidades Principales
Para el Administrador (admin@mail.com / 123456)
Inicio de Sesión: Acceso seguro al panel de control.

Dashboard: Vista general con acceso rápido a las diferentes secciones de gestión.

Gestión de Categorías: Crear, listar, editar y eliminar categorías para clasificar eventos (ej. Rock, Pop, Deportes).

Gestión de Eventos: Crear, listar, editar y eliminar eventos con detalles como: código, nombre, categoría, precio, fecha, hora, ciudad, imagen y descripción.

Registro de Ventas: Visualizar un historial completo de todas las compras realizadas por los clientes, ordenadas por fecha.

Para el Cliente (Vista Pública)
Exploración de Eventos: Visualizar todos los eventos disponibles en un formato de tarjetas atractivo.

Buscador y Filtros: Filtrar eventos por nombre, ciudad y categoría para encontrar fácilmente lo que buscas.

Detalle del Evento: Ver información ampliada de un evento específico.

Carrito de Compras: Agregar eventos al carrito, ver un resumen con el total y gestionar los items seleccionados.

Proceso de Compra: Simular la compra de entradas completando un formulario con datos personales (identificación, nombre, dirección, teléfono, email).

🛠️ Tecnologías Utilizadas
HTML5: Estructura semántica de las páginas web.

CSS3: Estilos y diseño responsive para una experiencia de usuario óptima en cualquier dispositivo.

JavaScript (Vanilla): Toda la lógica de la aplicación, incluyendo:

Manipulación del DOM.

Eventos y manejo de formularios.

Persistencia de datos con localStorage (JSON.stringify() / JSON.parse()).

Web Components: Creación de componentes reutilizables (ej. tarjeta de evento).

Git & GitHub: Control de versiones y entrega del proyecto.

💾 Estructura de Datos (localStorage)
La aplicación utiliza cinco claves principales en localStorage para almacenar la información:

categorias: Array de objetos { id, nombre, descripcion }.

eventos: Array de objetos { id, codigo, nombre, categoriaId, precio, fecha, hora, ciudad, imagen, descripcion }.

carrito: Array de objetos { id, nombre, precio, cantidad } (basado en eventos seleccionados).

ventas: Array de objetos { id, fecha, cliente: {...}, ciudad, items: [...], total }.

sesionAdmin: String o booleano para controlar el inicio de sesión del administrador.