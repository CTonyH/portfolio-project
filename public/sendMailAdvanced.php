<?php
// Erweiterte E-Mail-Implementierung für bessere Server-Kompatibilität

// Error Reporting aktivieren für Debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"):
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
        
    case("POST"):
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json");
        
        try {
            $json = file_get_contents('php://input');
            
            if (empty($json)) {
                throw new Exception('No JSON data received');
            }
            
            $params = json_decode($json);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new Exception('Invalid JSON data: ' . json_last_error_msg());
            }
            
            if (!isset($params->email) || !isset($params->name) || !isset($params->message)) {
                throw new Exception('Missing required fields: name, email, message');
            }

            $email = filter_var($params->email, FILTER_SANITIZE_EMAIL);
            $name = htmlspecialchars($params->name, ENT_QUOTES, 'UTF-8');
            $message = htmlspecialchars($params->message, ENT_QUOTES, 'UTF-8');
            
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                throw new Exception('Invalid email address');
            }

            $recipient = 'tony.hirschligau@googlemail.com';
            $subject = "Portfolio Kontakt von: $name";
            
            // Einfacherer E-Mail-Body für bessere Kompatibilität
            $emailBody = "Neue Kontaktanfrage von Ihrem Portfolio\n\n";
            $emailBody .= "Name: $name\n";
            $emailBody .= "E-Mail: $email\n";
            $emailBody .= "Nachricht:\n$message\n\n";
            $emailBody .= "---\n";
            $emailBody .= "Diese E-Mail wurde über Ihr Portfolio-Kontaktformular gesendet.";

            // Einfachere Header für bessere Kompatibilität
            $headers = "From: $email\r\n";
            $headers .= "Reply-To: $email\r\n";
            $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
            $headers .= "X-Mailer: PHP/" . phpversion();

            // Log attempt
            error_log("Attempting to send email to: $recipient from: $email");
            
            $mailSent = mail($recipient, $subject, $emailBody, $headers);
            
            if ($mailSent) {
                error_log("Mail sent successfully to: $recipient");
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'message' => 'Email sent successfully',
                    'debug' => [
                        'mail_function_result' => true,
                        'recipient' => $recipient,
                        'sender' => $email
                    ]
                ]);
            } else {
                error_log("Mail function returned false for recipient: $recipient");
                http_response_code(500);
                echo json_encode([
                    'success' => false,
                    'error' => 'Mail function returned false',
                    'debug' => [
                        'mail_function_result' => false,
                        'suggestion' => 'Check server mail configuration and logs'
                    ]
                ]);
            }
            
        } catch (Exception $e) {
            error_log("Email sending error: " . $e->getMessage());
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'error' => $e->getMessage(),
                'debug' => [
                    'file' => __FILE__,
                    'line' => $e->getLine()
                ]
            ]);
        }
        break;
        
    default:
        header("Allow: POST", true, 405);
        echo json_encode(['error' => 'Method not allowed']);
        exit;
}
?>
