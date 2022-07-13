import { FC, useState } from 'react';

import Index from './index';

export const NftVipAccess: FC = () => {
    const [isHolder, setNftHolder] = useState(false);

    return (
        <div>
            <Index owner={isHolder} />
        </div>
    );
};
