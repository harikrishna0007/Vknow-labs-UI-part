import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  studentForm;
  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient, public router: Router) {
    this.studentForm = new FormGroup({
      'name': new FormControl(),
      'rolenumber': new FormControl(),
      'subject1': new FormControl(),
      'subject2': new FormControl(),
      'mark1': new FormControl(),
      'mark2': new FormControl(),
    });
   }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.paramMap.get("id"));

    this.http.get(`http://localhost:3000/posts/${this.activatedRoute.snapshot.paramMap.get("id")}`)
    .toPromise()
    .then((res:any)=>{
      this.studentForm.setValue({
        'name': res.name,
      'rolenumber': res.rolenumber,
      'subject1': res.subject1,
      'subject2': res.subject2,
      'mark1': res.mark1,
      'mark2': res.mark2
      })
    }, (err) => {
        console.log("error");
    })
  }


  postForm(){
    this.http.patch(`http://localhost:3000/posts/${this.activatedRoute.snapshot.paramMap.get("id")}`,
    this.studentForm.value)
    .toPromise()
    .then((res)=>{
      this.router.navigate([""]);
    },(err)=>{
      console.log(err);
    });
  };
}
