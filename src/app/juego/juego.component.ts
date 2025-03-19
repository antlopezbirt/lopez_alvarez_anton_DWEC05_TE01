import { Component, OnInit } from '@angular/core';
import { Configuracion } from '../modelos/Configuracion';

@Component({
  selector: 'app-juego',
  standalone: false,
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css'
})
export class JuegoComponent implements OnInit {

  public configuracion: Configuracion | null = null;

  public nombreJugador: string = "";
  public validacionNombreActiva: boolean = false;
  public nombreValido: boolean = false;

  public apellidoJugador: string = "";
  public validacionApellidoActiva: boolean = false;
  public apellidoValido: boolean = false;

  public rangoMaximo: any = "";
  public validacionRangoActiva: boolean = false;
  public rangoValido: boolean = false;

  public numIntentos: any = "";

  public botonActivo: boolean = false;

  public numeroAleatorio: number = 0;

  public entradaIntento: any = "";
  public sumaIntentos: number = 0;

  public resultado: string = "";
  public juegoTerminado: boolean = false;
  

  constructor() {}

  ngOnInit(): void {
    
  }

  // -------------------------- VALIDACIONES ----------------------------------

  // Antes de que el usuario interactúe con los inputs, las validaciones están desactivadas
  activarValidacionNombre(): void {
    this.validacionNombreActiva = true;
  }

  validarNombre(): boolean {
    this.nombreValido = this.nombreJugador == "" ? false : true;
    this.validarBoton();
    return this.nombreValido;
  }

  activarValidacionApellido(): void {
    this.validacionApellidoActiva = true;
  }

  validarApellido(): boolean {
    this.apellidoValido = this.apellidoJugador == "" ? false : true;
    this.validarBoton();
    return this.apellidoValido;
  }

  activarValidacionRango(): void {
    this.validacionRangoActiva = true;
  }

  validarRango(): string {
    this.rangoValido = false;
    // Primero chequea si se ha introducio un numero
    if (isNaN(+this.rangoMaximo)) return "tipo";
    // Ahora chequea si cumple con el rango mínimo
    else if (this.rangoMaximo < 4) return "inferior";
    // Cumple con ambos requisitos
    else {
      this.rangoValido = true;
      this.validarBoton();
      return "valido";
    }
  }

  validarBoton(): boolean {
    return (this.nombreValido && this.apellidoValido && this.rangoValido);
  }

  //------------------------ PROCESAMIENTO DE DATOS -------------------------

  // Instancia un objeto Configuracion con los datos recogidos y ordena calcular el número aleatorio
  recogerDatos(): void {
    this.configuracion = new Configuracion(
      this.nombreJugador, this.apellidoJugador, this.rangoMaximo, this.numIntentos
    )
    console.log('Datos recogidos:');
    console.log(this.configuracion);

    this.calcularAleatorio();
  }

  // Calcula el n.º aleatorio
  calcularAleatorio(): void {
    if (this.configuracion != null) {
      this.numeroAleatorio = Math.floor(Math.random() * this.configuracion.rangoMaximo);
      console.log('Numero aleatorio: ', this.numeroAleatorio);
    } else {
      console.log('No se pudo calcular el número aleatorio. Aún no existe el objeto de Configuracion.')
    }
    
  }


  // -------------------- DINAMICA DEL JUEGO ------------------------------

  /*
    Aprovechando el formato de mensajes coloreados, se ha utilizado la técnica
    de los vídeos de teoría: devolver strings con nombres de colores HTML para
    aprovecharlos en la vista, tanto en los cases del switch como en el atributo
    de estilo con [ngstyle].
  */
  procesarIntento(): void {
    console.log('Intento: ', this.entradaIntento);
    // Si no es un número saca un mensaje de error anaranjado
    if (isNaN(+this.entradaIntento) || this.entradaIntento == "") this.resultado = "orange";
    else {
      // Si acierta se termina el juego
      if (this.entradaIntento == this.numeroAleatorio) {
        this.resultado = "green";
        this.juegoTerminado = true;
      } else {
        // Cuenta los intentos gastados
        this.sumaIntentos++;
        if(this.configuracion != null && this.sumaIntentos >= this.configuracion.numIntentos) this.juegoTerminado = true;
        if(this.entradaIntento > this.numeroAleatorio) this.resultado = "black";
        else if(this.entradaIntento == (this.numeroAleatorio - 1)) this.resultado = "red";
        else if(this.entradaIntento == (this.numeroAleatorio - 2)) this.resultado = "gold";
        else if(this.entradaIntento < (this.numeroAleatorio - 2)) this.resultado = "blue";
      }
    }
  }

}
