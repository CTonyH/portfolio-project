<?php
// SMTP-basierte E-Mail-Lösung (wenn verfügbar)

function sendEmailSMTP($to, $subject, $body, $from, $fromName) {
    // Verbesserte Headers für bessere Spam-Score
    $serverEmail = 'noreply@' . $_SERVER['HTTP_HOST']; // Verwendet die Domain des Servers
    
    $headers = [
        'From' => "Portfolio Contact <$serverEmail>", // Verwendet Server-Domain als Absender
        'Reply-To' => "$fromName <$from>", // Antworten gehen an den ursprünglichen Absender
        'Return-Path' => $serverEmail,
        'Content-Type' => 'text/plain; charset=UTF-8',
        'MIME-Version' => '1.0',
        'X-Mailer' => 'Portfolio Contact Form v1.0',
        'X-Priority' => '3', // Normal priority
        'Message-ID' => '<' . time() . '.' . uniqid() . '@' . $_SERVER['HTTP_HOST'] . '>'
    ];
    
    return mail($to, $subject, $body, implode("\r\n", array_map(
        function($k, $v) { return "$k: $v"; },
        array_keys($headers),
        array_values($headers)
    )));
}

// Alternative: FormSubmit.co Service
function sendViaFormSubmit($data) {
    $url = 'https://formsubmit.co/tony.hirschligau@googlemail.com';
    
    $postData = [
        'name' => $data->name,
        'email' => $data->email,
        'message' => $data->message,
        '_subject' => 'Portfolio Kontakt von: ' . $data->name,
        '_captcha' => 'false'
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    
    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return $httpCode >= 200 && $httpCode < 300;
}

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
            $params = json_decode($json);
            
            if (!$params || !isset($params->email, $params->name, $params->message)) {
                throw new Exception('Missing required fields');
            }
            
            // Strukturierte E-Mail-Nachricht erstellen
            $emailBody = "Neue Kontaktanfrage über Portfolio-Website\n";
            $emailBody .= str_repeat("=", 50) . "\n\n";
            $emailBody .= "Absender-Informationen:\n";
            $emailBody .= "Name: {$params->name}\n";
            $emailBody .= "E-Mail: {$params->email}\n\n";
            $emailBody .= "Nachricht:\n";
            $emailBody .= str_repeat("-", 20) . "\n";
            $emailBody .= "{$params->message}\n";
            $emailBody .= str_repeat("-", 20) . "\n\n";
            $emailBody .= "Gesendet über: Portfolio Contact Form\n";
            $emailBody .= "Zeitstempel: " . date('Y-m-d H:i:s') . "\n";
            $emailBody .= "IP-Adresse: " . ($_SERVER['REMOTE_ADDR'] ?? 'Unbekannt') . "\n";
            
            // Versuch 1: Native mail() Funktion
            $success = sendEmailSMTP(
                'tony.hirschligau@googlemail.com',
                '✉️ Portfolio Kontakt von: ' . $params->name,
                $emailBody,
                $params->email,
                $params->name
            );
            
            if (!$success && function_exists('curl_init')) {
                // Versuch 2: Externes Service (FormSubmit)
                error_log("Native mail failed, trying FormSubmit service");
                $success = sendViaFormSubmit($params);
            }
            
            if ($success) {
                echo json_encode(['success' => true, 'message' => 'Email sent']);
            } else {
                throw new Exception('All email methods failed');
            }
            
        } catch (Exception $e) {
            error_log("Email error: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
?>
