import { Component } from '@angular/core';
import { QaService } from '../qa.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-qa',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './qa.component.html',
    styleUrls: ['./qa.component.scss']
})
export class QaComponent {
    question = '';
    answer = '';

    constructor(private qaService: QaService) {}

    askQuestion() {
        if (!this.question) return;
        this.qaService.ask(this.question).then((res: any) => {
            this.answer = res.answer;
        });
    }

    onQuestionChange() {
        if (!this.question) {
            this.answer = '';
        }
    }
}
