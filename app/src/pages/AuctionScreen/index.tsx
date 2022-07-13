import { FC } from 'react';

import Screen from '../../components/layout/Screen';
import Auction from '../../components/Auction/mainContent';

const AuctionScreen: FC = () => {
  return (
    <Screen>
      <Auction />
    </Screen>
  );
};

export default AuctionScreen;
