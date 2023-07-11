<?php

/* Contact form script
 * Purpose: To get form data and send it as an email
 * Required values: name, company-name, email, phone, message and submit
 * */

// Define who to send email
define('TO_EMAIL', "recipient@example.com");


// Check if form submitted from the same domain exit if no
$referer = $_SERVER['HTTP_REFERER'];
$refererHost = parse_url($referer, PHP_URL_HOST);
$currentHost = $_SERVER['HTTP_HOST'];
if ($refererHost !== $currentHost) {
  echo "Invalid form submission.";
  exit;
}

// If request method is not post
if ($_SERVER["REQUEST_METHOD"] != "POST") {
  echo "Not valid request method.";
}

// Check for honeypots
$spam = $_POST['spam'];
$username = $_POST['username'];
$website = $_POST['website'];

// Check honeypot fields for spam submissions
if (!empty($spam) || !empty($username) || !empty($website)) {
  echo "Possible spam submission. Please try again.";
  exit;
}

// Get fields from form
$name = $_POST['name'];
$companyName = $_POST['company-name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];

// Validate fields
if (empty($name) || empty($companyName) || empty($email) || empty($phone) || empty($message)) {
  echo "Please fill in all required fields.";
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo "Invalid email address.";
  exit;
}

if (!preg_match('/^[0-9+\-\s()]*$/', $phone)) {
  echo "Invalid phone number.";
  exit;
}

// Set the email subject
$subject = "Contact Form Submission";

// Set the email headers
$headers = "From: {$name} <{$email}>" . "\r\n";
$headers .= "Reply-To: {$email}" . "\r\n";


$emailBody = "A visitor on the website {$currentHost} has submitted the get in touch form with below information";

// Build the email body
$emailBody .= "Name: {$name}\n";
$emailBody .= "Company Name: {$companyName}\n";
$emailBody .= "Email: {$email}\n";
$emailBody .= "Phone: {$phone}\n";
$emailBody .= "Message: {$message}\n";

// Send the email
if (mail(TO_EMAIL, $subject, $emailBody, $headers)) {
  echo "Email sent successfully!";
} else {
  echo "Error sending email.";
}
