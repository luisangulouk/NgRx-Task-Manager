import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Status'
})

export class taskStatusPipe implements PipeTransform{
    transform(status: any) {
        switch(typeof status){
            case 'boolean': return status ? 'Done' : 'Active';
            case 'string': return 'Done';
            default: return status;
        }
    }
}