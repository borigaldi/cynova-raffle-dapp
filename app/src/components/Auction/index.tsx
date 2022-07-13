import { FC, useState, useEffect } from "react";
import { Bid } from "./bidButton";
import { CounterForm } from "./counterForm";
import { notify } from "../../utils/notifications";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import useUserSOLBalanceStore from "../../stores/useSolBalanceStore";
import { useFirebaseStore } from "../../stores/useFirebaseStore";

interface MainContentProps {
  owner?: boolean;
}

const Auction: FC<MainContentProps> = (props) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const getBids = useFirebaseStore((state: any) => state.getBids);
  const placeBid = useFirebaseStore((state: any) => state.placeBid);
  const getListings = useFirebaseStore((state: any) => state.getListings);
  const winner = useFirebaseStore((state: any) => state.winner);
  const topBidder = useFirebaseStore((state: any) => state.topBidder);
  const listings = useFirebaseStore((state: any) => state.listing);
  const bids = useFirebaseStore((state: any) => state.bids);

  const userSolanaBalance = useUserSOLBalanceStore((s) => s.balance);
  console.log('Auction', { userSolanaBalance });
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  const [bidAmountCounter, setBidAmountCounter] = useState(600);
  const [highestBid, setHighestBid] = useState(0);

  //increase counter
  const increment = () => {
    setBidAmountCounter((count) => count + 1);
  };

  //decrease counter
  const decrement = () => {
    if (bidAmountCounter > 600) {
      setBidAmountCounter((count) => count - 1);
    }
  };

  const customBidAmount = (e: any) => {
    setBidAmountCounter(parseFloat(e.target.value));
  };

  const onPlaceBid = () => {
    if (highestBid > bidAmountCounter || (listings.length ? listings[0].bidAmount > bidAmountCounter :"") || (userSolanaBalance !== 0 ? !((userSolanaBalance)> bidAmountCounter ) : true ) )
      throw new (notify as any)({
        type: "error",
        message: `Not enough or Exceeds wallet SOL!`,
      });

    if ((listings.length ? ((parseFloat(listings[0].minIncrease) + highestBid ) <= bidAmountCounter) : false)) {
      placeBid(bidAmountCounter, publicKey?.toBase58());
    } else {
      throw new (notify as any)({
        type: "error",
        message: `increase Bid by atleast ${(listings.length ? listings[0].minIncrease :"")} SOL`,
      });
    }
  };

  useEffect(() => {
    getListings();
    getBids();
    winner();
    if (publicKey) getUserSOLBalance(
      publicKey as any,
      connection
    );
    if (bids.length > 0) {
      let amounts = [];
      for (let i = 0; i < bids.length; i++) {
        amounts.push(bids[i]["bidAmount"]);
      }
      setHighestBid(Math.max(...amounts));
    }
  }, [publicKey, connection, getUserSOLBalance, bids.length]);

  return (
    <div className="">
      <div className="mx-auto  border-gray-900 rounded-md flex flex-col sm:flex-row sm:justify-evenly">
        <div className="shadow-lg rounded-2xl w-64 p-4 bg-white relative overflow-hidden">
          <div className="w-100">
            <p className="text-gray-800 text-lg font-medium mb-2">
              Highest Bid
            </p>

            <p className="text-indigo-500 text-xl font-medium">
            ◎ {topBidder.length ? topBidder[0].bidAmount: 0}
            </p>
          </div>
        </div>

        <div className="shadow-lg rounded-2xl w-64 p-4 bg-white relative overflow-hidden">
          <div className="w-100">
            <p className="text-gray-800 text-lg font-medium mb-2">Bids</p>

            <p className="text-indigo-500 text-xl font-medium">{bids.length}</p>
          </div>
        </div>

        <div className="shadow-lg rounded-2xl w-64 p-4 bg-white relative overflow-hidden">
          <div className="w-100">
            <p className="text-gray-800 text-lg font-medium mb-2">
              Wallet Balance
            </p>

            <p className="text-indigo-500 text-md font-medium">
            ◎ {userSolanaBalance}
            </p>
          </div>
        </div>
      </div>

      <section className=" h-screen m-auto shadow ">
        <div className="text-center">
          {/* <h1 className="mx-auto sm:text-3xl font-semibold px-2 py-4 5 ">{total} CurrentBids</h1> */}
          <div className="mx-auto  border-gray-900 rounded-md p-16 flex flex-col sm:flex-row sm:justify-evenly">
            <div className="p-2 flex flex-col pr-10">
              {listings.length ? (
                <img
                  width={400}
                  height={400}
                  src={(listings[0]?.url || '').toString()}
                  alt=""
                  className="block object-cover object-center w-100  rounded-md  dark:bg-coolGray-500"
                ></img>
              ) : (
                <svg
                  role="status"
                  className="block object-cover object-center mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              )}
            </div>

            <div className="flex flex-col  rounded-lg ">
              <div className="shadow-lg  w-full p-4 bg-transparent ">
                <div className="w-full">
                  <p className="text-white-800 text-xl font-medium mb-2 text-center">
                    {listings.length
                      ? listings[0].name
                      : "loading nft name ..."}
                  </p>

                  <p className="text-white-500 text-md font-medium w-80 text-center">
                    {listings.length
                      ? listings[0].description
                      : "loading nft description ..."}
                  </p>
                  <p className="text-white-500 text-md font-bold w-80 text-center mt-10">
                    {/* {listings.length !== 0 ? (
                      <Countdown
                     
                        date={Date.now() + parseFloat(listings[0].time)}
                      />
                    ) : (
                      ""
                    )} */}
                    Bidding starts at   ◎ {listings.length ? listings[0].bidAmount : ""}
                  </p>
                </div>
              </div>
              <div className="custom-number-input h-10 w-100 mb-5">
                <CounterForm
                  increment={increment}
                  decrement={decrement}
                  counter={bidAmountCounter}
                  customAmount={customBidAmount}
                />
              </div>
              <Bid
                auctionState={listings.length ? listings[0].state : false}
                bidAmount={bidAmountCounter}
                placeBid={onPlaceBid}
                bidPermission={
                  !(
                    (listings.length ? listings[0].bidAmount : 0) >
                    userSolanaBalance 
                  )
                }
              />
                <div className="flex justify-end text-xs dark:text-black-400">
                  <a rel="noopener noreferrer" href="#">
                    min bid increase is {listings.length ? listings[0].minIncrease : false} SOL
                  </a>
                </div>
            </div>
          </div>
        </div>
    
      </section>
    </div>
  );
};

export default Auction;
