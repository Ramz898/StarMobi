<?php
// Полученный токен из BotFather
$token = "@starmoboibot"; // Замените на ваш токен бота

// ID чата, куда будут отправляться сообщения (ваш Telegram ID или ID группы)
$chat_id = "t.me/starmoboibot."; // Замените на ваш chat_id

// Текст сообщения, которое отправляется
$message = "Продукт добавлен в корзину";

// Отправка сообщения в Telegram через Bot API
$response = file_get_contents("7869699021:AAH3GrGwXIxgq_x0_4DPXNnv0zEtp2Xk7O4" . urlencode($message));

// Проверка ответа
echo $response;
?>
