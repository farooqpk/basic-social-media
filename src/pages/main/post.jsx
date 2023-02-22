

import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";

export const Post = ({ post }) => {

  //to access current user from the auth
  const [user] = useAuthState(auth);
  //likes state is array object it includes id of the like documet,user id and post id
  const [likes, setLikes] = useState([]);

  const likeRef = collection(db, "likes");
  // it check wether the post id equal to postId of the likes collection
  const likesQuery = query(likeRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesQuery);
    // here we update state by iterate each doc objects(in other words like object) and include id of that doc ,and other datas(userId,postId)
    //we can also use that like this { id: doc.id,doc.data().userId,doc.data().postId }
    setLikes(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };


  const addLike = async () => {

    if (!user) {
      return;
    }
    try {
      const newDocRef = await addDoc(likeRef, {
        userId: user.uid,
        postId: post.id,
      });
      // we initialize an object which shows the data to be included in our state
      const newLike = { id: newDocRef.id, userId: user.uid, postId: post.id };
      // we concentrate new like object with existing state
      setLikes([...likes,newLike])

    } catch (error) {
      console.log(error);
    }
  };


  const removeLike = async () => {
    
    // here we checking and get data that match wether the userid of like object from the state is equal to the current user id 
    const likeToRemoveObj = likes.find((like) => like.userId === user?.uid);
    if (!likeToRemoveObj) {
      return;
    }
    // here we delete the document in the likes collection wich matches the likeToRemoveObj's id
    await deleteDoc(doc(db, "likes", likeToRemoveObj.id));
    // here we filter each object in the state and update each obj id which is not equal to likeToRemoveObj's id 
    setLikes(likes.filter((like) => like.id !== likeToRemoveObj.id));
  };

  // here we call getLikes function when component mounts
  useEffect(() => {
    getLikes();
  }, []);

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  return (
            <div className="flex justify-center">
                <div className="flex flex-col justify-center items-center my-6 bg-primary md:w-1/4 w-auto rounded-xl gap-4 p-3 border border-white break-all">
                    <h1 className="text-xl font-bold text-slate-600">{post.title}</h1>
                    <p className="text-2xl text-slate-600">{post.description}</p>
                    <p className="text-2xl text-slate-600">@{post.username}</p>
                    <div className="divider"></div>
                    <div>
                      
                        <button onClick={hasUserLiked ? removeLike : addLike} className='btn btn-sm btn-circle bg-rose-400 border-none' >
                            {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
                        </button>
    
                        {likes && <span className="badge badge-accent badge-sm font-bold">{likes.length}</span>}
                    </div>
                </div>
            </div>
        );
};

