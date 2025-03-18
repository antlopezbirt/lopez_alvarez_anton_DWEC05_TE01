import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-juego',
  standalone: false,
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css'
})
export class JuegoComponent implements OnInit {

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
  }
}
