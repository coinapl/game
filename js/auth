// यूजर डेटा स्टोर करने के लिए (LocalStorage का उपयोग)
class AuthSystem {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    }

    // रजिस्ट्रेशन फंक्शन
    register(username, email, password, phone) {
        // Check if user already exists
        if(this.users.find(user => user.email === email)) {
            return { success: false, message: 'यह ईमेल पहले से रजिस्टर्ड है!' };
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            username,
            email,
            password, // In production, hash this password
            phone,
            balance: 1000, // Welcome bonus
            createdAt: new Date().toISOString(),
            transactions: [],
            bets: []
        };

        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));
        
        return { success: true, message: 'रजिस्ट्रेशन सफल! अब लॉगिन करें।' };
    }

    // लॉगिन फंक्शन
    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if(user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            return { success: true, message: 'लॉगिन सफल!' };
        }
        
        return { success: false, message: 'गलत ईमेल या पासवर्ड!' };
    }

    // लॉगआउट फंक्शन
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }

    // बैलेंस अपडेट करें
    updateBalance(amount, type, game) {
        if(this.currentUser) {
            if(type === 'add') {
                this.currentUser.balance += amount;
            } else if(type === 'deduct') {
                if(this.currentUser.balance >= amount) {
                    this.currentUser.balance -= amount;
                } else {
                    return { success: false, message: 'बैलेंस कम है!' };
                }
            }

            // Save transaction
            this.currentUser.transactions.push({
                amount,
                type,
                game,
                balance: this.currentUser.balance,
                date: new Date().toISOString()
            });

            // Update in users array
            const index = this.users.findIndex(u => u.id === this.currentUser.id);
            this.users[index] = this.currentUser;
            
            localStorage.setItem('users', JSON.stringify(this.users));
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            
            return { success: true, balance: this.currentUser.balance };
        }
        return { success: false, message: 'पहले लॉगिन करें!' };
    }

    // यूजर की जानकारी प्राप्त करें
    getUserInfo() {
        return this.currentUser;
    }

    // क्या यूजर लॉगिन है?
    isLoggedIn() {
        return this.currentUser !== null;
    }
}

// Global auth instance
const auth = new AuthSystem();
