const people = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
]

const column = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
]

const mockDataColumn = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        width: '20%',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        filters: [
            { text: 'Male', value: 'male' },
            { text: 'Female', value: 'female' },
        ],
        width: '20%',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
]

const newColumn = [
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: '15%',
    },
    {
        title: '更新时间',
        dataIndex: 'cTime',
        key: 'cTime',
        width: '10%',
    },
    {
        title: '渠道',
        dataIndex: 'source',
        key: 'source',
        width: '10%',
    },
    {
        title: '详情',
        dataIndex: 'summary',
        key: 'summary',
        width: '30%',
    },
    {
        title: '图片',
        dataIndex: 'allPics',
        key: 'allPics',
        width: '15%',
    },
    {
        title: '评论',
        dataIndex: 'comment',
        key: 'comment',
        width: '10%',
    },
    {
        title: 'URL',
        dataIndex: 'URL',
        key: 'URL',
        width: '10%',
    },
]
export { people, column, mockDataColumn, newColumn }
