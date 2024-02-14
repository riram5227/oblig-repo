var arrKinobiletter = [];

// On click "Buy a Ticket"
function clickKjopBillett() {
// Validate Empty values all fields
    if (!validerTommeVerdier()) {
        return;
    }
// Validate Numeric fields \
    if (!(validerNummeret("antall") &
    validerNummeret("telefonnr")) ) {
       return;
    }
// Validate Alpha numeric fields
    if (!(validerAlfanumerisk("fornavn") &
        validerAlfanumerisk("etternavn")) ) {
           return;
    }

// Validate Email Id is valid and telephone is 8 digit
    if (!(validerEpost("epost") & validerTelefonnr("telefonnr"))) {
        return;
    }
    // Add cinema ticket
    leggTilKinobiletter();

}

// On click "Delete All Tickets"
function clickSlettAlleBillettene() {
    var tableElement = document.getElementById("tablebilletter");
    tableElement.style.display = "none";
    var tbodyElement = document.getElementById("tbodybilletter");
//  clear all the values in the tbody element to remove data
    tbodyElement.textContent="";
//    clear the array value
    arrKinobiletter = [];
    // Delete all Error Messages
    sletteAlleMeldinger();

}

// Add cinema ticket
function leggTilKinobiletter() {
    var filmnavnElement=document.getElementById("filmnavn");
    const kinobiletter = {
      filmnavn:filmnavnElement.options[filmnavnElement.selectedIndex].text,
      antall:document.getElementById("antall").value,
      fornavn: document.getElementById("fornavn").value,
      etternavn:document.getElementById("etternavn").value,
      telefonnr:document.getElementById("telefonnr").value,
      epost:document.getElementById("epost").value
    }
    // Add row in table
    leggTilTabbel(kinobiletter);
    // Push values to Array
    arrKinobiletter.push(kinobiletter);
    // Delete all Error Messages
    sletteAlleMeldinger();
    // Clear all the values from fields
    fjernAlleVerdier();
}

// Add row in table
function leggTilTabbel(kinobiletter) {
    var tableElement = document.getElementById("tablebilletter");
    tableElement.style.display = "block";
    var tbodyElement = document.getElementById("tbodybilletter");
    var row = tbodyElement.insertRow();

    row.insertCell().textContent=kinobiletter['filmnavn'];
    row.insertCell().textContent=kinobiletter['antall'];
    row.insertCell().textContent=kinobiletter['fornavn'];
    row.insertCell().textContent=kinobiletter['etternavn'];
    row.insertCell().textContent=kinobiletter['telefonnr'];
    row.insertCell().textContent=kinobiletter['epost'];
}

// Delete all Error Messages
function sletteAlleMeldinger() {
    const elements = document.querySelectorAll(`[id^="errormsg"]`);
    if(elements) {
        elements.forEach(sletteAlleTekst);
    }
}
// delete all textcontent
function sletteAlleTekst(element) {
    if(element) {
        element.textContent="";
    }
}

// Validate All empty Value Fields and add the message
function validerTommeVerdier() {
    if ( validerTomSelect("filmnavn") &
    validerTom("antall") &
    validerTom("fornavn")  &
    validerTom("etternavn") &
    validerTom("telefonnr") &
    validerTom("epost") ) {
        return true;
    }
    return false;
}

// Validates empty and adds message to each element
function validerTom(elementId) {
    var element = document.getElementById(elementId);
    if(element && element.value.trim() =="") {
        leggTilTomFeilmelding(elementId,element.name);
        return false;
    }
    return true;
}

// Validates empty select messages
function validerTomSelect(elementId) {
    var element = document.getElementById(elementId);
    if(element && element.value.trim() =="") {
        leggTilSelectFeilmelding(elementId,element.name);
        return false;
    }
    return true;
}
// Removes validation text on blur of field if value found
function sletteTekstErrMsg(elementId) {
    const element = document.getElementById(elementId);
    if(element.value.trim() !="") {
        sletteAlleTekst(document.getElementById("errormsg-"+elementId))
    }
}

