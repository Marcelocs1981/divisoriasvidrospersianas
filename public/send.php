<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';

// 1. CARREGA AS CREDENCIAIS ISOLADAS DO ARQUIVO DE CONFIGURAÇÃO SECRETO
require __DIR__ . '/config.php';

header('Content-Type: application/json');

// Captura dos campos padrão
$nome = $_POST['nome'] ?? '';
$empresa = $_POST['empresa'] ?? '';
$email = $_POST['email'] ?? '';
$telefone = $_POST['telefone'] ?? '';
$mensagem = $_POST['mensagem'] ?? '';

// Captura dos novos campos dinâmicos e ocultos do Astro
$titulo_pagina = $_POST['titulo_pagina'] ?? '';
$origem_produto = $_POST['origem_produto'] ?? 'Não especificado';
$origem_cidade = $_POST['origem_cidade'] ?? 'Nacional / Geral';

$mail = new PHPMailer(true);

try {

  // 2. CONTEXTO SMTP UTILIZANDO AS CONSTANTES PROTEGIDAS
  $mail->isSMTP();
  $mail->Host       = SMTP_HOST;
  $mail->SMTPAuth   = true;
  $mail->Username   = SMTP_USER;
  $mail->Password   = SMTP_PASS;
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
  $mail->Port       = SMTP_PORT;
  $mail->CharSet    = 'UTF-8';

  $mail->setFrom(
    SMTP_USER,
    'Site imprimiprinter'
  );

  $mail->addAddress(
    SMTP_USER
  );

  $mail->addReplyTo(
    $email,
    $nome
  );

  $mail->isHTML(true);

  // Define o Assunto dinamicamente com o Título da Página (se existir)
  if (!empty($titulo_pagina)) {
    $mail->Subject = 'Orçamento: ' . $titulo_pagina;
  } else {
    $mail->Subject = 'Orçamento - Site imprimiprinter';
  }

  // Corpo do e-mail estruturado e com os rastreadores de SEO/Campanha
  $mail->Body = "
    <h2>Novo Orçamento Solicitado</h2>
    <p>Um novo orçamento foi solicitado através do site.</p>
    <hr style='border: 0; border-top: 1px solid #eee; margin: 20px 0;'>

    <h3>Dados do Cliente</h3>
    <p><strong>Nome:</strong> {$nome}</p>
    <p><strong>Empresa:</strong> " . ($empresa ? $empresa : 'Não informada') . "</p>
    <p><strong>Email:</strong> {$email}</p>
    <p><strong>Telefone:</strong> {$telefone}</p>
    <p><strong>Mensagem:</strong><br>" . nl2br(htmlspecialchars($mensagem)) . "</p>

    <hr style='border: 0; border-top: 1px solid #eee; margin: 20px 0;'>
    <h3>Rastreamento do Lead</h3>
    <p><strong>Página de Origem:</strong> " . ($titulo_pagina ? $titulo_pagina : 'Não identificada') . "</p>
    <p><strong>Produto Segmentado:</strong> {$origem_produto}</p>
    <p><strong>Região/Cidade:</strong> {$origem_cidade}</p>
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