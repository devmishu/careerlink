import { redirect } from 'next/navigation'
// import { stripe } from '../../lib/stripe'
import SuccessCard from '../_components/SuccessCard'
import { stripe } from '@/lib/stripe'
import { createSubscriptions } from '@/lib/actions/subscriptions'

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    // লাইন আইটেম ও পেমেন্ট ইনটেন্ট এক্সপ্যান্ড করে সেশন রিট্রিভ করা হচ্ছে
    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    const { status, customer_details, metadata } = session;

    console.log("session--------........................",session);
    if (status === 'open') {
        return redirect('/') 
    }

    if (status === 'complete') {


        const subInfo = {
            email: customer_details?.email,
            planId: metadata.planId,
        }
        const result = await createSubscriptions(subInfo);
        console.log("subscriptions.........", result);

        // ডাইনামিকালি সেশন থেকে ডেটা প্রসেস করা হচ্ছে
        const lineItem = session.line_items?.data?.[0];
        const paymentIntent = session.payment_intent;

        // অ্যামাউন্ট সেন্ট (cents) এ থাকে, তাই ১০০ দিয়ে ভাগ করে ডলারে কনভার্ট করা হয়েছে
        const amountTotal = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00';
        const currencySymbol = session.currency === 'usd' ? '$' : session.currency?.toUpperCase() || '$';

        const sessionData = {
            id: session.id,
            customerEmail: customer_details?.email || 'N/A',
            planName: lineItem?.description || 'Premium Subscription',
            amount: `${currencySymbol}${amountTotal}`,
            // পেমেন্ট মেথডের লাস্ট ৪ ডিজিট (যদি এভেলেবল থাকে)
            paymentMethod: paymentIntent?.payment_method_types?.[0]
                ? `Method: ${paymentIntent.payment_method_types[0].toUpperCase()}`
                : 'Card Verification Success',
            // সেশন তৈরির সময়কে লোকাল ডেট ফরম্যাটে কনভার্ট করা
            date: session.created
                ? new Date(session.created * 1000).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                })
                : new Date().toLocaleDateString('en-US')
        };

        return (
            <section id="success">
                {/* প্রপস আকারে ডেটা পাস করা হলো */}
                <SuccessCard transaction={sessionData} />
            </section>
        )
    }
}