import {describe, expect, jest, test} from '@jest/globals';
import {LighthouseModel} from '../../../../lib';

describe('lib/lighthouse', () => {
  describe('LighthouseModel: ', () => {
    describe('init: ', () => {
      it('successfully initalized.', () => {
        const outputModel = new LighthouseModel();

        expect(outputModel).toHaveProperty('configure');
        expect(outputModel).toHaveProperty('execute');
      });
    });
    describe('configure(): ', () => {
      it('successfully returns model instance.', async () => {
        const outputModel = new LighthouseModel();
        await outputModel.configure();

        expect.assertions(1);

        expect(outputModel).toBeInstanceOf(LighthouseModel);
      });
    });
    describe('execute(): ', () => {
      // TODO Mock lighthouse and chrome and return minimal result
    });
  });
});
