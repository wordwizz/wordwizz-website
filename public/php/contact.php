<?php

// Make the response json type
header('Content-Type: application/json');

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] != "POST") {
  http_response_code(400);
  echo json_encode(array("message" => "Invalid request method."));
  exit;
}

// Check for honeypot fields
$spam = $_POST['spam'];
$username = $_POST['username'];
$website = $_POST['website'];

// Check honeypot fields for spam submissions
if (!empty($spam) || !empty($username) || !empty($website)) {
  http_response_code(400);
  echo json_encode(array("message" => "Possible spam submission. Please try again."));
  exit;
}

// Get fields from form
$fields = array(
  "name" => "Name",
  "company-name" => "Company Name",
  "email" => "Email",
  "phone" => "Phone",
  "message" => "Message"
);

foreach ($fields as $key => $label) {
  if (empty($_POST[$key])) {
    http_response_code(400);
    echo json_encode(array("message" => "Please fill in all required fields."));
    exit;
  }
}

$email = $_POST['email'];
$phone = $_POST['phone'];

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(array("message" => "Invalid email address."));
  exit;
}

// Validate phone number
if (!preg_match('/^[0-9+\-\s()]*$/', $phone)) {
  http_response_code(400);
  echo json_encode(array("message" => "Invalid phone number."));
  exit;
}

// Load send email from env
$env = parse_ini_file(dirname(__FILE__, 2).'/.env');
$to = $env["TO_EMAIL"];

// Set the email subject
$subject = "Contact Form Submission";

// Set the email headers
$headers = "From: {$_POST['name']} <{$email}>" . "\r\n";
$headers .= "Reply-To: {$email}" . "\r\n";

// Build the email body
$emailBody = "A visitor on the website {$currentHost} has submitted the get in touch form with the following information:\n";
foreach ($fields as $key => $label) {
  $emailBody .= "{$label}: {$_POST[$key]}\n";
}

// Send the email
if (mail($to, $subject, $emailBody, $headers)) {
  echo json_encode(array("message" => "Email sent successfully!"));
} else {
  http_response_code(500);
  echo json_encode(array("message" => "Error sending email."));
}
