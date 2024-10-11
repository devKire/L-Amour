import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(process.env.STRIPE_PK_TESTE);
const stripePromise = loadStripe('pk_test_51Q74I1I0TCfxNBzOpHE4Ap7bqegXTPWjrSJXl7mh1wEeQqOYxeenmshIQvzAWJ9YmpQxGJxqrSlqkzYaWP8QIjHn00fIC7gjHO');
export default stripePromise;
