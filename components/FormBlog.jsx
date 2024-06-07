import { connect } from 'mongoose';
import Link from 'next/link';

const FormBlog = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="form_style">
      <div className="fcontent">
        <span className="fhead_style">{type} your Blog with VBLOG,</span>
        <span className="fcon_style">
          Let your creativity flow freely. Dive in, explore, and make your mark
          in the vibrant world of VBlog. Happy{" "}
          {type === "Create" ? "Creating" : "Editing"}!"
        </span>
      </div>
      {console.log(post.title)}
      <form onSubmit={handleSubmit} className="f_style">

        <textarea name="title" id="title" placeholder="Enter Your VBlog Title" onChange={(e)=>setPost({...post,title:e.target.value})} value={post.title}></textarea>

        <textarea name="blogcon" id="blogcon" placeholder="Write your Blog here" onChange={(e)=>setPost({...post,blog:e.target.value})} value={post.blog}></textarea>
        
        <div className="formbtns">
          <Link href="/" className='cancel_style'>
            Cancel
          </Link>
          <button type="submit" disabled={submitting} className='submit_style'>
            {submitting? `${type}...`:type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormBlog;
