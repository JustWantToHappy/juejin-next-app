import { withAuth} from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized({ req, token, }) {
      console.info(token,req,'token')
      return !!token
    },
  },
})


export const config = {
  matcher:['/editor']
}