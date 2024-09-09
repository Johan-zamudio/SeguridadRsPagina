<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Configuración del correo
    $mailTo = "contact@seguridadrys.cl"; // Cambia esto a tu dirección de correo
    $subject = "Nuevo mensaje de contacto";
    $headers = "From: " . htmlspecialchars($_POST['email']);

    // Recolectar datos del formulario y limpiar
    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Cuerpo del mensaje
    $emailBody = "Nombre: $name\n";
    $emailBody .= "Número Telefónico: $phone\n";
    $emailBody .= "Correo: $email\n";
    $emailBody .= "Mensaje: $message\n";

    // Enviar el correo
    if (mail($mailTo, $subject, $emailBody, $headers)) {

        // Datos de conexión a la base de datos
        $dbhost = 'localhost'; // Cambia si es necesario
        $dbuser = 'c2640596_Adm';
        $dbpass = 'Asasdfsdoiwe123';
        $dbname = 'c2640596_Negocio';

        // Crear conexión
        $conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

        // Verificar conexión
        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }

        // Insertar datos en la base de datos
        $stmt = $conn->prepare("INSERT INTO contacto (name, phone, email, message) VALUES (?, ?, ?, ?)");
        if ($stmt === false) {
            die("Error en la preparación: " . $conn->error);
        }

        $stmt->bind_param("ssss", $name, $phone, $email, $message);

        // Ejecutar y verificar la inserción
        if ($stmt->execute()) {
            echo "Datos enviados correctamente.";
        } else {
            echo "Error al insertar datos: " . $stmt->error;
        }

        // Cerrar la conexión
        $stmt->close();
        $conn->close();
    } else {
        echo "Error al enviar el correo.";
    }
} else {
    echo "Método de solicitud no válido.";
}
?>
