// वॉलेट मैनेजमेंट सिस्टम
class WalletSystem {
    constructor() {
        this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        this.balance = parseInt(localStorage.getItem('balance')) || 0;
    }

    // बैलेंस जोड़ें (डिपॉजिट)
    deposit(amount, method) {
        if(amount < 100) {
            return { success: false, message: 'न्यूनतम डिपॉजिट ₹100 है' };
        }

        this.balance += amount;
        
        // ट्रांजैक्शन सेव करें
        const transaction = {
            id: Date.now(),
            type: 'deposit',
            amount: amount,
            method: method,
            balance: this.balance,
            status: 'completed',
            date: new Date().toISOString()
        };
        
        this.transactions.push(transaction);
        this.save();
        
        return { 
            success: true, 
            message: `₹${amount} सफलतापूर्वक जोड़े गए`,
            balance: this.balance,
            transaction: transaction
        };
    }

    // बैलेंस निकालें (विथड्रॉ)
    withdraw(amount, method) {
        if(amount < 500) {
            return { success: false, message: 'न्यूनतम विथड्रॉ ₹500 है' };
        }

        if(amount > this.balance) {
            return { success: false, message: 'बैलेंस कम है' };
        }

        this.balance -= amount;
        
        const transaction = {
            id: Date.now(),
            type: 'withdraw',
            amount: amount,
            method: method,
            balance: this.balance,
            status: 'pending', // एडमिन अप्रूवल के लिए
            date: new Date().toISOString()
        };
        
        this.transactions.push(transaction);
        this.save();
        
        return { 
            success: true, 
            message: `₹${amount} निकालने का अनुरोध किया गया`,
            balance: this.balance,
            transaction: transaction
        };
    }

    // बेट लगाएं
    placeBet(amount, game) {
        if(amount > this.balance) {
            return { success: false, message: 'बैलेंस कम है' };
        }

        this.balance -= amount;
        
        const transaction = {
            id: Date.now(),
            type: 'bet',
            amount: amount,
            game: game,
            balance: this.balance,
            status: 'completed',
            date: new Date().toISOString()
        };
        
        this.transactions.push(transaction);
        this.save();
        
        return { 
            success: true, 
            message: `बेट लगाई गई: ₹${amount}`,
            balance: this.balance
        };
    }

    // जीत जोड़ें
    addWinnings(amount, game) {
        this.balance += amount;
        
        const transaction = {
            id: Date.now(),
            type: 'win',
            amount: amount,
            game: game,
            balance: this.balance,
            status: 'completed',
            date: new Date().toISOString()
        };
        
        this.transactions.push(transaction);
        this.save();
        
        return { 
            success: true, 
            message: `जीत: ₹${amount}`,
            balance: this.balance
        };
    }

    // ट्रांजैक्शन हिस्ट्री
    getTransactionHistory(limit = 50) {
        return this.transactions.slice(-limit).reverse();
    }

    // डेटा सेव करें
    save() {
        localStorage.setItem('balance', this.balance);
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }

    // पेमेंट मेथड्स
    getPaymentMethods() {
        return [
            {
                id: 'upi',
                name: 'UPI',
                icon: 'fa-phone',
                min: 100,
                max: 100000,
                processingTime: 'इंस्टेंट'
            },
            {
                id: 'bank',
                name: 'बैंक ट्रांसफर',
                icon: 'fa-building',
                min: 1000,
                max: 500000,
                processingTime: '2-4 घंटे'
            },
            {
                id: 'paytm',
                name: 'Paytm',
                icon: 'fa-wallet',
                min: 100,
                max: 50000,
                processingTime: 'इंस्टेंट'
            },
            {
                id: 'phonepe',
                name: 'PhonePe',
                icon: 'fa-mobile',
                min: 100,
                max: 50000,
                processingTime: 'इंस्टेंट'
            },
            {
                id: 'googlepay',
                name: 'Google Pay',
                icon: 'fa-google',
                min: 100,
                max: 50000,
                processingTime: 'इंस्टेंट'
            }
        ];
    }
}

// ग्लोबल वॉलेट इंस्टेंस
const wallet = new WalletSystem();
