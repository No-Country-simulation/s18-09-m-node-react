"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MemoryStorage {
    constructor() { }
    static addLoginAttempt(email) {
        const index = MemoryStorage.loginAttempts.findIndex((attempt) => attempt.email === email);
        if (index !== -1) {
            if (MemoryStorage.loginAttempts[index].created_at < new Date(Date.now() - 30 * 60 * 1000)) {
                MemoryStorage.loginAttempts[index].attempts = 1;
                return 2; // rest login attempts;
            }
            MemoryStorage.loginAttempts[index].attempts += 1;
            return 3 - MemoryStorage.loginAttempts[index].attempts;
        }
        else {
            MemoryStorage.loginAttempts.push({ email, attempts: 1, created_at: new Date() });
            return 2;
        }
    }
    static deleteLoginAttempts(email) {
        const index = MemoryStorage.loginAttempts.findIndex((attempt) => attempt.email === email);
        if (index !== -1) {
            MemoryStorage.loginAttempts.splice(index, 1);
        }
    }
}
MemoryStorage.loginAttempts = [];
exports.default = MemoryStorage;
