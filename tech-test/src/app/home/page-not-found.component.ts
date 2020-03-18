import { Component } from '@angular/core';

@Component({
    template: `
    <nav-bar></nav-bar>
    <div class="container" style="margin: 20px 0;">
        <div class="card">
            <div class="card-header">
                404
            </div>
            <div class="card-body">
                <div class="row justify-content-center">
                    <div class="col-12">
                        <h4 class="text-center">Seems like you might be lost!</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})
export class PageNotFoundComponent { }
