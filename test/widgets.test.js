const helper = require('@iobroker/vis-2-widgets-testing');

// name of the widget set, e.g. `vis-2-widgets-react-template`
const adapterName = require('../package.json').name.split('.').pop();

describe(adapterName, () => {
    before(async function () {
        this.timeout(180000);
        // install js-controller, web and vis-2
        await helper.startIoBroker();
        await helper.startBrowser(process.env.CI === 'true');
        await helper.createProject();

        // open widgets
        await helper.palette.openWidgetSet(null, adapterName);
        await helper.screenshot(null, '02_widgets_opened');
    });

    it('Check Demo widget', async function () {
        this.timeout(60000);
        const widgets = await helper.palette.getListOfWidgets(null, adapterName);
        if (!widgets.length) {
            throw new Error(`No widgets of "${adapterName}" found in the palette`);
        }
        for (const widgetName of widgets) {
            const wid = await helper.palette.addWidget(null, widgetName);
            await helper.screenshot(null, `10_${widgetName}`);
            await helper.view.deleteWidget(null, wid);
        }
    });

    after(async function () {
        this.timeout(5000);
        await helper.stopBrowser();
        return helper.stopIoBroker();
    });
});
