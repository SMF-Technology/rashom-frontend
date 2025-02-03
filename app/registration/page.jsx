import Affiliate from "../components/Affiliate"
import DressStyle from "../components/DressStyle"
import Registration from "../components/registration/Registration"
export const runtime = 'edge';
const page = () => {



  return (
    <div >
      <Registration />
      <DressStyle />
      <Affiliate />
    </div>
  )
}

export default page