const menuList = [
    {
        key: '1',
        title: 'option1',
        // <border-horizontal-outlined />
        icon: 'BorderHorizontalOutlined',
        children:[
            {
                key: '1-1',
                title: 'navigation1',
                // <pic-left-outlined />
                icon: 'PicLeftOutlined',
                children: [
                    {
                        key: '1-1-1',
                        title: 'option1.1',
                        // <radius-upleft-outlined />
                        icon: 'RadiusUpleftOutlined',
                        children: null // 这个地方是[]好还是null好？
                    }
                ]
            }
        ]
    },
    {
        key: '2',
        title: 'option2',
        // <twitter-outlined />
        icon: 'TwitterOutlined',
        children:[
            {
                key: '2-1',
                title: 'navigation2',
                // <chrome-outlined />
                icon: 'ChromeOutlined',
                children: [
                    {
                        key: '2-1-1',
                        title: 'option2.1',
                        // <qq-outlined />
                        icon: 'QqOutlined',
                        children: null // 这个地方是[]好还是null好？
                    },
                    {
                        key: '2-1-2',
                        title: 'option2.2',
                        // <wechat-outlined />
                        icon: 'WechatOutlined',
                        children: null // 这个地方是[]好还是null好？
                    },
                ]
            }
        ]
    },
    {
        key: '3',
        title: 'option3',
        // <font-size-outlined />
        icon: 'FontSizeOutlined',
        children: [
            {
                key: '3-1',
                title: 'navigator3',
                // <align-left-outlined />
                icon: 'AlignLeftOutlined',
                children: null // 这个地方是[]好还是null好？
            }
        ],
    },
    {
        key: '4',
        title: 'option4',
        //<bar-chart-outlined />
        icon: 'BarChartOutlined',
        children: [
            {
                key: '4-1',
                title: 'navigator4',
                // <area-chart-outlined />
                icon:'AreaChartOutlined',
                children: null // 这个地方是[]好还是null好？
            }
        ],
    },
]
export default menuList
