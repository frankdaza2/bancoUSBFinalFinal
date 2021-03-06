import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-consignar',
  templateUrl: './consignar.component.html',
  styleUrls: ['./consignar.component.css']
})
export class ConsignarComponent implements OnInit {

  txtNumeroCuenta: string;
  txtValor: Number;
  txtCedula: Number;
  txtMensajeError: string;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { 
    if (usuarioService.loginSesion == null) {
      this.router.navigate(['/login']);
    } else {
      this.txtNumeroCuenta = "";
      this.txtValor = 0;
      this.txtMensajeError = "";
    }    
  }

  ngOnInit() {
  }

  consignar(): void {
    if (this.txtNumeroCuenta != "") {
      if (this.txtValor > 0) {
        if (this.txtCedula != null || this.txtCedula > 1000) {
          this.usuarioService.setConsignar(this.txtNumeroCuenta, this.txtValor, this.txtCedula)
          .subscribe(response => {
            this.txtMensajeError = response.mensajeError;
            if (response.codigoError == 0) {          
              console.log(this.txtMensajeError);
            } else {
              console.log(this.txtMensajeError);
            }
          });
        } else {
          this.txtMensajeError = "Ingrese un número de cédula válido";  
        }        
      } else {
        this.txtMensajeError = "Ingrese un número mayor que cero";  
      }  
    } else {
      this.txtMensajeError = "Ingrese un número de cuenta";
    }      
  }

  homepage(): void {
    this.router.navigate(['/dashboard']);
  }

}
