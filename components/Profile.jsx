import BlogCard from "./BlogCard"
const Profile = ({data,handleEdit,handleDelete,name}) => {
  return (
    <section className='profile'>
        <div className="profhead">
            <span className='profh'>My Profile</span>
            <span className='profwel'>Welcome {name} to Your Personalised Profile Page</span>
        </div>
        <div className="profcon">
        <div className="blog_cards">
                {
                    data.map((post)=>(
                        <BlogCard 
                            key={post._id}
                            post={post}
                            handleEdit={()=> handleEdit && handleEdit(post)}
                            handleDelete={()=> handleDelete && handleDelete(post)}
                        />
                    ))
                }

            </div>
        </div>
    </section>
  )
}

export default Profile