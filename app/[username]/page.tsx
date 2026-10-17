import PublicPage from "@/components/PublicPage";
import {prisma} from "@/lib/db"

const page = async ({params}: {params: Promise<{username: string}>}) => {
  const {username} = await params;
   const user = await prisma.user.findUnique({
    where: {
        username: username
    },
    select: { username: true, id: true, name: true, avatarUrl: true, image: true, theme: true },
   })
   const links = await prisma.link.findMany({
    where: {
        userId: user?.id,
        type: "LINK"
    },
    orderBy: {
        order: "asc"
    }
   })
   const socials = await prisma.link.findMany({
    where: {
        userId: user?.id,
        type: "SOCIAL"
    },
    orderBy: {
        order: "asc"
    }
   })
   console.log(username, user, links, socials)
  return (
    <div className="min-h-screen flex justify-center">
        <div className='min-w-100 max-w-120 mt-10'>
            <PublicPage user={user} links={links} socials={socials}/>
        </div>
    </div>
  )
}

export default page