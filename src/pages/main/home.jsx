import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { Post } from "./post";

export const Home = () => {
    const postRef = collection(db, "posts");
    const [postList, setPostList] = useState(null);

    const getPosts = async () => {
        const data = await getDocs(postRef);
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="min-h-full p-4 my-16">
            <h1 className="text-center text-3xl font-semibold">Posts</h1>
            {postList?.map((post) => (
                <Post post={post} />
            ))}
        </div>
    );
};
