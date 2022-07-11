import { FC } from 'react';
import {
  Button,
  Card,
  CardActions,
} from '@material-ui/core';

import Screen from '../../components/layout/Screen';

const AuctionScreen: FC = () => {
  return (
    <Screen>
      <Card title="Admin">
        <CardActions>
          <Button
            onClick={() => {}}
          >
            Create registry
          </Button>
        </CardActions>
      </Card>
    </Screen>
  );
};

export default AuctionScreen;
