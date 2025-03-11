import React, { useState } from 'react';
import commentIcon from '../../../assets/avatar.png';
import { formatDate } from '../../../utils/formatDate';
import RatingStars from '../../../components/RatingStars';
import PostAReview from './PostAReview';

const ReviewsCard = ({ productReviews = [] }) => { // ✅ Destructure props and set default value

    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleOpenReviewModal = () => {
        setIsModalOpen(true)
    }
    const handleCloseReviewModal = () => {
        setIsModalOpen(false)
    }
    return (
        <div className='my-6 bg-gray-100 px-8'>
            {productReviews.length > 0 ? ( // ✅ Corrected length check
                <div>
                    <h3 className='text-lg font-medium'>All Comments</h3>
                    <div>
                        {productReviews.map((review, index) => ( // ✅ Correct variable usage
                            <div key={index} className="flex items-center gap-4 p-4 border-b">
                                <img src={commentIcon} alt="User Avatar" className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-semibold">{review?.userId?.username}</p>
                                    <p className="text-gray-600">{formatDate(review?.updatedAt)}</p>
                                    <p className="text-gray-600">{review.comment}</p>
                                    <RatingStars rating={review.rating}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No reviews to show</p>
            )}

            <div className='my-12'>
                <button onClick={handleOpenReviewModal} className='px-6 py-3 bg-primary text-white rounded'>Add a Review</button>
            </div>
            <PostAReview isModalOpen={isModalOpen} handleClose={handleCloseReviewModal}/>
        </div>
    );
};

export default ReviewsCard;
