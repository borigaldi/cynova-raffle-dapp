import { PublicKey } from '@solana/web3.js';
import { RaffleMetaData } from '../lib/types';
import { TESTING } from './misc';

const testWhitelist = new Map<string, RaffleMetaData>([
  ['6e9g2aFU7QPT4Gv2Tb2Ae5WWQGZAFSsaebK3E3ay3hD', { name: 'dRafflenet #1' }],
  [
    '6e9g2aFU7QPT4Gv2Tb2Ae5WWQGZAFSsaebK3E3ay3hD',
    {
      name: 'dRaffle for the win',
      alternatePurchaseMints: [
        new PublicKey('72UgZ7avdJZBbv3wR7hbWcFy6dyHHNAoJw7CimGA55Zh'),
      ],
    },
  ],
  [
    '6e9g2aFU7QPT4Gv2Tb2Ae5WWQGZAFSsaebK3E3ay3hD',
    { name: 'dRaffle with a loooooooooooooooong name' },
  ],
  [
    '6scsG1BuD1GhAYgHCbzKLqvgMJjijzWTAgGmj9mhBwFz',
    {
      name: 'Oh my dRaffle',
      overviewImageUri: '/resources/001-mainnet-launch.gif',
      alternatePurchaseMints: [
        new PublicKey('So11111111111111111111111111111111111111112'),
      ],
    },
  ],
]);

const prodWhitelist = new Map<string, RaffleMetaData>([
  [
    '6e9g2aFU7QPT4Gv2Tb2Ae5WWQGZAFSsaebK3E3ay3hD',
    {
      name: 'TestRaffle',
      overviewImageUri: '/resources/001-mainnet-launch.gif',
    },
  ]
  ],
);

export const RAFFLES_WHITELIST = TESTING ? testWhitelist : prodWhitelist;
