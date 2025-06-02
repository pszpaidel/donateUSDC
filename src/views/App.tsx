import React, { FC, useState } from 'react';
import { AlgorandClient } from '@algorandfoundation/algokit-utils';
import { Input } from '@heroui/react';
import { AccountInfo } from '@/component/AccountInfo.tsx';
import { RewardsInfo } from '@/component/RewardsInfo.tsx';
import { SearchInput } from '@/component/SearchInput.tsx';
import { Background } from '@/component/Background.tsx';

const algorand = AlgorandClient.mainNet();

export const App: FC = () => {
  const [address, setAddress] = useState<string>(
    'RULTY7ANRKPCOOVMV4DYNVFUZ2APHSTMY4JDPMS3ZIOCQS6EQOS3DEUTVY',
  );
  const isValidAddress = address.length === 58;

  return (
    <Background>
      <div className="flex flex-col justify-center items-center p-8 w-full h-full">
        <div className="flex flex-row justify-center items-center gap-x-8 min-w-[530px] mb-8">
          <Input
            value={address}
            maxLength={58}
            placeholder="Algorand address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            style={{ textAlign: 'center' }}
          />

        </div>
        <div className="flex flex-row justify-center items-center gap-x-8 min-w-[530px] mb-8">
          <SearchInput />
        </div>

          {isValidAddress && (
            <div className="flex flex-row justify-center items-center gap-x-8 ">
              <div className="flex justify-center items-center gap-x-8">
                <AccountInfo
                  address={address.length === 58 ? address : undefined}
                  algorand={algorand}
                />
                <RewardsInfo
                  address={address.length === 58 ? address : undefined}
                  algorand={algorand}
                />
              </div>
            </div>
          )}
        </div>
    </Background>
);
};
