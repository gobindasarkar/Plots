document.getElementById('contactForm').addEventListener('submit', function (event) {
    let isValid = true;

    document.querySelectorAll('.error').forEach(e => e.style.display = 'none');

    const fullname = document.getElementById('fullname').value.trim();
    if (fullname === "") {
        document.getElementById('fullnameError').innerText = "Full Name is required";
        document.getElementById('fullnameError').style.display = 'block';
        isValid = false;
    }

    const phone = document.getElementById('phone').value.trim();
    if (phone === "" || !/^\+?\d{10,15}$/.test(phone)) {
        document.getElementById('phoneError').innerText = "Valid phone number is required";
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
    }

    const email = document.getElementById('email').value.trim();
    if (email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('emailError').innerText = "Valid email is required";
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }

    const message = document.getElementById('message').value.trim();
    if (message === "") {
        document.getElementById('messageError').innerText = "Message cannot be empty";
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
    }
});

$('#contactForm').on('submit', function (e) {
    e.preventDefault();

    $('#statusAlert').removeClass('alert-success alert-danger')
        .addClass('alert-info')
        .html('⏳ Sending your message...')
        .fadeIn();

    $.ajax({
        url: 'contact.php',
        type: 'POST',
        data: $(this).serialize(),
        dataType: 'json',
        success: function (response) {
            let alertClass = response.status === 'success' ? 'alert-success' : 'alert-danger';

            $('#statusAlert').removeClass('alert-success alert-danger')
                .addClass(alertClass)
                .html(response.message)
                .fadeIn();

            setTimeout(function () {
                $('#statusAlert').fadeOut();
            }, 3000);

            if (response.status === 'success') {
                $('#contactForm')[0].reset();
                setTimeout(function () {
                    window.location.href = 'welcome.php';
                }, 1000); 
            }
        },
        error: function () {
            $('#statusAlert').removeClass('alert-success')
                .addClass('alert-danger')
                .html('❌ Something went wrong. Please try again.')
                .fadeIn();

            setTimeout(function () {
                $('#statusAlert').fadeOut();
            }, 5000);
        }
    });
});

