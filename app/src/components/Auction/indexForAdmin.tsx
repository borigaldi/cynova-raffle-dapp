import { FC, useState } from "react";
import { notify } from "../../utils/notifications";
import { useWallet } from "@solana/wallet-adapter-react";

import { useFirebaseStore } from "../../stores/useFirebaseStore";

const AuctionForAdmin: FC = () => {
  const { publicKey } = useWallet();

  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [bidAmount, setBidAmount] = useState(0);
  const [minIncrease, setMinIncrease] = useState(0);

  const listBid = useFirebaseStore((state: any) => state.listBid);

  const onListBid = () => {
    if (!publicKey) throw new (notify as any)({
      type: "error",
      message: `Please, connect wallet`,
    });
    let data = {
      wallet: publicKey,
      description,
      name,
      url: imageUrl,
      bidAmount,
      minIncrease,
    };
    console.log({ data })
    listBid(data);
  };

  return (
    <div className="" style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
      <h3>Create listing</h3>
      <input
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <input
        type="number"
        placeholder="bidAmount"
        value={bidAmount}
        onChange={(e) => setBidAmount(+e.target.value)}
      />
      <input
        type="number"
        placeholder="minIncrease"
        value={minIncrease}
        onChange={(e) => setMinIncrease(+e.target.value)}
      />

      <button onClick={onListBid}>
        Create listing
      </button>
    </div>
  );
};

export default AuctionForAdmin;
