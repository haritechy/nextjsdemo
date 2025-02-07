"use client";


import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        const formattedPosts = data.slice(0, 10).map((post) => ({
          id: post.id,
          title: post.title,
          description: post.body,
          imageUrl: "https://picsum.photos/200",
        }));
 setPosts(formattedPosts);
        console.log(formattedPosts)
        setFilteredPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query.trim() === "") {
      setFilteredPosts(posts);
    } 
  };

  const handlePostClick = (id) => {
    router.push(`/post/${id}`);
  };
  const handleSearchClick =()=>{

    const searchResults = posts.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPosts(searchResults);

  }
  return (
    <main className="container mx-auto px-4 py-6">
      <h2 className="text-4xl font-bold mb-4">Welcome to Kar Ai Blog</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>

      {/* Search Bar */}
      <div className="flex justify-end px-4 py-6">
        <input
          value={search}
          onChange={handleSearch}
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Search..."
        />

<button
                    onClick={handleSearchClick}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4"
                >
                    Search
                </button>
      </div>

      {/* Blog Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPosts.length === 0 ? (
          <p className="text-red-500 text-2xl col-span-3 text-center">
            No feed available
          </p>
        ) : (
          filteredPosts.map((item) => (
            <div key={item.id} className="border border-gray-400 p-4 cursor-pointer" onClick={() => handlePostClick(item.id)}>
              <Image
                className="w-full h-48 object-cover mb-4"
                src={item.imageUrl}
                alt="Post Image"
              />
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Home;