// Validates if it is a number value
function validerNummeret(elementId) {
     var element = document.getElementById(elementId);
     var value = element.value;
     if(isNaN(value)) {
        leggTilNummerFeilmelding(elementId,element.name);
        return false;
    }
    return true;
}
// Validates if it is a proper email
function validerEpost(elementId) {
     var element = document.getElementById(elementId);
     // Regular Expression to validate email
     var validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
     var value = element.value;
     if(!value.match(validEmailRegex)) {
        leggTilEpostFeilmelding(elementId,element.name);
        return false;
    }
    return true;
}
// Validates if it is a proper telephone number with 8 digits
function validerTelefonnr(elementId) {
     var element = document.getElementById(elementId);
     var value = element.value;
     if(value.length !=8) {
        leggTilTelefonnrFeilmelding(elementId,element.name);
        return false;
    }
    return true;
}
// Validates if it is a proper Alphanumeric
function validerAlfanumerisk(elementId) {
     var element = document.getElementById(elementId);
     // Regular Expression to validate alpha numeric
     var validRegex = /^[0-9a-zA-Z]+$/;
     var value = element.value;
     if(!value.match(validRegex)) {
        leggTilAlfanumeriskFeilmelding(elementId,element.name);
        return false;
    }
    return true;
}

// Add Error Message when field not selected
// tekstId =  Id of text
// tekstName =  Name of text
function leggTilTomFeilmelding(tekstId,tekstName) {
    const errmsgElement = document.getElementById("errormsg-"+tekstId);
    if(errmsgElement) {
        errmsgElement.textContent ="Må skrive noe inn i "+tekstName;
    }
}

// Add Error Message when selection is not done in drop down
// tekstId =  Id of text
// tekstName =  Name of text
function leggTilSelectFeilmelding(tekstId,tekstName) {
    const errmsgElement = document.getElementById("errormsg-"+tekstId);
    if(errmsgElement) {
        errmsgElement.textContent ="Må "+tekstName;
    }
}

// Add Error Message when field not a number
// tekstId =  Id of text
// tekstName =  Name of text
function leggTilNummerFeilmelding(tekstId,tekstName) {
    const errmsgElement = document.getElementById("errormsg-"+tekstId);
    if(errmsgElement) {
        errmsgElement.textContent ="Må oppgi nummer i "+tekstName;
    }
}

// Add Error Message when field not a Alphanumeric
// tekstId =  Id of text
// tekstName =  Name of text
function leggTilAlfanumeriskFeilmelding(tekstId,tekstName) {
    const errmsgElement = document.getElementById("errormsg-"+tekstId);
    if(errmsgElement) {
        errmsgElement.textContent ="Må oppgi alfanumerisk i "+tekstName;
    }
}

// Add Error Message to email
// tekstId =  Id of text
// tekstName =  Name of text
function leggTilEpostFeilmelding(tekstId,tekstName) {
    const errmsgElement = document.getElementById("errormsg-"+tekstId);
    if(errmsgElement) {
        errmsgElement.textContent ="Må skrive gyldig "+tekstName;
    }
}


// Add Error Message to telephone validation
// tekstId =  Id of text
// tekstName =  Name of text
function leggTilTelefonnrFeilmelding(tekstId,tekstName) {
    const errmsgElement = document.getElementById("errormsg-"+tekstId);
    if(errmsgElement) {
        errmsgElement.textContent ="Må skrive 8 sifre i "+tekstName;
    }
}

// Delete all Error Messages
function sletteAlleMeldinger() {
    const elements = document.querySelectorAll(`[id^="errormsg"]`);
    if(elements) {
        elements.forEach(sletteAlleTekst);
    }
}
// Clear all the values from fields
function fjernAlleVerdier() {
    document.getElementById("filmnavn").value="";
    document.getElementById("antall").value="";
    document.getElementById("fornavn").value="";
    document.getElementById("etternavn").value="";
    document.getElementById("telefonnr").value="";
    document.getElementById("epost").value="";
}



