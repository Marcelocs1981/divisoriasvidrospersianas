<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode([
    "success" => false
  ]);
  exit;
}

$nome = htmlspecialchars($_POST['nome'] ?? '');
$empresa = htmlspecialchars($_POST['empresa'] ?? '');
$email = htmlspecialchars($_POST['email'] ?? '');
$telefone = htmlspecialchars($_POST['telefone'] ?? '');
$modelo = htmlspecialchars($_POST['modelo'] ?? '');
$mensagem = htmlspecialchars($_POST['mensagem'] ?? '');

$mail = new PHPMailer(true);

try {

  $mail->isSMTP();

  $mail->Host = 'smtp.hostinger.com';

  $mail->SMTPAuth = true;

  $mail->Username = 'contato@divisoriasvidrospersianas.com.br';

  $mail->Password = '87@TB(#%e3e0n$n0)Y+_}{}P{;+_O=0O)!*&!8e5154X!5@!Cr
';

  $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;

  $mail->Port = 465;

  $mail->CharSet = 'UTF-8';

  $mail->setFrom(
    'contato@divisoriasvidrospersianas.com.br',
    'Site'
  );

  $mail->addAddress(
    'contato@divisoriasvidrospersianas.com.br'
  );

  $mail->addReplyTo(
    $email,
    $nome
  );

  $mail->isHTML(true);

  $mail->Subject = 'Novo orçamento recebido';

  $mail->Body = "
    <h2>Novo orçamento</h2>

    <p><strong>Nome:</strong> {$nome}</p>

    <p><strong>Empresa:</strong> {$empresa}</p>

    <p><strong>Email:</strong> {$email}</p>

    <p><strong>Telefone:</strong> {$telefone}</p>

    <p><strong>Modelo:</strong> {$modelo}</p>

    <p><strong>Mensagem:</strong></p>

    <p>{$mensagem}</p>
  ";

  $mail->send();

  echo json_encode([
    "success" => true
  ]);

} catch (Exception $e) {

  http_response_code(500);

  echo json_encode([
    "success" => false,
    "error" => $mail->ErrorInfo
  ]);
}