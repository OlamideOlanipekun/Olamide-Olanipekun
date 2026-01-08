import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface Review {
    id: number;
    name: string;
    company?: string;
    rating: number;
    message: string;
    created_at: string;
    featured?: boolean;
}

const Reviews: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        rating: 5,
        message: ''
    });

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const data = await api.get('/reviews');
            setReviews(data);
        } catch (error) {
            console.error('Failed to fetch reviews', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.post('/reviews', formData);
            setSubmitted(true);
            setFormData({ name: '', email: '', company: '', rating: 5, message: '' });
            setTimeout(() => {
                setShowForm(false);
                setSubmitted(false);
            }, 3000);
        } catch (error) {
            console.error('Failed to submit review', error);
            alert('Failed to submit review. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const StarRating = ({ rating, interactive = false, onChange }: { rating: number; interactive?: boolean; onChange?: (r: number) => void }) => (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    disabled={!interactive}
                    onClick={() => onChange?.(star)}
                    className={`text-lg ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} ${star <= rating ? 'text-amber-400' : 'text-zinc-200'}`}
                >
                    ★
                </button>
            ))}
        </div>
    );

    if (loading) {
        return <div className="py-20 text-center text-zinc-400 text-xs font-black uppercase tracking-widest">Loading Reviews...</div>;
    }

    return (
        <section className="py-24 sm:py-32 bg-zinc-50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-50/30 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 animate-fade-up">
                    <h2 className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.5em] mb-4">Testimonials</h2>
                    <p className="text-4xl md:text-6xl font-black tracking-tighter leading-[1] mb-6 text-zinc-900">
                        Client <span className="text-zinc-300">Reviews.</span>
                    </p>
                    <p className="text-zinc-400 text-sm max-w-xl mx-auto">
                        Hear what our clients say about working with Midtech Solutions.
                    </p>
                </div>

                {reviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {reviews.map((review, idx) => (
                            <div
                                key={review.id}
                                className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-500 animate-fade-up group"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <StarRating rating={review.rating} />
                                <p className="text-zinc-600 leading-relaxed mt-6 mb-8 text-sm">
                                    "{review.message}"
                                </p>
                                <div className="flex items-center gap-4 pt-6 border-t border-zinc-100">
                                    <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-white font-black text-lg">
                                        {review.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="font-black text-zinc-900 text-sm">{review.name}</div>
                                        {review.company && (
                                            <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{review.company}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-[2.5rem] border border-dashed border-zinc-200 mb-16">
                        <span className="text-4xl mb-4 block">💬</span>
                        <p className="text-zinc-400 text-sm">No reviews yet. Be the first to share your experience!</p>
                    </div>
                )}

                {/* Leave a Review CTA */}
                <div className="text-center">
                    {!showForm ? (
                        <button
                            onClick={() => setShowForm(true)}
                            className="inline-flex items-center gap-4 px-10 py-5 bg-zinc-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
                        >
                            Leave a Review
                            <span className="text-lg">⭐</span>
                        </button>
                    ) : (
                        <div className="max-w-lg mx-auto bg-white p-8 rounded-[2rem] border border-zinc-200 shadow-lg animate-fade-up">
                            {submitted ? (
                                <div className="text-center py-8">
                                    <span className="text-5xl block mb-4">✅</span>
                                    <h3 className="text-xl font-black text-zinc-900 mb-2">Thank You!</h3>
                                    <p className="text-zinc-400 text-sm">Your review has been submitted for approval.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <h3 className="text-lg font-black text-zinc-900 uppercase tracking-widest text-center mb-6">Share Your Experience</h3>

                                    <div className="flex justify-center mb-4">
                                        <StarRating rating={formData.rating} interactive onChange={(r) => setFormData({ ...formData, rating: r })} />
                                    </div>

                                    <input
                                        type="text"
                                        required
                                        placeholder="Your Name *"
                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-all"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email (optional)"
                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-all"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Company (optional)"
                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-all"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    />
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="Your review... *"
                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 transition-all resize-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />

                                    <div className="flex gap-3 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setShowForm(false)}
                                            className="flex-1 py-3 text-xs font-bold uppercase border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="flex-1 py-3 bg-indigo-600 text-white text-xs font-bold uppercase rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {submitting ? 'Submitting...' : 'Submit Review'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
