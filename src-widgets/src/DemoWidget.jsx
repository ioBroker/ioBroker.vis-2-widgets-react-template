import React from 'react';
import {
    Card, CardContent,
} from '@mui/material';

import { i18n as I18n } from '@iobroker/adapter-react-v5';
import VisRxWidget from '@iobroker/vis-2-widgets-react-dev/visRxWidget';

class DemoWidget extends (window.visRxWidget || VisRxWidget) {
    static getWidgetInfo() {
        return {
            id: 'tplDemoWidget',
            visSet: 'demo',
            visName: 'DemoWidget',
            visAttrs: [
                {
                    name: 'common', // group name
                    fields: [
                        {
                            name: 'type',
                            type: 'select',
                            options: ['all', 'current', 'days'],
                            default: 'all',
                        },
                    ],
                },
                // check here all possible types https://github.com/ioBroker/ioBroker.vis/blob/react/src/src/Attributes/Widget/WidgetField.jsx#L287
            ],
            visPrev: 'widgets/vis-2-widgets-react-template/img/vis-widget-demo.png',
        };
    }

    // eslint-disable-next-line class-methods-use-this
    getWidgetInfo() {
        return DemoWidget.getWidgetInfo();
    }

    renderWidgetBody(props) {
        super.renderWidgetBody(props);

        return <Card style={{ width: '100%', height: '100%' }}>
            <CardContent>
                {I18n.t('My Demo widget')}
            </CardContent>
        </Card>;
    }
}

export default DemoWidget;
