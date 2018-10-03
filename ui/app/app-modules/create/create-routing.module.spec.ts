import { CreateRoutingModule } from './create-routing.module';

describe('CreateRoutingModule', () => {
  let createRoutingModule: CreateRoutingModule;

  beforeEach(() => {
    createRoutingModule = new CreateRoutingModule();
  });

  it('should create an instance', () => {
    expect(createRoutingModule).toBeTruthy();
  });
});
