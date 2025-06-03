import React from 'react';
import { Card, CardContent } from '@mui/material';

import type { RxRenderWidgetProps, RxWidgetInfo, VisRxWidgetProps, VisRxWidgetState } from '@iobroker/types-vis-2';
import type VisRxWidget from '@iobroker/types-vis-2/visRxWidget';

export interface DemoWidgetState extends VisRxWidgetState {
    // Just to show how to use custom state type
    customStateValue: string;
}

interface DemoWidgetRxData {
    type: 'all' | 'current' | 'days';
    oid: string;
}

// By minimal implementation of the widget, only 3 methods are required:
// - getWidgetInfo (static and instance) - to define the widget properties
// - renderWidgetBody - to render the widget
// - getI18nPrefix - optional if you want to use translations, where the prefix added automatically
export default class DemoWidget extends (window.visRxWidget as typeof VisRxWidget)<DemoWidgetRxData, DemoWidgetState> {
    static adapter: any;
    // you can omit this constructor if no states must be initialized
    constructor(props: VisRxWidgetProps) {
        super(props);
        this.state = {
            ...this.state,
            // Just to show how to use custom state type
            customStateValue: 'my Value',
        };
    }

    static getWidgetInfo(): RxWidgetInfo {
        return {
            id: 'tplDemoWidget',
            visSet: 'vis-2-widgets-react-template',
            visSetLabel: 'vis_2_widgets_template', // Widget set translated label (should be defined only in one widget of a set)
            visSetColor: '#cf00ff', // Color of a widget set. it is enough to set color only in one widget of a set
            visName: 'DemoWidget', // Name of widget
            visAttrs: [
                {
                    name: 'common', // group name
                    fields: [
                        {
                            name: 'type', // name in data structure
                            label: 'type', // translated field label
                            type: 'select',
                            options: ['all', 'current', 'days'],
                            default: 'all',
                        },
                    ],
                },
                {
                    name: 'private', // group name
                    label: 'private', // translated group label
                    fields: [
                        {
                            name: 'oid', // name in data structure
                            type: 'id',
                            label: 'oid', // translated field label
                        },
                    ],
                },
                // check here all possible types https://github.com/ioBroker/ioBroker.vis/blob/react/src/src/Attributes/Widget/SCHEMA.md
            ],
            visPrev: 'widgets/vis-2-widgets-react-template/img/vis-widget-demo.png',
        };
    }

    // eslint-disable-next-line class-methods-use-this
    propertiesUpdate(): void {
        // this function could be deleted if not used
        // The widget has 3 important states
        // 1. this.state.values - contains all state values, that are used in widget (automatically collected from widget info).
        //                        So you can use `this.state.values[this.state.rxData.oid + '.val']` to get the value of state with id this.state.rxData.oid
        // 2. this.state.rxData - contains all widget data with replaced bindings. E.g. if this.state.data.type is `{system.adapter.admin.0.alive}`,
        //                        then this.state.rxData.type will have state value of `system.adapter.admin.0.alive`
        // 3. this.state.rxStyle - contains all widget styles with replaced bindings. E.g. if this.state.styles.width is `{javascript.0.width}px`,
        //                        then this.state.rxData.type will have state value of `javascript.0.width` + 'px
    }

    componentDidMount(): void {
        // this function could be deleted if not used
        super.componentDidMount();

        // Update data
        this.propertiesUpdate();
    }

    // Do not delete this method. It is used by vis to read the widget configuration.
    // eslint-disable-next-line class-methods-use-this
    getWidgetInfo(): RxWidgetInfo {
        // Do not delete this method.
        return DemoWidget.getWidgetInfo();
    }
    // If the "prefix" attribute in translations.ts is true or string, you must implement this function.
    // If true, the adapter name + _ is used.
    // If string, then this function must return exactly that string
    static getI18nPrefix(): string {
        return `${DemoWidget.adapter}_`;
    }
    // This function is called every time when rxData is changed
    onRxDataChanged(): void {
        // this could be deleted if propertiesUpdate not overridden

        this.propertiesUpdate();
    }

    // This function is called every time when rxStyle is changed
    // eslint-disable-next-line class-methods-use-this
    onRxStyleChanged(): void {
        // this could be deleted if not used
    }

    // This function is called every time when some Object State updated, but all changes lands into this.state.values too
    // eslint-disable-next-line class-methods-use-this
    onStateUpdated(_id: string, _state: ioBroker.State | null | undefined): void {
        // this could be deleted if not used
    }

    renderWidgetBody(props: RxRenderWidgetProps): React.JSX.Element {
        // this method is required
        // this line is required to call the parent class method
        super.renderWidgetBody(props);

        // render here your widget...
        const text = DemoWidget.t('My Demo widget:');

        return (
            <Card style={{ width: '100%', height: '100%' }}>
                <CardContent>
                    {text} {this.state.values[`${this.state.rxData.oid}.val`]}
                </CardContent>
            </Card>
        );
    }
}
