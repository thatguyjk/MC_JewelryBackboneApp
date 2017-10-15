<?php

function checkNullValue($val) {
	if($val == "")
	{
		return true;
	}

	return false;
}

/*
Validate an email address.
Provide email address (raw input)
Returns true if the email address has the email 
address format and the domain exists.
*/
function validEmail($email)
{
   $isValid = true;
   $atIndex = strrpos($email, "@");
   if (is_bool($atIndex) && !$atIndex) {
      $isValid = false;
   }
   else {
      $domain = substr($email, $atIndex+1);
      $local = substr($email, 0, $atIndex);
      $localLen = strlen($local);
      $domainLen = strlen($domain);
      if ($localLen < 1 || $localLen > 64) {
         // local part length exceeded
         $isValid = false;
      } else if ($domainLen < 1 || $domainLen > 255) {
         // domain part length exceeded
         $isValid = false;
      } else if ($local[0] == '.' || $local[$localLen-1] == '.') {
         // local part starts or ends with '.'
         $isValid = false;
      } else if (preg_match('/\\.\\./', $local)) {
         // local part has two consecutive dots
         $isValid = false;
      } else if (!preg_match('/^[A-Za-z0-9\\-\\.]+$/', $domain)) {
         // character not valid in domain part
         $isValid = false;
      } else if (preg_match('/\\.\\./', $domain)) {
         // domain part has two consecutive dots
         $isValid = false;
      } else if(!preg_match('/^(\\\\.|[A-Za-z0-9!#%&`_=\\/$\'*+?^{}|~.-])+$/',
                 str_replace("\\\\","",$local))) {
         // character not valid in local part unless 
         // local part is quoted
         if (!preg_match('/^"(\\\\"|[^"])+"$/',
             str_replace("\\\\","",$local))) {
            $isValid = false;
         }
      } if ($isValid && !(checkdnsrr($domain,"MX") || checkdnsrr($domain,"A"))) {
         // domain not found in DNS
         $isValid = false;
      }
   }
   return $isValid;
}


$usrName = $_POST['name'];
$emailAddr = $_POST['email'];
$emailSubj = $_POST['subject'];
$message = $_POST['message'];


require_once('recaptchalib.php');
$private_key = "6LcuEtsSAAAAABxn91G1ZgWlsENprKbhdPZNEy0e";
$resp = recaptcha_check_answer ($private_key,
							$_SERVER["REMOTE_ADDR"],
							$_POST["recaptcha_challenge_field"],
							$_POST["recaptcha_response_field"]);

if(!$resp->is_valid) {
	die("The reCAPTCHA wasn't entered correctly. Go back and try it again.2".
		"reCAPTCHA said: " . $resp->error . ")");
}
else {
	// Your code here to handle a successful verification
	// Send the message and optionally add the user to the mailing list. 
	if(!checkNullValue($emailAddr) && validEmail($emailAddr)) {
		if(checkNullValue($usrName) || checkNullValue($emailSubj)) {
			 // Pieces of the form are not valid. Prompt user to correct errors
		}
		else {
			$mailHeader = "From: ".$emailAddr."(".$usrName.")"." \r\n";
			// create mail message with the parameters
			$mailSuccess = mail('Alisa <alisa.bendayan@richlinegroup.com>', $emailSubj, $message, $mailHeader);
			
         if ($mailSuccess == true) {
            header("location: http://www.marieclairejewelry.com/contact.php");
         }
		}
	} 
}

?>