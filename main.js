class Personas {
  constructor(nombre, prestamo, motivo, cuotas) {
    this.nombre = nombre;
    this.prestamo = parseFloat(prestamo);
    this.motivo = motivo;
    this.cuotas = parseFloat(cuotas);
  }

  interesTotal() {
    return Math.round(this.prestamo * 1.3)
  }
  montoCuotas() {
    return Math.round(this.interesTotal() / this.cuotas)
  }
}

// Constructor de objetos con datos del JSON recuperados
class datosPersona {
  constructor(obj) {
      this.nombre  = obj.nombre;
      this.prestamo  = parseFloat(obj.prestamo);
      this.motivo  = obj.motivo;
      this.cuotas  = parseFloat(obj.cuotas);
  }

  //arreglar esto porque no funciona
  interesTotal() {
    return Math.round(this.prestamo * 1.3)
  }
  montoCuotas() {
    return Math.round(this.interesTotal() / this.cuotas)
  }
}


let arrayPersonas = [];

const guardarLocal = (clave, valor) => {
  localStorage.setItem(clave, valor)
};

const datosGuardados = JSON.parse(localStorage.getItem("listaClientes"));
let datosRecuperados = [];



const obtenerInput = () => {

  let nombreCliente = document.querySelector("#valorNombre").value;
  let prestamoTotal = document.querySelector("#valorPrestamo").value;
  let motivoPrestamo = document.querySelector("#valorMotivo").value;
  let cantidadCuotas = document.querySelector("#valorCuotas").value;
  arrayPersonas.push(new Personas(nombreCliente, prestamoTotal, motivoPrestamo, cantidadCuotas));
  guardarLocal("listaClientes", JSON.stringify(arrayPersonas));
  for (const objeto of datosGuardados){
    datosRecuperados.push(new datosPersona(objeto));
  }

}

const recorrerDatos = () => {

  let container = document.querySelector("#cajaResultados");
  container.innerHTML = "";

  for(const personas of datosRecuperados){
    container = document.createElement("div");
    container.innerHTML = `        
    <div class="card text-white bg-dark mb-3" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">Nombre: ${personas.nombre}</h5>
        <p class="card-text">Motivo: ${personas.motivo}</p>
        <p class="card-text">Prestamo: ${personas.prestamo}</p>
        <p class="card-text">C/Interes: ${personas.interesTotal()}</p>
        <p class="card-text">Cantidad Cuotas: ${personas.cuotas}</p>
        <p class="card-text">Cuotas: ${personas.montoCuotas()}</p>
    </div>`
    document.querySelector("#cajaResultados").appendChild(container);
  }
}
