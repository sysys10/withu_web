// src/components/constants/home.constants.ts
const HOME_CATEGORIES = [
  {
    id: 1,
    title: '실내',
    color: 'bg-blue-300',
    imgSrc: '/WithU_Home.png',
    href: '/search/?tag=inside',
    hasNew: true
  },
  {
    id: 2,
    title: '실외',
    color: 'bg-green-300',
    imgSrc: '/WithU_Home.png',

    href: '/search/?tag=outside',
    hasNew: false
  },
  {
    id: 3,
    title: '맛집',
    color: 'bg-yellow-300',
    imgSrc: '/WithU_Home.png',

    href: '/search/?tag=food',
    hasNew: false
  },
  {
    id: 4,
    title: '카페',
    color: 'bg-purple-300',
    imgSrc: '/WithU_Home.png',

    href: '/search/?tag=cafe',
    hasNew: true
  },
  {
    id: 5,
    title: '전시',
    color: 'bg-red-300',
    imgSrc: '/WithU_Home.png',

    href: '/search/?tag=exhibition',
    hasNew: false
  },
  {
    id: 6,
    title: '액티비티',
    color: 'bg-orange-300',
    imgSrc: '/WithU_Home.png',

    href: '/search/?tag=activity',
    hasNew: false
  }
]

export { HOME_CATEGORIES }
