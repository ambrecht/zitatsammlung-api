const zitatSchema = {
    type: 'object',
    properties: {
        zitat: {
            $id: '#/properties/zitat',
            type: 'object',
            examples: [
                {
                    zitat: {
                        body:
                            'Von unsern Eigenschaften kann keine dem göttlichen Wesen zugeschrieben werden, ohne es mit ihrer Unvollkommenheit zu beflecken.',
                        autor: 'Michel de Montaigne',
                        seite: '55',
                        buch: {
                            titel: 'Tagebuch der Reise nach Italien',
                            verlag: 'Eichborn Verlag',
                            jahr: '2009',
                        },
                        hashtag: '#Gott',
                        user: {
                            name: 'betonhead',
                            email: 'bier@wurst.de',
                        },
                    },
                },
            ],
            properties: {
                body: {
                    type: 'string',
                    examples: [
                        'Von unsern Eigenschaften kann keine dem göttlichen Wesen zugeschrieben werden, ohne es mit ihrer Unvollkommenheit zu beflecken.',
                    ],
                },
                autor: {
                    type: 'string',
                    examples: ['Michel de Montaigne'],
                },
                seite: {
                    type: 'string',
                    examples: ['55'],
                },
                buch: {
                    type: 'object',
                    examples: [
                        {
                            titel: 'Tagebuch der Reise nach Italien',
                            verlag: 'Eichborn Verlag',
                            jahr: '2009',
                        },
                    ],
                    properties: {
                        titel: {
                            type: 'string',
                            examples: ['Tagebuch der Reise nach Italien'],
                        },
                        verlag: {
                            type: 'string',
                            examples: ['Eichborn Verlag'],
                        },
                        jahr: {
                            type: 'string',
                            examples: ['2009'],
                        },
                    },
                },
                hashtag: {
                    type: 'array',
                    maxItems: 8,
                    items: {
                        type: 'string',
                        examples: ['#Gott', '#Vollkommenheit'],
                    },
                },
                user: {
                    type: 'object',
                    examples: [
                        {
                            name: 'betonhead',
                            email: 'bier@wurst.de',
                        },
                    ],
                    properties: {
                        name: {
                            type: 'string',
                        },
                        email: {
                            type: 'string',
                            pattern: '^[\\w|-|.]+@[\\w]+\\.[A-Za-z]{2,4}$',
                        },
                    },
                },
            },
            additionalProperties: false,
            required: ['body', 'user'],
        },
    },
}
