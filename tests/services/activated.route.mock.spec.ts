import { ActivatedRouteMock } from '../../src/services/testing/activated.route.mock';

describe('ActivatedRouteMock', () => {
  it('constructor should set snaphot', () => {
    const mock = new ActivatedRouteMock();
    expect(mock.snapshot).not.toBeNull();
  });
});
