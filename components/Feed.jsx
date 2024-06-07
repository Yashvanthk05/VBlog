"use client";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

const BlogCardList = ({ posts, handleTitleClick }) => {
    return (
        <div className="blog_cards">
            {posts.map((post) => (
                <BlogCard 
                    key={post._id}
                    post={post}
                    handleTitleClick={handleTitleClick}
                />
            ))}
        </div>
    );
}

const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
        const filtered = posts.filter((post) =>
            post.title.toLowerCase().includes(value) ||
            post.blog.toLowerCase().includes(value)
        );
        setFilteredPosts(filtered);
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/blog');
            const data = await res.json();
            setPosts(data);
            setFilteredPosts(data);
        }
        fetchPosts();
    }, []);
    return (
        <section className="feed">
            <form className="searchf">
                <input
                    type="text"
                    placeholder="Search for a VBlog/VBlogger Here.."
                    value={searchText}
                    id="search"
                    onChange={handleSearch}
                />
            </form>
            <BlogCardList posts={filteredPosts} />
        </section>
    );
}

export default Feed;
