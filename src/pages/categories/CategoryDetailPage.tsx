import { useParams } from 'react-router'

import CategoryView from '../../components/categories/CategoryView'

const CategoryDetailPage = () => {
  const { id } = useParams<{ id: string }>()

  return <CategoryView id={Number(id)} />
}

export default CategoryDetailPage
