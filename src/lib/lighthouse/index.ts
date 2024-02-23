import * as chromeLauncher from 'chrome-launcher';
import lighthouse from "lighthouse";
import {OutputMode} from "lighthouse/types/lhr/settings";
import {z} from 'zod';

import config from './custom-config';
import {allDefined, validate} from '../../util/validations';

import {ModelPluginInterface} from '../../interfaces';
import {ModelParams} from '../../types';
import {buildErrorMessage} from "../../util/helpers";

export class LighthouseModel implements ModelPluginInterface {
  errorBuilder = buildErrorMessage(this.constructor.name);

  /**
   * Configures the lighthouse model.
   */
  public async configure(): Promise<ModelPluginInterface> {
    return this;
  }

  /**
   * Executes the lighthouse analysis for list of input parameters.
   */
  public async execute(inputs: ModelParams[]): Promise<ModelParams[]> {
    return await Promise.all(
      inputs.map(async input => {
        const validInput = Object.assign(input, this.validateInput(input));
        const lighthouseResult = await this.runLighthouse(validInput.url);

        input['page-weight'] =
          lighthouseResult?.lhr.audits['total-byte-weight'].numericValue;
        input['lighthouse-report'] = lighthouseResult?.report;
        return input;
      })
    );
  }

  /**
   * Validates the input parameters of the lighthouse model.
   */
  private validateInput(input: ModelParams) {
    const schema = z
      .object({
        url: z.string(),
      })
      .refine(allDefined, {message: '`url` must be provided.'});

    return validate<z.infer<typeof schema>>(schema, input);
  }

  /**
   * Run lighthouse for url with chrome in headless mode.
   */
  private async runLighthouse(url: string) {
    const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
    try {
      try {
        const options = {port: chrome.port, output: 'json' as OutputMode};
        return await lighthouse(url, options, config);
      } finally {
        await chrome.kill();
      }
    } catch (error) {
      throw new Error(this.errorBuilder({message: `Error while running Lighthouse: ${error}`, scope: 'execute'}));
    }
  }
}
