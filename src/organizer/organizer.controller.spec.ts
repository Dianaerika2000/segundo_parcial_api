import { Test, TestingModule } from '@nestjs/testing';
import { OrganizerController } from './organizer.controller';
import { OrganizerService } from './organizer.service';

describe('OrganizerController', () => {
  let controller: OrganizerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizerController],
      providers: [OrganizerService],
    }).compile();

    controller = module.get<OrganizerController>(OrganizerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
