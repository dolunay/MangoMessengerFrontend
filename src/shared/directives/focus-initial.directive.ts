import type { OnInit } from '@angular/core';
import { Directive, ElementRef, RendererFactory2, inject } from '@angular/core';

@Directive({
	selector: 'button[focusInitial], a[focusInitial]',
	standalone: true,
})
export class FocusInitialDirective implements OnInit {
	private elRef = inject(ElementRef);
	private rendererFactory = inject(RendererFactory2);

	ngOnInit() {
		const render = this.rendererFactory.createRenderer(this.elRef.nativeElement, null);
		render.setStyle(this.elRef.nativeElement, 'border', '3px solid white');
	}
}
