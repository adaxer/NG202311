import { ToUpperPipe } from './to-upper.pipe';

describe('ToUpperPipe', () => {

  let pipe: ToUpperPipe;

  beforeEach(() => {
    pipe = new ToUpperPipe();
  });
  [
    { parameter: "_Hello", result: "_HELLO" },
    { parameter: "worlD", result: "WORLD" },
    { parameter: "", result: ""}
  ].forEach((dataSet) => {
    it('should be ' + dataSet.result + ' when parameter is ' + dataSet.parameter, () => {
      expect(pipe.transform(dataSet.parameter)).toBe(dataSet.result);
    });
  });
});
