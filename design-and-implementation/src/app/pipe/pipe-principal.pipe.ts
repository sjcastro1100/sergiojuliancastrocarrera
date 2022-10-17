import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipePrincipal'
})
export class PipePrincipalPipe implements PipeTransform {

  transform(value: string, ...args: any): any {
    if(args == 'text'){
      if(value.length > 10)
        return  value.substring(0,10)+'...'
      
    } 
    return value
  }

}
