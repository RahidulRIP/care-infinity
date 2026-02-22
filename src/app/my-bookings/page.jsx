import Container from "@/components/shared/Container";
import BookingList from "@/components/BookingList/BookingList";

const MyBookings = () => {
  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <Container>
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-900">
            My Care History
          </h1>
          <p className="text-slate-500">
            Track your current and past service requests
          </p>
        </div>

        <section>
          <BookingList />
        </section>
      </Container>
    </div>
  );
};

export default MyBookings;
