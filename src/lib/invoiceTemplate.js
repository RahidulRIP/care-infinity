const invoiceTemplate = (data) => {
  return `   <div>
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h1 style="color: #2563eb;">Care.Infinity Invoice</h1>
        <p>
          Hi, <b>${data.userEmail}</b>,
        </p>
        <p>
          Your booking for <strong>${data.serviceTitle}</strong> is confirmed!
        </p>
        <hr />
        <p>
          <strong>Booking ID:</strong> ${data._id}
        </p>
        <p>
          <strong>Date:</strong> ${data.date}
        </p>
        <p>
          <strong>Total Cost:</strong> ৳${data.totalCost}
        </p>
        <p>
          <strong>Address:</strong> ${data.location.address}, 
          ${data.location.upazila},$${data.location.district}
        </p>
        <hr />
        <p>Thank you for choosing our service!</p>
      </div>
    </div>`;
};

export default invoiceTemplate;
