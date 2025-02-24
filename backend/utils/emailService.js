import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend('re_YOUR_API_KEY_HERE');

// Get the frontend URL from the environment variable
const FRONTEND_URL = process.env.FRONTEND_URL;

// Logo path (relative to the frontend URL)
const logoPath = '/images/logo.png';

// Full logo URL
const restaurantLogoUrl = `${FRONTEND_URL}${logoPath}`;

const sendReservationConfirmation = async ({ name, email, guests, duration, date, tables, managerEmail }) => {
    try {
      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
  
      // Format table details for the email
      const tableDetailsHTML = tables
        .map(
          (table) => `
            <li>
              Table ID: ${table.tableName}<br>
              Seats: ${table.seats}<br>
              Location: ${table.location}
            </li>
          `
        )
        .join('');
  
      // Send email to the customer
      const customerEmailResponse = await resend.emails.send({
        from: 'Lobster Clan <reservations@lobsterclan.com>',
        to: email,
        subject: 'Reservation Confirmation - Lobster Clan',
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <img src="${restaurantLogoUrl}" alt="Lobster Clan Logo" style="max-width: 200px; margin-bottom: 20px;">
            <h2>Thank you for your reservation, ${name}!</h2>
            <p>We're excited to confirm your reservation at Lobster Clan.</p>
            <h3>Reservation Details:</h3>
            <ul>
              <li>Date and Time: ${formattedDate}</li>
              <li>Number of Guests: ${guests}</li>
              <li>Duration: ${duration} hour(s)</li>
            </ul>
            <h3>Selected Tables:</h3>
            <ul>
              ${tableDetailsHTML}
            </ul>
            <p>If you need to modify or cancel your reservation, please contact us.</p>
            <p>We look forward to serving you!</p>
          </div>
        `,
      });
  
      // Send email to the manager
      const managerEmailResponse = await resend.emails.send({
        from: 'Lobster Clan <reservations@lobsterclan.com>',
        to: managerEmail,
        subject: 'New Reservation - Lobster Clan',
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <img src="${restaurantLogoUrl}" alt="Lobster Clan Logo" style="max-width: 200px; margin-bottom: 20px;">
            <h2>New Reservation Received</h2>
            <p>A new reservation has been made at Lobster Clan.</p>
            <h3>Reservation Details:</h3>
            <ul>
              <li>Customer Name: ${name}</li>
              <li>Customer Email: ${email}</li>
              <li>Date and Time: ${formattedDate}</li>
              <li>Number of Guests: ${guests}</li>
              <li>Duration: ${duration} hour(s)</li>
            </ul>
            <h3>Selected Tables:</h3>
            <ul>
              ${tableDetailsHTML}
            </ul>
            <p>Please ensure everything is prepared for the reservation.</p>
          </div>
        `,
      });
  
      return {
        success: true,
        data: {
          customerEmailResponse,
          managerEmailResponse,
        },
      };
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      return { success: false, error: error.message };
    }
  };
export default sendReservationConfirmation;