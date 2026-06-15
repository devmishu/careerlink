import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const PLAN_PRICE_ID = {
    'seeker-pro': 'price_1Thnq6B78GeHLWVtfwDxsQde',
    'seeker-premium': 'price_1ThsYyB78GeHLWVtgia31D73',
    'recruiter-growth': 'price_1ThsbMB78GeHLWVtTCZGb0OQ',
    'recruiter-enterprise': 'price_1ThscQB78GeHLWVtJHtUzPTE',
} 