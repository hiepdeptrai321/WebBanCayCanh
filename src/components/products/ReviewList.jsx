function ReviewList({ reviews = [] }) {
    if (!reviews.length) return null;

    return (
        <div className="mt-12 rounded-xl border border-[#e5ebe1] p-6">
            <h2 className="mb-6 text-2xl font-semibold text-[#2f3e2f]">Đánh giá</h2>

            <div className="space-y-5">
                {reviews.map((review) => (
                    <div key={review._id} className="border-b pb-4 last:border-b-0">
                        <p className="font-semibold text-[#2f3e2f]">{review.user?.fullName}</p>
                        <p className="text-sm text-yellow-500">{"★".repeat(review.rating)}</p>
                        <p className="mt-2 text-gray-700">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewList;