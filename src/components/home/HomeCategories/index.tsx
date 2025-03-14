import { HOME_CATEGORIES } from '@/components/constants/home.constants'

import HomeCategoryIcon from './components/CategoryIcons'

export default function HomeCategories() {
  return (
    <div className='flex gap-2'>
      {HOME_CATEGORIES.map(v => (
        <HomeCategoryIcon
          key={v.id}
          {...v}
        />
      ))}
    </div>
  )
}
