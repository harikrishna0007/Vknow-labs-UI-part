import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
studentForm;
  constructor(public http:HttpClient,public router:Router) {
    
   }

  ngOnInit() {
    this.studentForm = new FormGroup({
      'name': new FormControl(),
      'rolenumber': new FormControl(),
      'subject1': new FormControl(),
      'subject2': new FormControl(),
      'mark1': new FormControl(),
      'mark2': new FormControl(),
    });
  }

  postForm(){
    console.log(this.studentForm.value);
    this.http.post('http://localhost:3000/posts',this.studentForm.value)
    .toPromise()
    .then((res)=>{
      this.router.navigate([""]);
    },(err)=>{
      console.log(err);
    });
  };
}
