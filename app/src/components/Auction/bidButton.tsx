import { useEffect} from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { notify } from "../../utils/notifications";

export interface BidProps {
    placeBid: () => void;
    bidPermission: boolean;
    auctionState: boolean;
    bidAmount: number;
}

export const Bid = (props: BidProps) => {
    const { bidAmount, bidPermission } = props;
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const bidAction = async () => {
        const notification: any = new (notify as any)({
            type: 'error',
            message: `Please make sure you have minimum bid amount to place bid `
        });
        if (props.bidPermission === false) throw notification;
        props.placeBid();
        //the above is the store to add new bid to database
        notify({ type: 'success', message: `Bid placed successfully! ` });
    }

    const onClick = async () => {
        console.log('onClick:', { publicKey, bidAmount, bidPermission });
        const notification: any = new (notify as any)({ type: 'error', message: `Wallet Not Connected! ` });
        if (!publicKey) throw notification;
        bidAction();
    };

    useEffect(() => {
        // checkNft()
    }, [connection, publicKey])

    return (
        <div className="mt-1">
            <div className="container mx-auto flex flex-col items-center justify-center lg:space-y-0 lg:flex-row lg:justify-between">
                <button onClick={onClick} disabled={!props.bidPermission || !publicKey || !props.auctionState }
                    className="relative group mt-5 w-full btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                >
                    <span className="block group-disabled:hidden"  >
                        Place Bid
                    </span>

                    <div className="hidden group-disabled:block ">
                        {!publicKey ? "Wallet Not Connected": (!props.auctionState ? "AUCTION CLOSED" : "")}
                    </div>
                </button>
            </div>
        </div>

    )
};