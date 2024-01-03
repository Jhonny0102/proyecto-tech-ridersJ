import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServicePrincipal } from 'src/app/services/service.principal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificarcontrasenya',
  templateUrl: './modificarcontrasenya.component.html',
  styleUrls: ['./modificarcontrasenya.component.css'],
})
export class ModificarcontrasenyaComponent implements OnInit {
  public modal!: string;

  @ViewChild('controlantigua') controlAntigua!: ElementRef;
  @ViewChild('controlnueva') controlNueva!: ElementRef;
  @ViewChild('controlrepetir') controlRepetir!: ElementRef;

  constructor(private _service: ServicePrincipal, private _router: Router) {}

  ngOnInit(): void {
    if (!localStorage.getItem('token')) this._router.navigate(['/login']);
  }

  updatePassword(): void {
    let antigua = this.controlAntigua.nativeElement.value;
    let nueva = this.controlNueva.nativeElement.value;
    let repetir = this.controlRepetir.nativeElement.value;
    this._service.getPerfilUsuario().subscribe((response) => {
      if (response.password != antigua) {
        Swal.fire({
          color: '#333333',
          confirmButtonColor: '#212529',
          confirmButtonText: 'Cerrar',
          icon: 'error',
          text: 'Contraseña antigua errónea',
          title: 'Error',
        });
      } else if (nueva != repetir) {
        Swal.fire({
          color: '#333333',
          confirmButtonColor: '#212529',
          confirmButtonText: 'Cerrar',
          icon: 'error',
          text: 'Las dos contraseñas nuevas no son iguales',
          title: 'Error',
        });
      } else if (response.password == nueva) {
        Swal.fire({
          color: '#333333',
          confirmButtonColor: '#212529',
          confirmButtonText: 'Cerrar',
          icon: 'error',
          text: 'La contraseña nueva es igual a la antigua',
          title: 'Error',
        });
      } else {
        this._service
          .updatePasswordUsuario(response.idUsuario, nueva)
          .subscribe((response) => {
            this._router.navigate(['/usuario/perfil']);
          });
      }
    });
  }
}
