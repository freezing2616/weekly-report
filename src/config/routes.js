import Home from 'views/home'
import Record from 'views/record'
import Svg from 'views/svg'

const routes = {
  '/': Home,
  '/record': Record,
  '/demo': import('views/demo'),
  '/svg': Svg
}

export default routes