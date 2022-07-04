# dRaffle

dRaffle is a decentralized raffle protocol on Solana, which creates the necessary technical foundation to the dRaffle Luck Club. dRaffle is the first of its kind open-source transparent system to allow raffling of any token, in any amount, any mint, unlimited number of participants or number of prizes.

[dRaffle dApp](https://www.draffle.io/)

[Litepaper](https://www.draffle.io/dRaffle-litepaper.pdf)

[Solana ignition hackathon entry](https://devpost.com/software/draffle-luck-club)

[Discord](https://discord.com/invite/BwPsaDzbNR)

The dRaffle program has been deployed and is a verifiable build https://anchor.projectserum.com/program/dRafA7ymQiLKjR5dmmdZC9RPX4EQUjqYFB3mWokRuDs

## Components

- The dRaffle program, to create raffles
- The dRaffle cli, to be able to interact with all the draffle commands to create raffle and add prizes
- The community staking program, to allow user to stake and earn rewards on the dRaffle community token, which is a free gift for early adopters and will give access to raffles

## Localnet usage

`scripts/start_dev.sh` sets up an entire environment with the program raffles and NFTs in order to functionaly test the app

Before running it make sure the programs are built with `anchor build`

When `start_dev.sh` is running the react app will show a set of test raffles with various prizes and raffle end times

## Notes

- metaplex-token-metadata-test-client needs to be executable chmod +x scripts/metaplex-token-metadata-test-client, build it from source for other OSes than linux with [metaplex-program-library](https://github.com/metaplex-foundation/metaplex-program-library) using `cargo build --release`
- install gdata on MacOS in order to be able to run start_dev.sh https://www.shell-tips.com/linux/how-to-format-date-and-time-in-linux-macos-and-bash/
- To use your own deployment, create a new program keypair, update declare_id! in [programs/draffle/src/lib.rs](programs/draffle/src/lib.rs) and use the (cli commands)[cli/README.md] with your program id! Run the react app with `REACT_APP_DRAFFLE_PROGRAM_ID` set to your new program id.




target/debug/draffle create-raffle EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v 1 "2022-07-22 14:55" --max-entrants 420 --provider.cluster devnet --provider.wallet ~/sites/cynova/operations/deploy-keypair.json --program-id rafdfDKiLiny6puqDfeLRTN1xUscNxi5ew4QAqCHpQU


## Create Raffle
cargo run -- --provider.cluster devnet --provider.wallet ~/sites/cynova/operations/operator-keypair.json create-raffle So11111111111111111111111111111111111111112 10000000 "$(date -u -v+96H '+%Y-%m-%d %H:%M')" --max-entrants 690 --program-id rafdfDKiLiny6puqDfeLRTN1xUscNxi5ew4QAqCHpQU
## Add Prize
cargo run -- --provider.cluster devnet --provider.wallet ~/sites/cynova/operations/operator-keypair.json --program-id rafdfDKiLiny6puqDfeLRTN1xUscNxi5ew4QAqCHpQU add-prize 6e9g2aFU7QPT4Gv2Tb2Ae5WWQGZAFSsaebK3E3ay3hD GMYBNKfxpRSKaMPCQ6U83jcMVLWeX6AnJQ5w9oQy46t5 1 0
## Check Raffle State 
cargo run -- --provider.cluster devnet show-raffle 6e9g2aFU7QPT4Gv2Tb2Ae5WWQGZAFSsaebK3E3ay3hD --provider.wallet ~/sites/cynova/operations/operator-keypair.json
