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

  public rangoMaximo: number = 0;
  public validacionRangoActiva: boolean = false;
  public rangoValido: boolean = false;

  public numIntentos: number = 0;

  public botonActivo: boolean = false;

  public numeroAleatorio: number = 0;

  public entradaIntento: number = 0;
  public sumaIntentos: number = 0;

  public resultado: string = "";

  constructor() {}

  ngOnInit(): void {
    
  }

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

  recogerDatos(): void {
    console.log('Datos recogidos');
    this.configuracion = new Configuracion(
      this.nombreJugador, this.apellidoJugador, this.rangoMaximo, this.numIntentos
    )

    this.numeroAleatorio = Math.floor(Math.random() * this.rangoMaximo);
    console.log('Numero aleatorio: ', this.numeroAleatorio);
  }

  procesarIntento(): void {
    if(this.entradaIntento > this.numeroAleatorio) this.resultado = "black";
    else if(this.entradaIntento == (this.numeroAleatorio - 1)) this.resultado = "red";
    else if(this.entradaIntento == (this.numeroAleatorio - 2)) this.resultado = "gold";
    else if(this.entradaIntento < (this.numeroAleatorio - 2)) this.resultado = "blue";
    else this.resultado = "green";
  }
}
