import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { isLoading, settings = {} } = useSettings();

  const {
    min_booking_length: minBookingLength,
    max_booking_length: maxBookingLength,
    max_guests_per_booking: maxGuestsPerBooking,
    breakfast_price: breakfastPrice,
  } = settings;

  const { isUpdating, updateSettings } = useUpdateSettings();

  function handleUpdate(e, field) {
    console.log(e);
    const { value } = e.target;
    if (!value) return;
    updateSettings({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isLoading || isUpdating}
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "min_booking_length")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isLoading || isUpdating}
          defaultValue={maxBookingLength}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isLoading || isUpdating}
          defaultValue={maxGuestsPerBooking}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isLoading || isUpdating}
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
