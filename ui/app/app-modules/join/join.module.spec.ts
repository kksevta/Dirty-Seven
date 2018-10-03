import { JoinModule } from './join.module';

describe('JoinModule', () => {
  let joinModule: JoinModule;

  beforeEach(() => {
    joinModule = new JoinModule();
  });

  it('should create an instance', () => {
    expect(joinModule).toBeTruthy();
  });
});
