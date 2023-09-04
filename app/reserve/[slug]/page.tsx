import Header from "./components/Header"
import ReserveForm from "./components/ReserveForm"

export default function Reservations() {
    return (
        <div className="border-t h-screen">
            <div className="py-9 w-3/5 m-auto">
                <Header /> {/* FORM */}
                <ReserveForm />
            </div>
        </div>
    )
}
