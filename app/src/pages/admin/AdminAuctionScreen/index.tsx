import { FC } from 'react';

import Screen from '../../../components/layout/Screen';
import AuctionForAdmin from '../../../components/Auction/indexForAdmin';

const AdminAuctionScreen: FC = () => {
  return (
    <Screen>
      <AuctionForAdmin />
    </Screen>
  );
};

export default AdminAuctionScreen;
