

<?php
      
      $fname = $lname = $email = $msg = "";
      $errArr = array();
      $responseArr = array();
      $error = false; 

        if( isset($_POST["spamblocker"]) && $_POST["spamblocker"] == "4") {

          function test_input($data) {
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
          }

          function test_message($data) {
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
          }
         
          if (empty($_POST["fname"])) {
             array_push($errArr, "obligatoriskt");
          } else {
            $fname = test_input($_POST["fname"]);
            if (!preg_match("/^[A-Za-zåäöÅÄÖ ]*$/",$fname)) {
              array_push($errArr, "endast bokstaver och mellanslag");
            } else {
              array_push($errArr, "");
            }
          }

          if (empty($_POST["lname"])) {
            array_push($errArr, "obligatoriskt");
          } else {
            $lname = test_input($_POST["lname"]);
            if (!preg_match("/^[A-Za-zåäöÅÄÖ ]*$/",$lname)) {
              array_push($errArr, "endast bokstaver och mellanslag");
            } else {
              array_push($errArr, "");
            }
          }

          if (empty($_POST["email"])) {
            array_push($errArr, "obligatoriskt");
          } else {
            $email = test_input($_POST["email"]);
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
              array_push($errArr, "felaktigt format");
            } else {
              array_push($errArr, "");
            }
          }
         
          if (empty($_POST["msg"])) {
            array_push($errArr, "obligatoriskt");
          } else {
            array_push($errArr, "");
            $msg = test_message($_POST["msg"]);
            $msg = nl2br($msg);
          }

          foreach ($errArr as $val) {
            if($val != "") {
              $error = true;
              break;
            }
          }
          if($error) {
            $jsonString = json_encode($errArr);
            echo $jsonString;
          } else {  

            $to = 'niklas.lindb3rg@gmail.com';
            $from = $email;
            $subject = 'Meddelande från barbastark.com';
            $message = '<b>Name:</b> '.$fname.' <br><b>Email:</b> '.$email.' <p>'.$msg.'</p>';

            $headers = "From: $from\n";
            $headers .= "MIME-Version: 1.0\n";
            $headers .= "Content-type: text/html; charset=iso-8859-1\n";
            
          if(mail($to, $subject, $message, $headers)) {
            array_push($responseArr, "success");
            $jsonString = json_encode($responseArr);
            echo($jsonString);
          }else{
            array_push($responseArr, "The server failed to send the message. Please try again later.");
            $jsonString = json_encode($responseArr);
            echo($jsonString);
          }
        
          
         } 
      } else {
        array_push($responseArr, "fyll i kontrollfrågan");
        $jsonString = json_encode($responseArr);
        echo($jsonString);
     }
    
  ?>