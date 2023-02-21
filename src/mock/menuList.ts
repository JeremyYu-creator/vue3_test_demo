const menuList = [
    {
        key: '1',
        title: '表格',
        // <border-horizontal-outlined />
        icon: 'BorderHorizontalOutlined',
        meta: 'table',
        children: [
            {
                key: '1-1',
                title: '数据表格',
                // <pic-left-outlined />
                icon: 'PicLeftOutlined',
                meta: 'common_table',
                children: [
                    {
                        key: '1-1-1',
                        title: '普通表格',
                        // <radius-upleft-outlined />
                        icon: 'RadiusUpleftOutlined',
                        meta: 'common_table',
                        children: null // 这个地方是[]好还是null好？
                    },
                    {
                        key: '1-1-2',
                        title: '豆瓣电影',
                        // <radius-upleft-outlined />
                        icon: 'RedditOutlined',
                        meta: 'douban_table',
                        children: null // 这个地方是[]好还是null好？
                    },
                ]
            },
        ]
    },
    {
        key: '2',
        title: '社交',
        // <twitter-outlined />
        icon: 'TwitterOutlined',
        meta: 'chat',
        children: [
            {
                key: '2-1',
                title: '新闻',
                // <chrome-outlined />
                icon: 'ChromeOutlined',
                meta: 'tencent',
                children: [
                    {
                        key: '2-1-1',
                        title: '新浪新闻',
                        // <qq-outlined />
                        icon: 'QqOutlined',
                        meta: 'tencent',
                        children: null // 这个地方是[]好还是null好？
                    },
                    {
                        key: '2-1-2',
                        title: '豆瓣详细电影',
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
                icon: 'AreaChartOutlined',
                meta: 'map',
                children: null // 这个地方是[]好还是null好？
            }
        ],
    },
    {
        key: '5',
        title: '3D渲染',
        //<bar-chart-outlined />
        icon: 'AntCloudOutlined',
        meta: '',
        children: [
            {
                key: '5-1',
                title: '3D尝试',
                // <area-chart-outlined />
                icon: 'InstagramOutlined',
                meta: '3d',
                children: null // 这个地方是[]好还是null好？
            },
            {
                key: '5-2',
                title: '图形环表',
                // <area-chart-outlined />
                icon: 'RadarChartOutlined',
                meta: 'chart',
                children: null // 这个地方是[]好还是null好？
            },
            {
                key: '5-3',
                title: 'canvas',
                // <area-chart-outlined />
                icon: 'CodeSandboxOutlined',
                meta: 'canvas',
                children: null // 这个地方是[]好还是null好？
            },
            /**
             * todo:目前3d接入，vue3暂不支持，需要进行后续的观察，暂时取消
             */
            // {
            //     key: '5-4',
            //     title: '3D环形',
            //     // <area-chart-outlined />
            //     icon: 'CodeSandboxOutlined',
            //     meta: '3dWhole',
            //     children: null // 这个地方是[]好还是null好？
            // },
            {
                key: '5-5',
                title: 'animation',
                // <heart-outlined />
                icon: 'HeartOutlined',
                meta: 'animation',
                children: null // 这个地方是[]好还是null好？
            },
            {
                key: '5-6',
                title: 'test',
                // <heart-outlined />
                // <video-camera-outlined />
                icon: 'VideoCameraOutlined',
                meta: 'test',
                children: null // 这个地方是[]好还是null好？
            },
        ],
    },

]
export default menuList
