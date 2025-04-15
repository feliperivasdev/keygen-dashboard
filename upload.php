<?php
// Ruta donde se guardarán las imágenes
$uploadDir = __DIR__ . '/images/';

// Verifica si la carpeta de imágenes existe, si no, la crea
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// Verifica si se envió un archivo
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $productId = $_POST['productId']; // ID del producto enviado desde el frontend
    $file = $_FILES['image'];

    // Verifica si hubo un error al subir el archivo
    if ($file['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['message' => 'Error al subir el archivo.']);
        exit;
    }

    // Define el nombre del archivo como product-{id}.jpg
    $fileName = "product-$productId.jpg";
    $filePath = $uploadDir . $fileName;

    // Mueve el archivo subido a la carpeta de imágenes
    if (move_uploaded_file($file['tmp_name'], $filePath)) {
        echo json_encode(['message' => 'Imagen subida correctamente.', 'imageUrl' => "/images/$fileName"]);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Error al guardar el archivo.']);
    }
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Solicitud inválida.']);
}
?>