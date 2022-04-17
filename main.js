class Persona {
	constructor(nombre, prestamo, motivo, cuotas) {
		this.nombre = nombre;
		this.prestamo = parseFloat(prestamo);
		this.motivo = motivo;
		this.cuotas = parseFloat(cuotas);
	}

	interesTotal() {
		return Math.round(this.prestamo * 1.3);
	}
	montoCuotas() {
		return Math.round(this.interesTotal() / this.cuotas);
	}
}


class DatosPersona {
	constructor(obj) {
		this.nombre = obj.nombre;
		this.prestamo = parseFloat(obj.prestamo);
		this.motivo = obj.motivo;
		this.cuotas = parseFloat(obj.cuotas);
	}


	interesTotal() {
		return Math.round(this.prestamo * 1.3);
	}
	montoCuotas() {
		return Math.round(this.interesTotal() / this.cuotas);
	}
}


let btnRegistro = document.querySelector("#registro");
btnRegistro.addEventListener("click", () => obtenerInput());

let btnVisualizar = document.querySelector("#visualizar");
btnVisualizar.addEventListener("click", () => recorrerDatos());



let arrayPersonas = [];


let datosRecuperados = JSON.parse(localStorage.getItem("listaClientes"));

if (datosRecuperados) {
	for (const persona of datosRecuperados) {
		arrayPersonas.push(new DatosPersona(persona));
	}
}

const guardarLocal = (clave, valor) => {
	localStorage.setItem(clave, valor);
};

const obtenerInput = () => {
	let nombreCliente = document.querySelector("#valorNombre").value;
	let prestamoTotal = document.querySelector("#valorPrestamo").value;
	let motivoPrestamo = document.querySelector("#valorMotivo").value;
	let cantidadCuotas = document.querySelector("#valorCuotas").value;

	arrayPersonas.push(new Persona(nombreCliente, prestamoTotal, motivoPrestamo, cantidadCuotas));
	guardarLocal("listaClientes", JSON.stringify(arrayPersonas));

	//cumple la funcion de evitar un doble clic
	let timerInterval
	Swal.fire({
		title: 'Guardando datos',
		html: 'Solo tomará un momento...',
		timer: 1000,
		timerProgressBar: true,
		didOpen: () => {
			Swal.showLoading()
			const b = Swal.getHtmlContainer().querySelector('b')
			timerInterval = setInterval(() => {
				b.textContent = Swal.getTimerLeft()
			}, 100)
		},
		willClose: () => {
			clearInterval(timerInterval)
		}
	}).then((result) => {
		if (result.dismiss === Swal.DismissReason.timer) {
			console.log('Funciono bien jeje')
		}
	})

};

function recorrerDatos() {
	let container = document.querySelector("#cajaResultados");
	container.innerHTML = "";
	for (const persona of arrayPersonas) {
		container = document.createElement("div");
		container.innerHTML = `        
    <div class="card text-white bg-dark mb-3" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">Nombre: ${persona.nombre}</h5>
        <p class="card-text">Motivo: ${persona.motivo}</p>
        <p class="card-text">Prestamo: ${persona.prestamo}</p>
        <p class="card-text">C/Interes: ${persona.interesTotal()}</p>
        <p class="card-text">Cantidad Cuotas: ${persona.cuotas}</p>
        <p class="card-text">Cuotas: ${persona.montoCuotas()}</p>
    </div>`;

		document.querySelector("#cajaResultados").appendChild(container);
	}
}
