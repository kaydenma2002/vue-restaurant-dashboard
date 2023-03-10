export default [
    {
        path: '/order',
        component: () => import('@/layouts/main/layout-bar.vue'),
        meta: {
            title: 'Swing :: Order'
        },
        children: [
            {
                path: '',
                name: 'Order',
                component: () => import('@/views/Order.vue')
            }
        ]
    }
]