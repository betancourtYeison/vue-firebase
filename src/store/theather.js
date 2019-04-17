export default {
    namespaced: true,
    state: {
        shows: [
            {
                sid: 'hamilton',
                title: 'Hamilton',
                picture: require('@/assets/shows/hamilton.png'),
                productions: [
                    {
                        pid: 'hamilton-teatro-super-opera-2019-04-17 18:00',
                        show: {
                            sid: 'hamilton',
                            title: 'Hamilton',
                        },
                        theather: {
                            tid: 'teatro-super-opera',
                            name: 'Teatro de la Súper Ópera'
                        },
                        date: '2019-04-17 18:00'
                    }
                ]
            },
            {
                sid: 'el-rey-leon',
                title: 'El Rey León',
                picture: require('@/assets/shows/el-rey-leon.png'),
                productions: [
                    {
                        pid: 'el-rey-leon-teatro-super-opera-2019-04-18 21:00',
                        show: {
                            sid: 'el-rey-leon',
                            title: 'El Rey León',
                        },
                        theather: {
                            tid: 'teatro-super-opera',
                            name: 'Teatro de la Súper Ópera'
                        },
                        date: '2019-04-18 21:00'
                    }
                ]
            },
            {
                sid: 'frozen',
                title: 'Frozen',
                picture: require('@/assets/shows/frozen.png'),
                productions: [
                    {
                        pid: 'frozen-teatro-super-opera-2019-02-17 15:00',
                        show: {
                            sid: 'frozen',
                            title: 'Frozen',
                        },
                        theather: {
                            tid: 'teatro-super-opera',
                            name: 'Teatro de la Súper Ópera'
                        },
                        date: '2019-02-17 15:00'
                    }
                ]
            },
            {
                sid: 'anastasia',
                title: 'Anastasia',
                picture: require('@/assets/shows/anastasia.png'),
                productions: [
                    {
                        pid: 'anastasia-teatro-super-opera-2019-02-21 20:00',
                        show: {
                            sid: 'anastasia',
                            title: 'Anastasia',
                        },
                        theather: {
                            tid: 'teatro-super-opera',
                            name: 'Teatro de la Súper Ópera'
                        },
                        date: '2019-02-21 20:00'
                    }
                ]
            }
        ]
    }
}