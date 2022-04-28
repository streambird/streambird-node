import nock from 'nock';
import { Streambird } from "streambird-node";

export const streambird = new Streambird({ apiToken: 'sk_dev_rM2H4PXf5rGmOmrhnGU36WWZ4XzFNoMr6WlvVIeWKA2pJlOq' });

export const createNock = (): nock.Scope => nock('https://api-staging.streambird.io/v1')