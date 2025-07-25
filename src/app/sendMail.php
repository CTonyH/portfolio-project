<?php

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json");
        
        // Payload is not send to $_POST Variable,
        // is send to php:input as a text
        $json = file_get_contents('php://input');
        
        // Prüfe ob JSON-Daten vorhanden sind
        if (empty($json)) {
            http_response_code(400);
            echo json_encode(['error' => 'No JSON data received']);
            exit;
        }
        
        //parse the Payload from text format to Object
        $params = json_decode($json);
        
        // Prüfe ob JSON gültig ist
        if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON data']);
            exit;
        }
        
        // Prüfe ob alle erforderlichen Felder vorhanden sind
        if (!isset($params->email) || !isset($params->name) || !isset($params->message)) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields: name, email, message']);
            exit;
        }

        $email = filter_var($params->email, FILTER_SANITIZE_EMAIL);
        $name = htmlspecialchars($params->name, ENT_QUOTES, 'UTF-8');
        $message = htmlspecialchars($params->message, ENT_QUOTES, 'UTF-8');
        
        // Validiere E-Mail-Adresse
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid email address']);
            exit;
        }

        $recipient = 'tony.hirschligau@googlemail.com';  
        $subject = "Portfolio Kontakt von: $name";
        $emailBody = "
        <html>
        <head>
            <title>Neue Nachricht von $name</title>
        </head>
        <body>
            <h2>Neue Kontaktanfrage</h2>
            <p><strong>Name:</strong> $name</p>
            <p><strong>E-Mail:</strong> $email</p>
            <p><strong>Nachricht:</strong></p>
            <p>$message</p>
        </body>
        </html>
        ";

        $headers   = array();
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = "From: $name <$email>";
        $headers[] = "Reply-To: $email";

        $mailSent = mail($recipient, $subject, $emailBody, implode("\r\n", $headers));
        
        // Debug-Informationen loggen
        error_log("Mail function called with:");
        error_log("Recipient: " . $recipient);
        error_log("Subject: " . $subject);
        error_log("Mail sent result: " . ($mailSent ? 'true' : 'false'));
        
        if ($mailSent) {
            http_response_code(200);
            echo json_encode(['success' => 'Email sent successfully', 'debug' => 'Mail function returned true']);
        } else {
            http_response_code(500);
            error_log("Mail function failed - check server mail configuration");
            echo json_encode([
                'error' => 'Failed to send email', 
                'debug' => 'Mail function returned false - check server logs'
            ]);
        }
        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        echo json_encode(['error' => 'Method not allowed']);
        exit;
} 
