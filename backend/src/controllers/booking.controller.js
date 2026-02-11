const prisma = require("../prisma/client");

exports.createBooking = async (req, res) => {
  const { serviceId, address, scheduledAt } = req.body;

  const booking = await prisma.booking.create({
    data: {
      userId: req.user.id,
      serviceId,
      address,
      scheduledAt: new Date(scheduledAt),
    },
  });

  res.json(booking);
};

exports.updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const booking = await prisma.booking.update({
    where: { id },
    data: { status },
  });

  res.json(booking);
};
