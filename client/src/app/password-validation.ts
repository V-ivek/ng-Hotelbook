import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        const pass = AC.get('pass').value; // to get value in input tag
        const confirmPass = AC.get('confirmPass').value; // to get value in input tag
        if (pass !== confirmPass) {
            console.log('false');
            AC.get('confirmPass').setErrors({ MatchPassword: true });
        } else {
            console.log('true');
            return null;
        }
    }
}
