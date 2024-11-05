import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { UserProfileService } from '../../../services/user-profile.service';
import { UserService } from '../../../../../services/user.service';
import { Empresa } from '../../../interfaces/profile';
import { MatDialog } from '@angular/material/dialog';
import { VerificacionComponent } from '../../layout/verificacion/verificacion.component';
import { OptionService } from '../../../services/api-rubros.service';

@Component({
  selector: 'app-datos-empresa',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './datos-empresa.component.html',
  styleUrls: ['./datos-empresa.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatosEmpresaComponent implements OnInit {
  empresaForm: FormGroup;
  editar: boolean = false;
  readonly dialog = inject(MatDialog);
  originalData: Partial<Empresa> | null = null;
  rubros: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dataUser: UserProfileService,
    private user: UserService,
    private optionService: OptionService
  ) {
    this.empresaForm = this.fb.group({
      rut: [{ value: '', disabled: true }, Validators.required],
      giro: [{ value: '', disabled: true }, Validators.required],
      direccion: [{ value: '', disabled: true }, Validators.required],
      comuna: [{ value: '', disabled: true }, Validators.required],
      correo: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      telefono: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      nombreEmpresa: [{ value: '', disabled: true }, Validators.required],
      rubro: [{ value: '', disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargaRubros();
  }

  cargaRubros(): void {
    this.optionService.getRubros().subscribe(
      (data: any[]) => {
        this.rubros = data;
        this.getCompanyData(this.user.getIdUser()); // Llama a getCompanyData después de cargar rubros
      },
      (error) => {
        console.error('Error al cargar las opciones de rubros', error);
      }
    );
  }

  onSubmit(): void {
    if (this.empresaForm.valid) {
      const empresaData = this.empresaForm.value;
      console.log('Datos de la empresa:', empresaData);
  
      this.dataUser.putProfileCompany(this.user.getIdUser(), empresaData).subscribe(
        (response) => {
          console.log('Perfil de empresa actualizado correctamente:', response);
          this.setEditMode(true);
          this.reloadComponent();
        },
        (error) => {
          console.error('Error al actualizar el perfil de la empresa:', error);
        }
      );
    }
  }

  getCompanyData(idUser: string | null) {
    if (!idUser) {
      console.error('ID de usuario inválido');
      return;
    }

    this.dataUser.getProfileCompany(idUser).subscribe(
      (data: Empresa | null) => {
        if (data) {
          this.originalData = { ...data };
          // Encuentra el rubro correcto por ID y configura el formulario
          const rubroId = this.rubros.find((rubro) => rubro.nombre === data.rubro)?.id || '';
          this.empresaForm.patchValue({
            rut: data.rut_empresa,
            giro: data.giro,
            direccion: data.direccion,
            comuna: data.comuna,
            correo: data.correo_contacto,
            telefono: data.telefono_empresa,
            nombreEmpresa: data.nombre_empresa,
            rubro: data.rubro?._id, // Asigna el id del rubro aquí
          });
        } else {
          console.error('No se encontraron datos de empresa');
        }
      },
      (error) => {
        console.error('Error al obtener los datos de la empresa:', error);
      }
    );
  }

  setEditMode(cancelar: boolean = false) {
    if (cancelar) {
      this.editar = false;
      this.empresaForm.disable();
      this.dataUser.updateVerification();

      if (this.originalData) {
        const rubroId = this.rubros.find((rubro) => rubro.nombre === this.originalData?.rubro)?.id || '';
        this.empresaForm.patchValue({
          rut: this.originalData.rut_empresa,
          giro: this.originalData.giro,
          direccion: this.originalData.direccion,
          comuna: this.originalData.comuna,
          correo: this.originalData.correo_contacto,
          telefono: this.originalData.telefono_empresa,
          nombreEmpresa: this.originalData.nombre_empresa,
          rubro: this.originalData.rubro?._id,
        });
      }
      return;
    }

    const dialogRef = this.dialog.open(VerificacionComponent, {
      width: '250px',
    });

    this.dataUser.verificacion$.subscribe((verificado) => {
      if (verificado) {
        this.editar = true;
        this.empresaForm.enable();
        dialogRef.close();
      } else {
        this.editar = false;
        this.empresaForm.disable();
      }
    });
  }
  reloadComponent() {
    this.getCompanyData(this.user.getIdUser());
  }
}
