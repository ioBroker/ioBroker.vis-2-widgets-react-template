import React from 'react';

import WidgetDemoApp from '@iobroker/vis-2-widgets-react-dev/widgetDemoApp';
import {
    I18n,
    type GenericAppProps,
    type LegacyConnection,
} from '@iobroker/adapter-react-v5';

import { getProps } from '@iobroker/vis-2-widgets-react-dev/visDevUtils';
import type {
    VisBaseWidgetProps,
    VisTheme,
} from '@iobroker/types-vis-2';

import DemoWidget from './DemoWidget';
import translations from './translations';

class App extends WidgetDemoApp {
    private readonly refParent = React.createRef<HTMLDivElement>();

    private readonly widgetProps: VisBaseWidgetProps;

    constructor(props: GenericAppProps) {
        super(props);

        // init translations
        I18n.extendTranslations(translations);

        this.refParent = React.createRef();

        this.widgetProps = getProps(
            {
                socket: this.socket as unknown as LegacyConnection,
                theme: this.state.theme as VisTheme,
                refParent: this.refParent,
            },
            {
                type: 'all',
            },
            {
                width: 600,
                height: 200,
            },
        );
    }

    renderWidget() {
        return <div
            ref={this.refParent}
            style={{
                width: 600,
                height: 200,
            }}
        >
            <DemoWidget
                {...this.widgetProps}
            />
        </div>;
    }
}

export default App;
