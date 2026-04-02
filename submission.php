<?php
// submission.php - Handles form submission, sends email, stores data, and displays table

// Configuration
$to_email = "srinivas.kommur@gmail.com"; // Replace with your email address
$subject = "New Function Booking Request";
$whatsapp_number = "9652044945"; // Replace with your WhatsApp number (without +)
$whatsapp_api_key = "your-api-key"; // If using a WhatsApp API service

// Get form data
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';

// Validate data
if (empty($name) || empty($email) || empty($phone)) {
    die("All fields are required.");
}

// Prepare email message
$message = "New booking request:\n\n";
$message .= "Name: $name\n";
$message .= "Email: $email\n";
$message .= "Phone: $phone\n";
$message .= "Submitted on: " . date('Y-m-d H:i:s') . "\n";

// Send email
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
mail($to_email, $subject, $message, $headers);

// Send WhatsApp message (using a simple API - replace with actual API)
$whatsapp_message = "New booking: $name - $email - $phone";
sendWhatsAppMessage($whatsapp_number, $whatsapp_message);

// Store data in CSV file
$csv_file = 'submissions.csv';
$csv_data = [$name, $email, $phone, date('Y-m-d H:i:s')];
appendToCSV($csv_file, $csv_data);

// Display success message and table
echo "<!DOCTYPE html>
<html>
<head>
    <title>Submission Successful</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .success { color: green; }
    </style>
</head>
<body>
    <h1 class='success'>Thank you! Your request has been submitted successfully.</h1>
    <p>We have sent you a confirmation email and notified via WhatsApp.</p>
    <h2>All Submissions</h2>
    <table>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Submitted On</th>
        </tr>";

// Read and display CSV data
if (($handle = fopen($csv_file, "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        echo "<tr>";
        foreach ($data as $cell) {
            echo "<td>" . htmlspecialchars($cell) . "</td>";
        }
        echo "</tr>";
    }
    fclose($handle);
}

echo "    </table>
    <br>
    <a href='$csv_file' download>Download All Data as CSV</a>
</body>
</html>";

// Function to send WhatsApp message (placeholder - replace with actual API)
function sendWhatsAppMessage($number, $message) {
    // This is a placeholder. To send actual WhatsApp messages, you need to use a WhatsApp API service like Twilio, 360Dialog, etc.
    // For example, using Twilio:
    // require 'vendor/autoload.php';
    // $twilio = new Client($sid, $token);
    // $twilio->messages->create("whatsapp:$number", ["from" => "whatsapp:$twilio_number", "body" => $message]);

    // For now, just log it
    file_put_contents('whatsapp_log.txt', date('Y-m-d H:i:s') . " - $number: $message\n", FILE_APPEND);
}

// Function to append data to CSV
function appendToCSV($file, $data) {
    $fp = fopen($file, 'a');
    fputcsv($fp, $data);
    fclose($fp);
}
?>