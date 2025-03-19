document.addEventListener("DOMContentLoaded", function () {
    // Retrieve URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const pickupDateStr = urlParams.get("pickup-date");
    const returnDateStr = urlParams.get("return-date");

    // Check if dates are present in the URL
    if (!pickupDateStr || !returnDateStr) {
        console.error("Pickup or return date is missing in the URL.");
        return;
    }

    // Parse dates
    const pickupDate = new Date(pickupDateStr);
    const returnDate = new Date(returnDateStr);

    // Calculate rental days
    const timeDifference = returnDate - pickupDate;
    const rentalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Use Math.ceil to round up

    console.log("Pickup Date:", pickupDate);
    console.log("Return Date:", returnDate);
    console.log("Rental Days:", rentalDays);

    let selectedCar = null;
    let selectedCarPrice = 0;
    const totalPriceElement = document.getElementById("total-price");
    const carOptions = document.querySelectorAll(".car-option input[type='radio']");
    const extraServices = document.querySelectorAll(".extra");

    // Car selection
    carOptions.forEach(car => {
        car.addEventListener("change", function () {
            selectedCar = car.getAttribute("data-name"); // Get car name
            selectedCarPrice = parseFloat(car.value);
            updateTotal();
        });
    });

    // Extra services selection
    extraServices.forEach(service => {
        service.addEventListener("change", updateTotal);
    });

    function updateTotal() {
        let extraCost = 0;
        let selectedExtras = [];

        extraServices.forEach(service => {
            if (service.checked) {
                extraCost += parseFloat(service.value);
                selectedExtras.push(service.getAttribute("data-name")); // Store selected extras
            }
        });

        const totalPrice = (selectedCarPrice * rentalDays) + extraCost;
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    // Booking Confirmation
    document.getElementById("confirm-booking").addEventListener("click", function () {
        if (!selectedCar) {
            alert("Please select a car before proceeding.");
            return;
        }

        // Store booking details in localStorage
        const bookingDetails = {
            car: selectedCar,
            pricePerDay: selectedCarPrice,
            rentalDays: rentalDays,
            totalPrice: (selectedCarPrice * rentalDays),
            extras: selectedExtras,
            pickupDate: pickupDateStr,
            returnDate: returnDateStr
        };

        localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));

        // Redirect to payment page
        window.location.href = "payment.html";
    });

});
