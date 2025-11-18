
      // Submit form data
      window.submitForm = function () {
        // Check if user is logged in using the custom authentication system
        let currentuser = null;
        let keepLoggedIn = localStorage.getItem("keepLoggedIn");

        if (keepLoggedIn === "yes") {
          currentuser = JSON.parse(localStorage.getItem("user"));
        } else {
          currentuser = JSON.parse(sessionStorage.getItem("user"));
        }

        if (!currentuser || !currentuser.email) {
          alert("Please login first to submit a service request.");
          window.location.href = "login.html";
          return;
        }

        const email = currentuser.email;
        const formData = {
          name: document.getElementById("contact-name").value,
          phone: document.getElementById("contact-phone").value,
          service: document.getElementById("contact-service").value,
          address: document.getElementById("contact-address").value,
          landmark: document.getElementById("contact-landmark").value,
          message: document.getElementById("contact-message").value,
          email,
          date: new Date().toISOString(), // Capture the current date
        };

        // Validate required fields
        if (!formData.name || !formData.phone || !formData.service || !formData.address) {
          alert("Please fill in all required fields.");
          return;
        }

        // TODO: Implement form submission without Firebase
        // For now, just show a success message
        alert("Form submitted successfully!");
        // Reset form after successful submission
        document.querySelector('form').reset();
      };


      // Make getLocation function globally accessible
      window.getLocation = function () {
        const addressTextarea =
          document.getElementById("contact-address");

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

              fetch(url)
                .then((res) => res.json())
                .then((data) => {
                  const address = data.address;
                  const addressParts = [
                    address.road,
                    address.town,
                    address.state_district,
                    address.state,
                    address.postcode,
                  ].filter((part) => part && part.trim() !== "");

                  const formattedAddress =
                    addressParts.join(", ") || "No address found.";
                  addressTextarea.value = formattedAddress;
                  addressTextarea.placeholder = ""; // Clear the placeholder
                })
                .catch(() => {
                  addressTextarea.value =
                    "Error fetching address from API";
                });
            },
            () => {
              addressTextarea.value = "Unable to retrieve location.";
            }
          );
        } else {
          addressTextarea.value =
            "Geolocation is not supported by this browser.";
        }
      }