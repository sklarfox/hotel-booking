import { Datepicker } from "flowbite-react";
const DatePicker = () => {
  return (
    <>
      <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
        <h1 className="text-2xl dark:text-white">Hotel Booking</h1>
        <Datepicker />
      </main>
    </>
  );
};

export default DatePicker;
