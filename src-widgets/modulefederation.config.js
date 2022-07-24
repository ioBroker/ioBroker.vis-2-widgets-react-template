const makeFederation = require('@iobroker/vis-widgets-react-dev/modulefederation.config');

module.exports = makeFederation(
    'vis2demoWidget', // internal name of package - must be unique and identical with io-package.json=>common.visWidgets.vis2demoWidget
    {
        './DemoWidget': './src/DemoWidget', // List of all widgets in this package
    },
);
