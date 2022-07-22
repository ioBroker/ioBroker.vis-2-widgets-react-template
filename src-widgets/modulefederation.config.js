const makeFederation = require('@iobroker/vis-widgets-react-dev/modulefederation.config');

module.exports = makeFederation(
    'DemoWidget',
    {
        './DemoWidget': './src/DemoWidget',
    },
);
