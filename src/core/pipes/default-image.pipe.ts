import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
	name: 'defaultImage',
	standalone: true,
	pure: true,
})
export class DefaultImagePipe implements PipeTransform {
	transform(value: string, defaultImage: string): string {
		return value || defaultImage;
	}
}
