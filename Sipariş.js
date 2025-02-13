document.addEventListener("DOMContentLoaded", function () {
    const hashTable = new Map(JSON.parse(localStorage.getItem('orderData')) || []);
    const alınanlar = document.getElementById("Alınanlar");
    const ödenecekler = document.getElementById("Ödenecek");
    const buttons = document.querySelectorAll('button');
    const btnDlt=document.getElementById("btnDelete");
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            const select = this.previousElementSibling;
            const selectedValue = parseInt(select.value);

            if (selectedValue === 0) {
                alert('Lütfen bir miktar seçin!');
            } else {
                const itemName = this.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
                const amount = parseFloat(this.previousElementSibling.previousElementSibling.innerText.replace('TL', '').trim());
                
                // Store item name and quantity
                if (hashTable.has(itemName)) {
                    let existingValue = hashTable.get(itemName);
                    existingValue.quantity += selectedValue; // Update quantity
                } else {
                    hashTable.set(itemName, { amount: amount, quantity: selectedValue });
                }

                localStorage.setItem('orderData', JSON.stringify([...hashTable]));
                alert(itemName + ' - ' + selectedValue + ' adet kaydedildi.');
            }
        });
    });

    console.log('Mevcut Siparişler: ', hashTable);

    let alınanlarText = '';
    hashTable.forEach((value, key) => {
        alınanlarText += ` ${value.quantity} adet  ${key} toplam: ${value.amount * value.quantity} TL\n`;
    });
      alınanlar.innerText = alınanlarText;

    let ödeneceklerText = 0;
    hashTable.forEach((value) => {
        ödeneceklerText += value.amount * value.quantity; // Sum of all items' total prices
    });

    ödenecekler.innerText = `Toplam Ödenecek: ${ödeneceklerText} TL`;
    btnDlt.addEventListener("click",function(){
        alınanlarText= "0 adet null toplam:0 TL";
        ödeneceklerText=" Toplam Ödenecek :0";
        alınanlar.innerText=alınanlarText;
        ödenecekler.innerText=ödeneceklerText;
        hashTable.clear();
        localStorage.removeItem('orderData'); 
        location.reload();

    });


});
