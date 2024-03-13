






import jest from 'jest';

const pg = jest.createMockFromModule('pg');

// Mock implementation of Pool
class Pool {
  constructor() {
    this.connect = jest.fn().mockImplementation((callback) => {
      callback(null, {
        query: jest.fn().mockResolvedValue({ rows: [] }),
        release: jest.fn(),
      });
    });
  }
}

pg.Pool = Pool;

module.exports = pg;
