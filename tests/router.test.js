const router = require('../src/routes/routes')

test('test routes', () => {
    expect(router.get('getAll'));
});
