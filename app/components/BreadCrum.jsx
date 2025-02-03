/* eslint-disable react/prop-types */

import Link from "next/link"


const BreadCrum = (props) => {
  return (
    <div className='breadcrumb py-4'>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <p className='text-left mb-0'>
                        <Link to="/" className='text-dark'>Home &nbsp; &gt; </Link> {props.title}
                    </p>
                </div>
            </div>

        </div>
    </div>
  )
}

  
export default BreadCrum