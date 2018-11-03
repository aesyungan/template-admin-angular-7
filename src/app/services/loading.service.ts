import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    constructor() { }
    loading = new Subject<boolean>();
    open() {
        this.loading.next(true);//close loading 
    }
    close() {
        this.loading.next(false);//close loading 
    }
}