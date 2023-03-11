import { BioPipe } from './bio.pipe';
import { bioScheme } from './dto/bio.dto';

describe('BioPipe', () => {
  it('should be defined', () => {
    expect(new BioPipe(bioScheme)).toBeDefined();
  });
});
