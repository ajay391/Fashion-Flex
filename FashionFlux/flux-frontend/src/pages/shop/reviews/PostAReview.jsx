import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { usePostReviewMutation } from '../../../redux/features/reviews/reviewsAPi';

const PostAReview = ({isModalOpen, handleClose}) => {

    const {id} = useParams();
    const {user} = useSelector((state) => state.auth)
    // console.log(user)

    const [rating, setRating] = useState(0);

    const {refetch} = useFetchProductByIdQuery(id, {skip: !id});
    const [postReview] = usePostReviewMutation()
    
    const [comment, setComment]  = useState('');
    const handleRating = (value) => {
        setRating(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newComment  = {
            comment: comment,
            rating: rating,
            userId: user?._id,
            productId: id
        }
        try{
            console.log(newComment)
            const response = await postReview(newComment).unwrap();
            alert("cmnt success")
            setComment('');
            setRating(0);
            refetch();
        }catch(error){
            console.error("Error posting review:", error);
            alert(error?.data?.message || "Failed to post review");
        }
        handleClose();
    }
  return (
    <div className={`fixed inset-0 bg-black/90 items-center justify-center z-40 px-2 ${isModalOpen ? 'block' : 'hidden'}`}>
        <div className='bg-white w-96 z-50'>
            <h2>Post a Review</h2>
            <div className='flex items-center mb-4'>
                {
                    [1,2,3,4,5].map((star)=> (
                        <span key={star} className='cursor-pointer'
                        onClick={()=> handleRating(star)}
                        >
                            {
                                rating >= star ? (<i className='ri-star-fill'></i>) : (<i className='ri-star-line'></i>)
                            }
                        </span>
                    ))
                }

            </div>
            <textarea
            value={comment}
            onChange={(e)=> setComment(e.target.value)}
            rows="4"
            className='w-full border border-gray-300 p-4'
            >

            </textarea>
            <div className='flex justify-end'>
                <button className='px-4' onClick={handleClose}>Cancel</button>
                <button className='px-4 py-2 bg-primary' onClick={handleSubmit}>Submit</button>
            </div>

        </div>

        
    </div>
  )
}

export default PostAReview