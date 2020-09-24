import Vue from 'vue';
import Router from 'vue-router';
import chatRoom from '@/page/chatRoom';
import liveRoom from '@/page/liveRoom';
import spaceView from '@/page/spaceView';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'spaceView',
      component: spaceView
    },
    {
      path: '/liveRoom',
      name: 'liveRoom',
      component: liveRoom,
      children: [
        {
          path: '/liveIntro',
          component: () => import('../components/liveIntro.vue'),
        },
        {
          path: '/liveKeys',
          component: () => import('../components/liveKeys.vue'),
        },
        {
          path: '/liveChat',
          component: () => import('../components/liveKeys.vue')
        }
      ]
    },
    {
      path: '/chatRoom',
      name: 'chatRoom',
      component: chatRoom
    }
  ],
  // mode: 'history'
})
