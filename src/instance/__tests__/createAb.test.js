import { AbInstance } from '../AbInstance';
import { createAb } from '../..';

test('createAb should return instance of AbInstance', () => {
    const ab = createAb();
    expect(ab).toBeInstanceOf(AbInstance);
});
