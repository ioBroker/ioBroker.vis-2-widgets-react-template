import React from 'react';
import bootstrap from '@iobroker/vis-2-widgets-react-dev/bootstrap';
import App from './App';

bootstrap(App as unknown as React.FC<{ socket: { port: number } }>);
