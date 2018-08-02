import {Component, OnInit} from '@angular/core';

import {PatientService} from './services/patient.service';
import {DentistService} from './services/dentist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dentalstudio';

  constructor(private patientService: PatientService,
              private dentistService: DentistService) {
  }

  ngOnInit() {
    // this.dentistService.clear()
    //   .then((reponse) => {
    //     this.dentistService.addCollection(this.patientService.mockPatients.concat(this.dentistService.mockDentists))
    //       .then((items) => {
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    this.dentistService.addCollection(this.patientService.mockPatients.concat(this.dentistService.mockDentists))
      .then((items) => {
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
