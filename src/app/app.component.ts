import {Component, OnInit} from '@angular/core';

import {ApiService} from './services/api.service';
import {User} from './models/user.model';
import {UsersService} from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dentalstudio';

  constructor(private apiService: ApiService,
              private usersService: UsersService) {
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
    this.apiService.getMockUsers().subscribe((users: User[]) => {
      this.usersService.addCollection(users)
        .then((item) => {})
        .catch((error) => {
          console.log(error);
        });
    });
  }
}
