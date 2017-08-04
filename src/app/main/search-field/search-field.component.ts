import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
    selector: 'search-field',
    templateUrl: 'search-field.component.html',
    styleUrls: ['search-field.component.css']
})
export class SearchField implements OnInit {

    queryObject: any = {
        q: '',
        technology: '',
        page: 0
    };
    technologies = ['', 'Kemper', 'Axe Fx II XL+', 'AX8', 'Helix'];

    constructor(
        private router: Router
    ) {}

    ngOnInit(): void {}

    onSubmit(q: string) {
        this.queryObject.q = q;
        this.queryObject.page = 1;
        this.router.navigate(['/presets'], { queryParams: this.queryObject });
    }
}
