# Lighthouse

> [!NOTE] > `Lighthouse` ([GoogleChrome/lighthouse](https://github.com/GoogleChrome/lighthouse)) is a community model, not part of the IF standard library. This means the IF core team are not closely monitoring these models to keep them up to date. You should do your own research before implementing them!

# Parameters

## model config

- ``:

## observations

- `url`: the url of the web app or web page that is analyzed with lighthouse

## Returns

- `page-weight`: total weight of web app or web page in bytes

# IF Implementation

IF utilizes the CO2JS Framework to calculate the carbon emissions of a website. The CO2JS Framework is a collection of models that calculate the carbon emissions of a website based on different parameters. IF installs the CO2js npm package from `@tgwf/co2js` and invokes its functions from a model plugin.

The CO2JS Framework is a community model, not part of the IF standard library. This means the IF core team are not closely monitoring these models to keep them up to date. You should do your own research before implementing them!

## Usage

In IEF the model is called from an `impl`. An `impl` is a `.yaml` file that contains configuration metadata and usage inputs. This is interpreted by the command line tool, `impact-engine`. There, the model's `configure` method is called first.

The model config should define a `type` supported by the CO2.JS library (either `swd` or `1byte`). These are different ways to calculate the operational carbon associated with a web application; `swd` is shorthand for 'sustainable web design' model and `1byte` refers to the OneByte mdoel. You can read about the details of these models and how they differ at the [Green Web Foundation website](https://developers.thegreenwebfoundation.org/co2js/explainer/methodologies-for-calculating-website-carbon/).

Each input is expected to contain `bytes`, `green-web-host`, `duration` and `timestamp` fields.

## IMPL

The following is an example of how CO2.JS can be invoked using an `impl`.

```yaml
name: co2js-demo
description: example impl invoking CO2.JS model
tags:
initialize:
  models:
    - name: co2js
      model: Co2jsModel
      path: '@grnsft/if-unofficial-models'
graph:
  children:
    child:
      pipeline:
        - co2js
      config:
        co2js:
          type: swd
      inputs:
        - timestamp: 2023-07-06T00:00 # [KEYWORD] [NO-SUBFIELDS] time when measurement occurred
          duration: 1
          bytes: 1000000
          green-web-host: true
          options:
            dataReloadRatio: 0.6,
            firstVisitPercentage: 0.9,
            returnVisitPercentage: 0.1,
            gridIntensity:
              device: 560.98
              dataCenter:
                country: 'TWN'
```

This impl is run using `impact-engine` using the following command, run from the project root:

```sh
npm i -g @grnsft/if
npm i -g @grnsft/if-unofficial-models
impact-engine --impl ./examples/impls/test/co2js.yml --ompl ./examples/ompls/co2js.yml
```

This yields a result that looks like the following (saved to `/ompls/co2js.yml`):

```yaml
name: co2js-demo
description: example impl invoking CO2.JS model
tags:
initialize:
  models:
    - name: co2js
      model: Co2jsModel
      path: '@grnsft/if-unofficial-models'
graph:
  children:
    child:
      pipeline:
        - co2js
      config:
        co2js:
          type: swd
      inputs:
        - timestamp: 2023-07-06T00:00
          duration: 1
          bytes: 1000000
          green-web-host: true
      outputs:
        - timestamp: 2023-07-06T00:00
          operational-carbon: 0.03
          duration: 1
          bytes: 1000000
          green-web-host: true
          options:
            dataReloadRatio: 0.6,
            firstVisitPercentage: 0.9,
            returnVisitPercentage: 0.1,
            gridIntensity:
              device: 560.98
              dataCenter:
                country: 'TWN'
```

## TypeScript

You can see example Typescript invocations for each model below.

