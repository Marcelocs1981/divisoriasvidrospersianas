<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';

header('Content-Type: application/json');

$nome = $_POST['nome'] ?? '';
$empresa = $_POST['empresa'] ?? '';
$email = $_POST['email'] ?? '';
$telefone = $_POST['telefone'] ?? '';
$modelo = $_POST['modelo'] ?? '';
$mensagem = $_POST['mensagem'] ?? '';

$mail = new PHPMailer(true);

try {

  $mail->isSMTP();

  $mail->Host = 'smtp.hostinger.com';

  $mail->SMTPAuth = true;

  $mail->Username = 'contato@divisoriasvidrospersianas.com.br';

  $mail->Password = '87@TB(#%e3e0n$n0)Y+_}{}P{;+_O=0O)!*&!8e5154X!5@!Cr';

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

  $mail->Subject = 'Site Divisórias Vidros Persianas';

  $mail->Body = "
    <h2>Formulário Home DVP</h2>

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

  echo json_encode([
    "success" => false,
    "error" => $mail->ErrorInfo
  ]);
}