/**
 * Auth middleware to handle the following scenarios
 * 1) user is signed in and routes to /landing
 * 2) user is signed in and routes to /
 */
export default ({ store, redirect, route }) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']

  // case 1
  if (isAuthenticated && route.name === 'landing') {
    redirect('/')
  }

  // case 2
  if (!isAuthenticated && isProtectedRoute(route)) {
    redirect('/landing')
  }
}

const isProtectedRoute = (route) => {
  if (route.path === '/') return true
}
