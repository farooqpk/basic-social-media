import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export const CreatePost = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const submitForm = async (data) => {
        const postRef = collection(db, "posts");
        try {
            await addDoc(postRef, {
                ...data,
                username: user.displayName,
                userId: user.uid,
            });
            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    };

    const schema = yup.object().shape({
        title: yup.string().required("you must fill this").uppercase(),
        description: yup.string().required("you must fill this"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    return (
        <div className="flex items-center m-auto overflow-hidden flex-col justify-between my-20">
            <h1 className="font-bold text-3xl">create post</h1>
            <form className="mt-4 flex flex-col space-y-3" onSubmit={handleSubmit(submitForm)}>
                <input
                    type="text"
                    placeholder="title here.."
                    className="input input-bordered input-primary w-full max-w-xs text-xl text-slate-600"
                    {...register("title")}
                />
                {errors.title && <p className="badge-error badge-outline text-center">{errors.title.message}</p>}

                <textarea
                    className="textarea textarea-primary w-full textarea-lg text-slate-600"
                    placeholder="description here..."
                    {...register("description")}
                />
                {errors.description && (
                    <p className="badge-error badge-outline text-center">{errors.description.message}</p>
                )}

                <input type="submit" className="btn btn-sm btn-primary" />
            </form>
        </div>
    );
};
