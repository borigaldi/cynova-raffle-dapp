import { FC, useState } from 'react';

import MainContent from './mainContent';

export const NftVipAccess: FC = () => {
    const [isHolder, setNftHolder] = useState(false);

    return (
        <div>
            <MainContent owner={isHolder} />
        </div>
    );
};
