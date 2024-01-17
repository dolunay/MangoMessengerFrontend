import { DefaultImagePipe } from './default-image.pipe';

describe('defaultImagePipe', () => {
	it('create an instance', () => {
		const pipe = new DefaultImagePipe();
		expect(pipe).toBeTruthy();
	});
});
