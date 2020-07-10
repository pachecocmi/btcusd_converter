docReady(function() {
    setInputFilter(document.getElementById("amount"), function(value) {
        return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
    });

    setInterval(()=>{
        // fetch from api background
        fetch('./backend.php?btc=check')
            .then(response=>response.json())
            .then(data=>{
                document.getElementById('spanBuy').innerHTML = currencyFormat(data.buy);
                document.getElementById('spanSell').innerHTML = currencyFormat(data.sell);
            });
    }, 2000)
    
    document.getElementById("submitBtn").addEventListener('click', function() {
        let amount = document.getElementById('amount').value;
        fetch('./backend.php?btc=convert&amount='+amount)
            .then(response=>response.json())
            .then(data=>{
                let strMessage = "Converted amount for <b>BTC "+amount+"</b> is <b>"+currencyFormat(data.amount)+"</b>";
                document.getElementById('converted').innerHTML = strMessage;
            });
    });
});



/* ======================= Functionalities Here ======================= */
    /* === Numeric Filtration here === */
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    });
}

    /* === Document Read === */
function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    

    /* Currency Format */
function currencyFormat(num) {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return formatter.format(num);
}
