import {Component, OnInit} from '@angular/core';

import {PatientService} from './services/patient.service';
import {DentistService} from './services/dentist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'dentalstudio';

  constructor(private patientService: PatientService,
              private dentistService: DentistService) {}

  ngOnInit() {
    // this.patientService.addCollection(this.patientService.mockPatients);
    // this.dentistService.addCollection(this.dentistService.mockDentists);
  }
}
