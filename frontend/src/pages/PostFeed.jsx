import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Trash2, Edit, Save, X } from 'lucide-react';
import { getPost, deletePost, updatePost } from '../services/api'; // Your API imports

const PostFeed = () => {
    const { category } = useParams(); // Get "Project" or "Blog" from URL
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editContent, setEditContent] = useState("");

    // 1. Fetch Data when page loads
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // We pass category from URL to your API
                const response = await getPost(category);
                if (response.success) {
                    setPosts(response.data);
                }
            } catch (error) {
                console.error("Failed to load posts", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [category]);

    // 2. Delete Handler
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this?")) {
            try {
                await deletePost(id);
                // Remove from UI immediately without refreshing
                setPosts(posts.filter(p => p._id !== id));
            } catch (error) {
                alert("Could not delete");
            }
        }
    };
    //update post
    const handleupdateclick = async (id, content) => {
       setEditingId(id);
       setEditContent(content);
    }
    //handle save
    const handleSave= async()=>{
         try {
            const response = await updatePost(editingId, editContent);
            setPosts(posts.map(p=>
                p._id==editingId ? {...p ,content:editContent} : p
            ))
            setEditingId(null);
        } catch(error) {
            alert("problems while updating")
        }
    }
    //handle cancel
    const handleCancel= async()=>{
        setEditingId(null);
        setEditContent('');
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">

            {/* --- HEADER --- */}
            <div className="max-w-6xl mx-auto mb-10 flex items-center">
                <button
                    onClick={() => navigate(-1)}
                    className="mr-6 p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-all text-gray-600 hover:text-black"
                >
                    <ArrowLeft size={24} />
                </button>

                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900">{category}s</h1>
                    <p className="text-gray-500 mt-1">Viewing all your entries for {category}</p>
                </div>
            </div>

            {/* --- CONTENT AREA --- */}
            <div className="max-w-6xl mx-auto">

                {loading ? (
                    // Loading Skeleton
                    <div className="text-center py-20 text-gray-400">Loading your work...</div>
                ) : posts.length === 0 ? (
                    // Empty State
                    <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                        <h3 className="text-xl font-bold text-gray-400">No posts found</h3>
                        <p className="text-gray-400 mt-2">Go back and click the + button to add one.</p>
                    </div>
                ) : (
                    // --- THE POSTS GRID ---
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <div key={post._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col relative group">

                                {/* Date Tag */}
                                <div className="flex items-center text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
                                    <Calendar size={14} className="mr-2" />
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </div>
                                {editingId === post._id ? (
                                    <div className="flex-grow">
                                        <textarea
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            className="w-full h-40 p-3 border-2 border-blue-500 rounded-lg focus:outline-none resize-none bg-blue-50 text-gray-800"
                                        />
                                        <div className="flex justify-end space-x-2 mt-2">
                                            <button onClick={handleCancel} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                                                <X size={20} />
                                            </button>
                                            <button onClick={handleSave} className="p-2 text-green-600 hover:bg-green-100 rounded-lg">
                                                <Save size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {/* Main Content */}
                                        <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap flex-grow">
                                            {post.content}
                                        </p>

                                        {/* Action Buttons (Only visible on hover) */}
                                        <div className="mt-6 pt-4 border-t border-gray-50 flex justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => { handleupdateclick(post._id, post.content) }}
                                                className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post._id)}
                                                className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostFeed;