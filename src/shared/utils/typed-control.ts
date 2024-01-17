import type { AbstractControl, ValidationErrors } from '@angular/forms';

export type TypedControl<T> = {
	[key in keyof T]: (unknown | ((control: AbstractControl<unknown, unknown>) => ValidationErrors | null)[])[];
};
