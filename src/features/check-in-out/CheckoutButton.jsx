import Button from "../../ui/Button";

function CheckoutButton({ bookingId }) {
  return (
    <Button variation="primary" size="small">
      Check out {bookingId}
    </Button>
  );
}

export default CheckoutButton;
