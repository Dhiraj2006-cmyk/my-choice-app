import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const reviews = [
    {
      name: 'Rohan Sharma',
      city: 'Delhi NCR',
      car: 'Hyundai Creta SX',
      rating: 5,
      comment: 'Super smooth booking experience with zero deposit. Took the Creta for a 4-day trip to Shimla. Unlimited KMs package saved me a lot of money!'
    },
    {
      name: 'Ananya Verma',
      city: 'Bengaluru',
      car: 'Maruti Swift VXi',
      rating: 5,
      comment: 'Car delivery was right on time at my apartment in Indiranagar. Extremely clean vehicle and hassle-free return process. MyChoize is my go-to self-drive app!'
    },
    {
      name: 'Vikramaditya Rao',
      city: 'Mumbai',
      car: 'Mahindra Thar 4x4',
      rating: 5,
      comment: 'Rented the Thar for a weekend trip to Lonavala. Car was in top notch mechanical condition. 24/7 support gives immense confidence on road trips.'
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge badge-orange mb-2">HAPPY DRIVERS</span>
          <h2>Loved by 500,000+ Travelers</h2>
          <p>Read real customer reviews from self-drive car rentals across India.</p>
        </div>

        <div className="reviews-grid">
          {reviews.map((rev, idx) => (
            <div key={idx} className="review-card">
              <Quote size={32} className="quote-icon" />
              <div className="rating-stars">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#F59E0B" className="text-amber" />
                ))}
              </div>
              <p className="review-comment">"{rev.comment}"</p>
              <div className="reviewer-info">
                <div>
                  <h4 className="reviewer-name">{rev.name}</h4>
                  <span className="reviewer-meta">{rev.city} • Renting {rev.car}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-section {
          padding: 80px 0;
          background: #FFFFFF;
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .review-card {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          padding: 32px 24px;
          position: relative;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .review-card:hover {
          transform: translateY(-4px);
          border-color: #FF6B00;
          box-shadow: 0 16px 30px rgba(15, 23, 42, 0.06);
        }

        .quote-icon {
          color: #FED7AA;
          margin-bottom: 12px;
        }

        .rating-stars {
          display: flex;
          gap: 4px;
          margin-bottom: 14px;
        }

        .review-comment {
          font-size: 14px;
          color: #334155;
          line-height: 1.6;
          margin-bottom: 24px;
          font-style: italic;
          flex: 1;
        }

        .reviewer-name {
          font-size: 16px;
          font-weight: 700;
          color: #0F172A;
        }

        .reviewer-meta {
          font-size: 12px;
          color: #64748B;
        }

        @media (max-width: 992px) {
          .reviews-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
