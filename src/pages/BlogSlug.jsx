import { useParams } from 'react-router-dom'
import { getCategory } from '../data/blog.js'
import BlogCategory from './BlogCategory.jsx'
import BlogPost from './BlogPost.jsx'

/**
 * Category hubs and posts share the /blog/<name> shape. Resolving which one
 * renders here keeps the URL short without depending on the router's static
 * vs dynamic segment ranking.
 */
export default function BlogSlug() {
  const { slug } = useParams()
  return getCategory(slug) ? <BlogCategory /> : <BlogPost />
}
