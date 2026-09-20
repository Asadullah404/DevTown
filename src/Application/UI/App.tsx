import React from 'react';
import { SimpleCmdBoot } from './components/SimpleCmdBoot';
import { InfoOverlay } from './components/InfoOverlay';
import { HelpPrompt } from './components/HelpPrompt';
import { RotateDevicePrompt } from './components/RotateDevicePrompt';
import { MobileScreenControls } from './components/MobileScreenControls';

export const App: React.FC = () => {
  return (
    <div id="ui-app">
      <SimpleCmdBoot />
      <InfoOverlay />
      <HelpPrompt />
      <RotateDevicePrompt />
      <MobileScreenControls />
    </div>
  );
};
