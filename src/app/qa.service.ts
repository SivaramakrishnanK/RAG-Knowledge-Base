import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class QaService {
    constructor(private http: HttpClient) {}

    ask(question: string): Promise<any> {
        return this.http.post('http://localhost:3001/api/ask', { question }).toPromise();
    }
}
