/**
 * tag.service
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Tag } from './tag.model';

@Injectable()
export class TagService {
    constructor( private  http: Http ) {
    }

    getTags(): Observable<Tag[]> {
        return this.http.get('app/tags.json')
            .map(( res: Response ) => res.json());
    }
}
