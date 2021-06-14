import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomColor',
})
export class RandomColorPipe implements PipeTransform {
  transform(): string {
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
    }

    return color;
  }
}
