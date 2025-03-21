import { Component, OnInit } from '@angular/core';
import { Configuracion } from '../models/Configuracion';

@Component({
  selector: 'app-juego',
  standalone: false,
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css'
})
export class JuegoComponent implements OnInit {

  public configuracion: Configuracion | null = null;

  public nombre: string = "";
  public nombreValido: boolean = false;
  public mensajeValidacionNombre: string = "";

  public apellido: string = "";
  public apellidoValido: boolean = false;
  public mensajeValidacionApellido: string = "";

  // Se declaran los atributos numéricos como any para evitar mostrar un cero inicial en el formulario
  public rango: any = "";
  public rangoValido: boolean = false;
  public mensajeValidacionRango: string = "";

  public intentos: any = "";

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

  validarNombre(): void {
    if(this.nombre == "") {
      this.nombreValido = false;
      this.mensajeValidacionNombre = "El nombre no puede estar vacío";
    }
    else {
      this.nombreValido = true;
      this.mensajeValidacionNombre = "";
    }

    // Chequea la validación del botón de recoger datos
    this.validarBoton();
  }

  validarApellido(): void {
    
    if(this.apellido == "") {
      this.apellidoValido = false;
      this.mensajeValidacionApellido = "El apellido no puede estar vacío";
    }
    else {
      this.apellidoValido = true;
      this.mensajeValidacionApellido = "";
    }

    // Chequea la validación del botón de recoger datos
    this.validarBoton();
  }

  validarRango(): void {
    // Primero chequea si se ha introducido algo
    if (this.rango == "") {
      this.rangoValido = false;
      this.mensajeValidacionRango = "El rango no puede estar vacío"
    }
    // Ahora si lo que se ha introducido es un numero
    else if (isNaN(+this.rango)) {
      this.rangoValido = false;
      this.mensajeValidacionRango = "El valor introducido no es un número";
    }
    // Ahora chequea si cumple con el rango mínimo
    else if (this.rango < 4) {
      this.rangoValido = false;
      this.mensajeValidacionRango = "El número introducido es menor que el rango mínimo";
    }
    // Cumple con todos los requisitos
    else {
      this.rangoValido = true;
      this.mensajeValidacionRango = "";
    }

    // Chequea la validación del botón de recoger datos
    this.validarBoton();
  }

  validarBoton(): boolean {
    return (this.nombreValido && this.apellidoValido && this.rangoValido);
  }

  //------------------------ PROCESAMIENTO DE DATOS -------------------------

  // Instancia un objeto Configuracion con los datos recogidos y ordena calcular el número aleatorio
  recogerDatos(): void {
    this.configuracion = new Configuracion(
      this.nombre, this.apellido, this.rango, this.intentos
    )
    console.log('Datos recogidos:');
    console.log(this.configuracion);

    this.calcularAleatorio();
  }

  // Calcula el n.º aleatorio
  calcularAleatorio(): void {
    if (this.configuracion != null) {
      this.numeroAleatorio = Math.floor(Math.random() * this.configuracion.rango);
      console.log('Numero aleatorio: ', this.numeroAleatorio);
    } else {
      console.log('No se pudo calcular el número aleatorio. Aún no existe el objeto de Configuracion.')
    }
  }


  // -------------------- DINAMICA DEL JUEGO ------------------------------

  /*
    Aprovechando el requisito de respuestas coloreadas, se ha utilizado la idea
    de los vídeos de teoría: devolver strings con nombres de colores HTML para
    aprovecharlos en la vista, tanto en los cases del switch como en el atributo
    de estilo con [ngstyle].
  */
  procesarIntento(): void {
    console.log('Intento recibido: ', this.entradaIntento);
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
        console.log('Intentos realizados: ', this.sumaIntentos);
        if(this.configuracion != null && this.sumaIntentos >= this.configuracion.intentos) this.juegoTerminado = true;
        if(this.entradaIntento > this.numeroAleatorio) this.resultado = "black";
        else if(this.entradaIntento == (this.numeroAleatorio - 1)) this.resultado = "red";
        else if(this.entradaIntento == (this.numeroAleatorio - 2)) this.resultado = "gold";
        else if(this.entradaIntento < (this.numeroAleatorio - 2)) this.resultado = "blue";
      }
    }
  }

}
