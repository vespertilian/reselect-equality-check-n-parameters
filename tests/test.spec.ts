import { Foo } from '../src/index';
describe('some test', () => {
    it('should be true', () => {
        const foo = new Foo();
        const result = foo.bar('cameron');
        expect(result).toBe('hello cameron');
    });

    it('should be true', () => {
        const foo = new Foo();
        const result = foo.bar('helena');
        expect(result).toBe('hello helena');
    })
});
