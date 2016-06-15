import { Component, OnInit, OnDestroy } from '@angular/core';
import { MultiSelectComponent } from './select/multi-select.component';
import { TagService } from "./tag/tag.service";
import { Subscription } from "rxjs/Subscription";
import * as Immutable from 'immutable';
import * as _ from 'lodash';

@Component({
    selector: 'my-app',
    directives: [MultiSelectComponent],
    providers: [TagService],
    template: `
    <div class="container">
        <h1>Multi Select Component by AngularJS 2</h1>
        <form class="form-horizontal">
        <div class="form-group">
            <label class="col-sm-2 control-label">Tag</label>
            <div class="col-sm-4">
                <yk-multi-select
                        [items]="tags"
                        [selectedItems]="selectedTags"
                        (onSelectItem)="onSelectTag($event)"
                        (onDeselectItem)="onDeselectTag($event)"
                        (onAddItem)="onAddTag($event)">
                </yk-multi-select>
            </div>
        </div>
        </form>
    </div>
`
})
export class AppComponent implements OnInit, OnDestroy {

    private getTagsSubscription: Subscription;

    tags: Immutable.List<string> = Immutable.fromJS([]);
    selectedTags: Immutable.List<string> = Immutable.fromJS([]);

    constructor( private tagService: TagService ) {
    }

    ngOnInit() {
        this.getTagsSubscription = this.tagService.getTags()
            .subscribe(
                data => {
                    this.tags = Immutable.fromJS(_.map(data, 'title'));
                    this.selectedTags = Immutable.fromJS(['AngularJS']);
                }
            );
    }

    ngOnDestroy() {
        this.getTagsSubscription.unsubscribe();
    }

    onSelectTag( tag: string ) {
        let index = this.selectedTags.indexOf(tag);
        if (index === -1) {
            this.selectedTags = this.selectedTags.push(tag);
        }
    }

    onDeselectTag( tag: string ) {
        let index = this.selectedTags.indexOf(tag);
        if (index > -1) {
            this.selectedTags = this.selectedTags.remove(index);
        }
    }

    onAddTag( tag: string ) {
        let indexOnTags = this.tags.indexOf(tag);
        if (indexOnTags === -1) {
            this.tags = this.tags.push(tag);
            this.onSelectTag(tag);
        } else {
            this.onSelectTag(tag);
        }
    }
}
