import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

ngOnInit(){
    this.signupForm = new FormGroup({
        'userData': new FormGroup({ 
          'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]), //validators  this.forbiddenNames/// will not be in same class when Angular checks so broke 
        'email': new FormControl(null, [Validators.required, Validators.email])
        }),        
        'gender': new FormControl('male'),
        'hobbies': new FormArray([])
    })
}

onSubmit(){
    console.log(this.signupForm);
}
  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }


  forbiddenNames(control: FormControl):{ [s:string]: boolean } {//creating new validator function    
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){   // if value not in array returns -1 which is interpreted as true 
      return { 'nameIsForbidden': true}; // only pass object if true 
    }
    return null; // form control valid 
  
  }

}
