import { utils } from '@project-serum/anchor';
import { TESTING } from './misc';
import { DISPENSER_PROGRAM_ID, DISPENSER_REGISTRY_ADDRESS } from './programIds';

export const ADMIN_ACCOUNTS = TESTING
  ? ['PeRXuY1P4cnzDZEPH1ancRVSyQMDpnTF27BwmQ1kkWq',
    '9jgK8pR3XKV9nHjqK26Fm7VDE14nXTQqhy6vKj2cbECr']
  : ['86f5xSDrue8Zz4QfuMErURN3o393L72zA1J2WRsYeTGB',
    '9jgK8pR3XKV9nHjqK26Fm7VDE14nXTQqhy6vKj2cbECr'];

export const [VAULT_TOKEN_IN] = utils.publicKey.findProgramAddressSync(
  [Buffer.from('vault_token_in'), DISPENSER_REGISTRY_ADDRESS.toBytes()],
  DISPENSER_PROGRAM_ID
);
console.log(`VAULT_TOKEN_IN: ${VAULT_TOKEN_IN.toBase58()}`);

export const [VAULT_TOKEN_OUT] = utils.publicKey.findProgramAddressSync(
  [Buffer.from('vault_token_out'), DISPENSER_REGISTRY_ADDRESS.toBytes()],
  DISPENSER_PROGRAM_ID
);
console.log(`VAULT_TOKEN_OUT = ${VAULT_TOKEN_OUT.toBase58()}`);
