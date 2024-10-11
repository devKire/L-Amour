require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

// const stripeSecretKey = process.env.STRIPE_SK_TESTE;
// if (!stripeSecretKey) {
//   console.error('A chave do Stripe não está definida!');
//   console.log(process.env.STRIPE_SK_TESTE)
//   process.exit(1);
// }
const stripe = new Stripe('sk_test_51Q74I1I0TCfxNBzOVG1dgUYuXNr7rx2gUwVzYygTtcyh2Drl6e6N9oZ99CVBr09wVXd9gcVChxigHDICvXvsDRCs00jWeR3QWM');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// Função para enviar e-mail de confirmação de compra
// const sendEmail = (userEmail, items) => {
//   let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.REACT_APP_EMAIL_USER, 
//       pass: process.env.REACT_APP_EMAIL_PASS, 
//     },
//   });

//   let mailOptions = {
//     from: process.env.REACT_APP_EMAIL_USER,
//     to: userEmail,
//     subject: 'Confirmação de Compra - LamourGames',
//     text: `Obrigado por sua compra! Aqui estão os detalhes:\n\n${items
//       .map(item => `Produto: ${item.username}, Quantidade: ${item.quantity}, Preço: R$${(item.price / 100).toFixed(2)}`)
//       .join('\n')}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Erro ao enviar e-mail:', error);
//     } else {
//       console.log('E-mail enviado: ' + info.response);
//     }
//   });
// };

// Criar sessão de checkout
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body;
    console.log('Itens recebidos do frontend:', items);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], 
      line_items: items.map(item => ({
        price_data: {
          currency: 'brl',
          product_data: {
            name: item.id, 
          },
          unit_amount: item.price * 100, 
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/shop',
    });

    console.log('Sessão de checkout criada:', session);
    res.json({ id: session.id });
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Configurar o webhook do Stripe para eventos de pagamento
// const endpointSecret = 'aqui vai o weebrook'; 

// app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//   } catch (err) {
//     console.error('Erro de verificação da assinatura do webhook:', err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object;

//     const userEmail = session.customer_details.email;
//     const items = session.display_items || [];

//     console.log('Pagamento confirmado para:', userEmail);
//     console.log('Itens comprados:', items);

//     sendEmail(userEmail, items);
//   }

//   res.status(200).send('Webhook recebido com sucesso');
// });


// Iniciar o servidor
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
