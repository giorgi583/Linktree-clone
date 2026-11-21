import { auth } from '@/auth'
import PersonalInfoForm from '@/components/PersonalInfoForm'
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';


const page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login")
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id
    }
  });

  return (
    <div>
      <h2 className='text-2xl font-bold p-5 border-b-2 mb-10'>Profile</h2>
    <div className='bg-sidebar-accent p-10 rounded-2xl'>
      <PersonalInfoForm user={user} />
    </div>
    </div>
  )
}

export default page