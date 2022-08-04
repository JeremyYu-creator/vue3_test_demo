const menuList = [
    {
        key: '1',
        title: '表格',
        // <border-horizontal-outlined />
        icon: 'BorderHorizontalOutlined',
        meta: 'table',
        children:[
            {
                key: '1-1',
                title: 'navigation1',
                // <pic-left-outlined />
                icon: 'PicLeftOutlined',
                meta: 'table-index',
                children: [
                    {
                        key: '1-1-1',
                        title: 'formTable',
                        // <radius-upleft-outlined />
                        icon: 'RadiusUpleftOutlined',
                        meta: '',
                        children: null // 这个地方是[]好还是null好？
                    }
                ]
            }
        ]
    },
    {
        key: '2',
        title: '社交',
        // <twitter-outlined />
        icon: 'TwitterOutlined',
        meta: 'chat',
        children:[
            {
                key: '2-1',
                title: 'navigation2',
                // <chrome-outlined />
                icon: 'ChromeOutlined',
                meta: 'tencent',
                children: [
                    {
                        key: '2-1-1',
                        title: 'option2.1',
                        // <qq-outlined />
                        icon: 'QqOutlined',
                        meta: 'qq',
                        children: null // 这个地方是[]好还是null好？
                    },
                    {
                        key: '2-1-2',
                        title: 'option2.2',
                        // <wechat-outlined />
                        icon: 'WechatOutlined',
                        meta: 'wechat',
                        children: null // 这个地方是[]好还是null好？
                    },
                ]
            }
        ]
    },
    {
        key: '3',
        title: '数据',
        // <font-size-outlined />
        icon: 'FontSizeOutlined',
        meta: 'data',
        children: [
            {
                key: '3-1',
                title: '数据展示',
                // <align-left-outlined />
                icon: 'AlignLeftOutlined',
                meta: 'line',
                children: null // 这个地方是[]好还是null好？
            }
        ],
    },
    {
        key: '4',
        title: '地图',
        //<bar-chart-outlined />
        icon: 'BarChartOutlined',
        meta: '',
        children: [
            {
                key: '4-1',
                title: '高德地图',
                // <area-chart-outlined />
                icon:'AreaChartOutlined',
                meta: 'map',
                children: null // 这个地方是[]好还是null好？
            }
        ],
    },
]
export default menuList
