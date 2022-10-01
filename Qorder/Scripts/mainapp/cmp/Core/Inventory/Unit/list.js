

var config =
{
    View:
    {
        Entity: 'Units'
    },
    onscreenAdd: true,
    activable: true,
    enableDelete: true,
    addbutton: {},
    actionlist: [],
    filterFieldList: [],
    thList: [
        { view: 'Name' },
        { view: 'Code' }
    ],
    tdList: [
        {
            view: '{{m.Name}}'
        },
        {
            view: '{{m.Code}}'
        }
    ],
    fieldList: [[
    {
        view: setUIFields('model', 'text', { label: 'Name', value: 'Name' }), weight: 2
    },
    {
        view: setUIFields('model', 'text', { label: 'Code', value: 'Code' }), weight: 2
    }]

    ],
    use_filter: false,
    use_local_list: false,
    onscreenEdit: true,
    api_base: '/api/unit/',
    inlineEdit: false,
    template_url: '/scripts/app/cmp/list.html'
};



commonListSetup(app, config, 'list');
