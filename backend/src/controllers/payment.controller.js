

exports.createPayment = async (req, res) => {
  const { bookingId, amount } = req.body;

  const payment = await prisma.payment.create({
    data: {
      bookingId,
      amount,
    },
  });

  res.json(payment);
};
