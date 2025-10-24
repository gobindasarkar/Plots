<?php
// Include PHPMailer
include('smtp/PHPMailerAutoload.php');

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Collect and sanitize form inputs
    $fullname = htmlspecialchars(trim($_POST['fullname'] ?? ''));
    $phone    = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $email    = htmlspecialchars(trim($_POST['email'] ?? ''));
    $message  = htmlspecialchars(trim($_POST['message'] ?? ''));

    // Basic validation
    if (empty($fullname) || empty($email) || empty($message)) {
        echo json_encode([
            'status' => 'error',
            'message' => '❌ Please fill all required fields!'
        ]);
        exit;
    }

    // Create the email content
    $mail_body = "
        <h2>New Contact Form Submission</h2>
        <p><strong>Full Name:</strong> {$fullname}</p>
        <p><strong>Phone:</strong> {$phone}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Message:</strong><br>{$message}</p>
    ";

    // Send email
    $result = smtp_mailer('hellogetindiatech@gmail.com', 'New Contact Form Submission', $mail_body);

    if ($result) {
        echo json_encode([
            'status' => 'success',
            'message' => '✅ Your enquiry has been sent successfully!'
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => '❌ Something went wrong. Please try again.'
        ]);
    }
    exit;
}

// SMTP mailer function
function smtp_mailer($to, $subject, $msg) {
    $mail = new PHPMailer();
    $mail->IsSMTP();
    $mail->SMTPAuth   = true;
    $mail->SMTPSecure = 'tls';
    $mail->Host       = "smtp.gmail.com";
    $mail->Port       = 587;
    $mail->IsHTML(true);
    $mail->CharSet    = 'UTF-8';
    $mail->Username   = "hellogetindiatech@gmail.com"; // Your Gmail
    $mail->Password   = "yjyr szaf zgfk qkzt";          // Your Gmail App Password
    $mail->SetFrom("hellogetindiatech@gmail.com", "Website Contact Form");
    $mail->Subject    = $subject;
    $mail->Body       = $msg;
    $mail->AddAddress($to);

    // Optional SSL settings
    $mail->SMTPOptions = [
        'ssl' => [
            'verify_peer'       => false,
            'verify_peer_name'  => false,
            'allow_self_signed' => true
        ]
    ];

    return $mail->Send();
}
?>
