const router = require("express").Router();
const stripe = require("stripe")(
  "RYAN'S STRIPE KEY"
);

const YOUR_DOMAIN = 'http://localhost:4242';

// POST /api/stripe/create-checkout-session
router.post("/create-checkout-session", async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          //   price: "{{PRICE_ID}}",
          price: `$${100.00}`,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:8080/confirmation?success=true`,
      cancel_url: `http://localhost:8080/confirmation?canceled=true`,
      //   success_url: `${YOUR_DOMAIN}?success=true`,
      //   cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
    res.redirect(303, session.url);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
