import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { useViewport } from '../../../hooks/useViewport';
import discordLogo from '../../../assets/discord-logo.svg';
import twitterLogo from '../../../assets/twitter-logo.svg';
import { useStyles } from './styles';

const Footer: FC = () => {
  const { device } = useViewport();
  const classes = useStyles({
    device,
  });
  return (
    <div className={classes.root}>
      <div className={classes.socialLink}>
        <Link target="blank" to={`https://discord.gg/76T6dN8RqB`}>
          <img src={discordLogo} alt={'disord-logo'} width="25px" />
        </Link>
      </div>
      <div className={classes.socialLink}>
        <Link target="blank" to={`https://twitter.com/the_cynova?lang=en`}>
          <img src={twitterLogo} alt={'twitter-logo'} width="25px" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
