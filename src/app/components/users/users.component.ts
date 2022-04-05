import { UsersService } from './../../users.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/User';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  form: any;
  formTitle: string;
  varTest: string;
  users: User[];
  userName: string;
  userId: number;
  
  visibilityTable: boolean = true;
  visibilityForm: boolean = false;

  modalRef: BsModalRef;

  constructor(private usersService: UsersService, private modalService: BsModalService) { }

  ngOnInit(): void {

    this.usersService.GetAll().subscribe(result => { this.users = result; });

    this.formTitle = "New User";
    this.varTest = "Teste1";

  }


  ShowRegisterForm(): void {
    this.visibilityTable = false;
    this.visibilityForm = true;
    this.form = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
      phone:  new FormControl(null),
      //Address: new FormControl(null)
    });
  }

  ShowUpdateForm(userId: number): void {
    this.visibilityTable = false;
    this.visibilityForm = true;

    this.usersService.GetById(userId).subscribe(result => {
      
      this.formTitle = `Update ${result.name} ${result.email}`;
      
      this.form = new FormGroup({
        userId: new FormControl(result.userId),
        name: new FormControl(result.name),
        email: new FormControl(result.email),
        phone:  new FormControl(result.phone),
  
    
      });

    })
  }

  SendForm(): void {

    const user : User = this.form.value;

    if (user.userId > 0) {
      this.usersService.UpdateUser(user).subscribe(result => {
        this.visibilityForm = false;
        this.visibilityTable = true;
        alert('User updated successfully!')
        this.usersService.GetAll().subscribe(reg => {
          this.users = reg;
        });
      });

    } else {

      this.usersService.SaveUser(user).subscribe((result) => {
        this.visibilityForm = false;
        this.visibilityTable = true;
        alert('User saved successfully!')
        this.usersService.GetAll().subscribe(reg => {
          this.users = reg;
        });
      });
    }
  }

  Back(): void {
    this.visibilityTable = true;
    this.visibilityForm = false;
    }

  ShowDeleteConfirm(userId: number, userName: string, modalContent: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(modalContent);
    this.userId = userId;
    this.userName = userName;
  }

  DeleteUser(userId: number) {
    this.usersService.DeleteUser(userId).subscribe(result => {
      this.modalRef.hide();
      alert('User deleted successfully!');
      this.usersService.GetAll().subscribe(reg => {
        this.users = reg;
      });
    });
  }

}
